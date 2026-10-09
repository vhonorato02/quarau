# Relatório completo — diagnóstico do site Quarau

> Auditoria de **2026-10-09**, feita do zero. O site e o CMS foram instalados limpos: banco novo, migrações,
> importação do WordPress e build de produção. Depois foram usados como visitante e como editor, no navegador,
> no desktop (1440 px) e no celular (390 px). Capturas em [docs/diagnostico/](diagnostico/).
> O plano para terminar está em [PLANO.md](PLANO.md).

## 1. Veredito

- **O site novo não está no ar em lugar nenhum.**
  - `https://quarau.vercel.app` → 404: nenhum deploy chegou ao fim.
  - VPS: não responde.
  - O WordPress antigo segue em `https://quarau.com.br`.
- **A base técnica é boa e funciona.**
  - Uma instalação do zero sobe sem erro.
  - O conteúdo do WordPress é importado.
  - As páginas abrem com status 200, sem erro de console e sem imagem quebrada.
  - O formulário grava a mensagem e envia os dois e-mails.
  - O CI (E2E, acessibilidade, Lighthouse) passa.
- **O que está ruim é acabamento e produto, não a fundação:**
  - design genérico e com defeitos de layout;
  - páginas rasas;
  - CMS cru para quem edita;
  - mídias incompletas;
  - infraestrutura espalhada por três tentativas (VPS/Coolify, plataforma própria e Vercel).
- **Por que entrou em loop:**
  - o destino do deploy mudou quatro vezes;
  - o trabalho foi feito num ambiente sem acesso às contas (VPS, banco), dividido em várias sessões;
  - "pronto" foi declarado com base em testes locais, não no site real no ar.
  - O plano corrige isso: **um agente, uma branch (`main`), um destino (Vercel), e nada é "pronto" sem QA na URL pública.**

## 2. O que é o sistema (em uma página)

| Camada             | O que é                                                                                              | Onde                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Site + CMS         | Next.js 16.3 (App Router) com Payload CMS 3.90 embutido no mesmo app (`/admin`, `/api`)              | `apps/web`                                  |
| Modelo de conteúdo | 11 coleções, 5 globais, 19 blocos de página                                                          | `apps/web/src/{collections,globals,blocks}` |
| Páginas            | home, sobre, contato, privacidade (CMS) + projetos, atuação, notícias, vagas, busca (rotas próprias) | `apps/web/src/app/(frontend)/[locale]`      |
| Banco              | PostgreSQL (`@payloadcms/db-postgres`); migrações versionadas em `src/migrations`                    | Neon na Vercel (**ainda não criado**)       |
| Arquivos           | Vercel Blob quando há `BLOB_READ_WRITE_TOKEN`; senão S3/MinIO; senão disco                           | `payload.config.ts`                         |
| E-mail             | SMTP qualquer, ou Resend (`RESEND_API_KEY`); sem nenhum, o contato só é salvo no CMS                 | `payload.config.ts`                         |
| Busca              | Meilisearch se houver `MEILI_HOST`; senão busca no Postgres (`src/lib/search-fallback.ts`)           |                                             |
| Cache              | ISR por tags; publicar no CMS invalida na hora (`src/hooks/revalidate.ts`)                           |                                             |
| Design system      | Tailwind v4 + componentes próprios (Barlow, azul `#0089CF`, verde `#39B54A`)                         | `packages/ui`                               |
| E-mails            | React Email (aviso para a equipe + confirmação para o visitante)                                     | `packages/emails`                           |
| Migração WP        | script idempotente: páginas, 6 projetos, 4 áreas, parceiros, menus, mídias                           | `apps/web/scripts/migrate-wp.ts`            |
| Hospedagem         | projeto Vercel `quarau` já criado e ligado ao GitHub (push na `main` = deploy)                       | ver §6                                      |
| Restos da VPS      | Dockerfile, `infra/compose`, `infra/platform`, guias e ADRs da VPS, job de imagem no CI              | **obsoletos**                               |

## 3. Site: diagnóstico página por página

Legenda de severidade:

- **P0** impede publicar;
- **P1** visível e grave;
- **P2** acabamento;
- **P3** melhoria.

### 3.1 Geral (todas as páginas)

| ID  | Sev. | Problema                                                                                                                                                                                            | Evidência              |
| --- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| S1  | P1   | **Banner de cookies cobre o conteúdo.** Ele aparece centralizado na parte de baixo, em cima do botão principal do hero ("Conheça os projetos"), e no meio das páginas no celular.                   | `diagnostico/01`, `09` |
| S2  | P1   | **Tipografia pequena demais.** Textos de cards, metadados, chips de filtro, ODS, ficha técnica e listas de missão/visão ficam em ~12–14 px no desktop. Leitura cansativa e aparência de "template". | `02`, `06`, `13`       |
| S3  | P1   | **Fotos com aparência borrada.** As originais do WordPress têm no máximo 1600 px e são exibidas grandes com compressão alta (`images.qualities` 60/75/85).                                          | `02`, `06`             |
| S4  | P2   | **Grandes vazios brancos** entre seções e colunas inteiras vazias (texto à direita, nada à esquerda).                                                                                               | `05`, `13`             |
| S5  | P2   | **CTA "Vamos tirar o seu projeto do papel"** se repete em todas as páginas, inclusive em Contato, onde é redundante.                                                                                | sheet contato          |
| S6  | P2   | **Header no celular** mostra só o símbolo "Q.", sem o nome da marca.                                                                                                                                | `09`                   |
| S7  | P2   | **Excesso de JavaScript.** Hero 3D (React Three Fiber + three.js), GSAP e Lenis (rolagem suave que sequestra o scroll). Performance mobile de laboratório: 83–94, abaixo da meta de 95.             | relatorio-final §2     |

### 3.2 Home

| ID  | Sev. | Problema                                                                                                                                                                           | Evidência |
| --- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| H1  | P1   | O **símbolo 3D (lupa) fica sobre a cabeça** de uma pessoa na foto do hero. A foto é escura e de baixa resolução.                                                                   | `01`      |
| H2  | P1   | **Grade de projetos desequilibrada:** 1 grande + 1 pequeno, depois 2 médios e uma coluna vazia; alturas diferentes; legendas repetitivas ("Celeo — Programa Celeo na Comunidade"). | `02`      |
| H3  | P1   | **Logos de parceiros ilegíveis.** Muito pequenos e acinzentados. O do Celeo tem 150×80 px e aparece como um risco. Espaço Crescer e Instituto Umbuzeiro não têm logo.              | `03`      |
| H4  | P2   | O **"Quem somos"** em texto gigante cinza-claro que escurece palavra por palavra ao rolar: baixo contraste enquanto não é revelado.                                                | `01`      |
| H5  | P2   | "Como trabalhamos" (6 etapas) e "Atuação" (4 cards) são só texto e ícone, sem nenhuma foto.                                                                                        | `09`      |

### 3.3 Projetos (lista e case)

| ID  | Sev. | Problema                                                                                                                                                                                           | Evidência  |
| --- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| P1  | P1   | **Mapas cortados.** No case Ecoe Verde, o bloco "Território" (galeria em carrossel) começa colado na borda esquerda da tela, corta a 3ª imagem e esconde a 4ª, sem setas nem indicação de rolagem. | `04`       |
| P2  | P1   | **Lista de projetos** com a mesma grade irregular da home: buraco à direita e textos minúsculos.                                                                                                   | `06`       |
| P3  | P2   | "Sobre o projeto": rótulo à esquerda e texto numa coluna à direita, com metade da tela vazia.                                                                                                      | `05`       |
| P4  | P2   | Galerias com 20+ fotos de uma vez, deixando a página com ~10.000 px. Falta limite com "ver todas".                                                                                                 | sheet case |
| P5  | P3   | Os anos de início e fim do Quipá estão vazios (`[CONFIRMAR]`).                                                                                                                                     | CMS        |

### 3.4 Demais páginas

| ID  | Sev. | Problema                                                                                                                                                      | Evidência  |
| --- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| O1  | P1   | **Notícias** ("Em breve…") e **Trabalhe conosco** ("não há vagas") estão vazias, mas aparecem no rodapé e no sitemap.                                         | `08`       |
| O2  | P1   | **Páginas de área de atuação rasas:** título, um ícone solto, um parágrafo e uma lista. Sem foto e sem os projetos daquela área.                              | `07`       |
| O3  | P2   | **Sobre** sem nenhuma imagem na primeira dobra. Missão, visão e valores em letras miúdas. Sem equipe e sem história.                                          | `13`       |
| O4  | P2   | **Contato:** telefones não são links (nem `tel:` nem WhatsApp); não há mapa; o CTA do rodapé repete "Fale com a Quarau".                                      | `14`       |
| O5  | P3   | **Busca:** o título fica alinhado à esquerda e os resultados numa coluna deslocada. A busca sem Meilisearch não ignora acentos ("patrimonio" ≠ "patrimônio"). | sheet misc |

### 3.5 O que está bom e deve ficar

- Estrutura de navegação, URLs e 301 das URLs antigas.
- Metadados, JSON-LD e sitemap.
- Página 404.
- Formulário com validação e consentimento.
- Lightbox da galeria e vídeo carregado só no clique.
- Paleta e fonte da marca.
- Rodapé.
- Acessibilidade (axe WCAG 2.2 AA verde no CI).

## 4. CMS (painel `/admin`): diagnóstico como editor

Funciona:

- criar o primeiro usuário;
- login;
- listar, editar, rascunho, publicar, versões e live preview;
- coleções e globais em português.

| ID  | Sev. | Problema                                                                                                                                                                                                              | Evidência   |
| --- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| C1  | P1   | **Blocos sem nome.** Na edição de páginas, todos os blocos aparecem como "Sem título" ("Destaque (Hero) — Sem título"…). Quem edita não sabe o que é cada bloco sem abrir um por um.                                  | `10`        |
| C2  | P1   | **Mídias incompletas:** só **115 de 269** arquivos da biblioteca do WordPress são importados, e **56 têm texto alternativo genérico**. O dono quer **todas** as mídias.                                               | §5          |
| C3  | P1   | **Menu com gambiarra.** Links para Atuação, Projetos e Notícias são cadastrados como "Endereço externo" com `/atuacao`, porque essas listagens não são páginas do CMS. Confunde e quebra fácil.                       | `12`        |
| C4  | P2   | **Ruído de idioma.** Seletor "Local: Português (Brasil)" em todas as telas e sufixo "— Português (Brasil)" em cada campo, embora o site tenha só um idioma.                                                           | `10`, `11`  |
| C5  | P2   | **Listas cruas.** Na lista de projetos, "Destacar na home" aparece como `verdadeiro`/`falso` cru; "Ano de início" vazio aparece como `<Nenhum(a) Ano de início>`; não há miniatura da capa.                           | `11`        |
| C6  | P2   | **Painel inicial pobre.** Só atalhos: sem contagem, sem "contatos novos", sem "mídias para revisar". O texto de ajuda manda consultar "docs/cms.md no repositório", e o editor não tem acesso a isso.                 | sheet cms   |
| C7  | P2   | **Telas confusas no primeiro acesso.** "Criar primeiro usuário" mostra o campo Papéis com "Autor" (o hook transforma em admin, mas a tela engana). "Criado por" fica sempre vazio. A aba "API" aparece para editores. | sheet cms   |
| C8  | P2   | **Rascunhos vazios.** Abrir "Criar novo" já grava um rascunho (autosave), e rascunhos vazios se acumulam.                                                                                                             | QA anterior |
| C9  | P3   | O painel usa a fonte do sistema, não a Barlow, e tem pouca identidade além do logo.                                                                                                                                   | `11`        |

## 5. Backend, conteúdo e infraestrutura

| ID  | Sev. | Problema                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | P0   | **Não existe banco de produção.** Precisa criar o Neon pela CLI da Vercel (`vercel integration add neon …`), o que exige um `vercel login` do dono. Nenhuma ferramenta disponível nesta sessão consegue criá-lo.                                                                                                                                                                                          |
| B2  | P0   | **Importação no build não serve.** O build da Vercel (`apps/web/scripts/vercel-build.ts`) tenta importar o conteúdo dentro do build, baixando do WordPress e **sem vídeos**. Para importar **todas** as mídias com vídeo, a importação precisa rodar uma vez **a partir do computador local** contra o banco e o Blob de produção. O cache com as 265 mídias + 3 vídeos convertidos (≈310 MB) vai no zip. |
| B3  | P1   | **Arquivos servidos pela função.** As mídias passam por `/api/media/file/…` (uma função serverless por arquivo). Na Vercel, o certo é servir direto do CDN do Blob (`disablePayloadAccessControl: true`), liberando o domínio do Blob na CSP e no `next/image`. Vídeos de 70 MB passando por função é inviável.                                                                                           |
| B4  | P1   | **E-mail não configurado na Vercel:** falta `RESEND_API_KEY`. Sem domínio verificado, a Resend só entrega no e-mail do dono da conta; o destinatário precisa ser esse até verificar `quarau.com.br`, e o domínio não vai ser mexido agora.                                                                                                                                                                |
| B5  | P1   | **Ambiente local depende de 5 containers Docker** (Postgres, MinIO, Meilisearch, Valkey, Mailpit). Num computador cru e com Windows, isso é peso desnecessário: o local pode usar um Neon de desenvolvimento e o Blob.                                                                                                                                                                                    |
| B6  | P1   | **Banco local com drift de schema:** `next start` trava num prompt interativo do Payload ("run migrations? data loss…"). Numa instalação limpa não acontece. Regra: nunca usar `push` em banco que recebe migrações.                                                                                                                                                                                      |
| B7  | P2   | **CI pesado e voltado para a VPS:** imagem Docker, GHCR, Trivy, k6, Lighthouse, Storybook. O último run falhou só por formatação (corrigido). Para um site institucional na Vercel basta lint + tipos + testes + E2E.                                                                                                                                                                                     |
| B8  | P2   | **Infra da VPS órfã e documentação contraditória:** `Dockerfile`, `infra/`, `docs/{infra,runbook,go-live,vps-guia}.md`, ADRs 0004/0010/0013 e as seções 5–6 do `relatorio-final.md`. Isso induz qualquer agente ao erro.                                                                                                                                                                                  |
| B9  | P2   | **i18n desligado mas presente:** EN/ES "prontos e desligados" mantêm tabelas `_locales`, seletor e sufixos no CMS (C4). O banco de produção ainda não existe, então dá para simplificar o schema e **recriar a migração inicial**, sem custo.                                                                                                                                                             |
| B10 | P2   | **Seções vazias publicadas:** Notícias e Vagas sem conteúdo aparecem no menu, no rodapé e no sitemap (O1).                                                                                                                                                                                                                                                                                                |
| B11 | P3   | **Dependências:** `pnpm audit` acusa 6 altas, todas em ferramentas de desenvolvimento (`@lhci/cli`, `@next/eslint-plugin-next`, `drizzle-kit`). Somem ao remover o Lighthouse CI e atualizar.                                                                                                                                                                                                             |
| B12 | P3   | **PR [vhonorato02/quarau#1](https://github.com/vhonorato02/quarau/pull/1) aberto ao contrário** (`main` → branch antiga). Fechar.                                                                                                                                                                                                                                                                         |

## 6. Contas e recursos que já existem

| Recurso          | Estado                                                                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub           | `vhonorato02/quarau`, branch `main` (única que importa)                                                                                                                                 |
| Projeto Vercel   | `quarau` (`prj_AprZxL0w7Iqvpbh1k92QcUUblGB0`), time `jose-victors-projects-5cc9abbe`, raiz `apps/web`, região `gru1`, build `pnpm build:vercel`, domínio `quarau.vercel.app`            |
| Variáveis Vercel | `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `REVALIDATE_SECRET`, `CRON_SECRET` (sensíveis), `PAYLOAD_DB_PUSH=false`, `SITE_NOINDEX=true`, `NEXT_PUBLIC_ENABLED_LOCALES=pt`, `CONTACT_RECIPIENT` |
| Vercel Blob      | `quarau-media` (público, `gru1`) → `BLOB_READ_WRITE_TOKEN` em todos os ambientes                                                                                                        |
| Neon             | integração instalada na conta (plano Free), **nenhum banco criado**                                                                                                                     |
| Resend           | integração na conta, **não ligada ao projeto**                                                                                                                                          |
| Último deploy    | `dpl_DV4jsamu1mNAhQjWjjdbBbKcmTXA` → ERROR `[vercel-build] no database` (esperado)                                                                                                      |
| WordPress antigo | no ar; continua sendo a fonte do conteúdo. **Não mexer no domínio.**                                                                                                                    |
| VPS              | fora do ar e abandonada. Nada depende dela. Formatar ou cancelar pelo painel do provedor quando o dono quiser.                                                                          |

## 7. Conteúdo e pendências com o cliente

- **Importado:**
  - 4 páginas;
  - 6 projetos;
  - 4 áreas;
  - 7 parceiros (2 sem logo);
  - menus, contatos e redes;
  - 115 mídias.
- **No cache do zip**, prontas para importar sem internet nem ffmpeg: as 265 mídias da biblioteca (232 JPEG, 31 PNG, 2 GIF) e 3 vídeos já convertidos para 720p.
- **Pendências `[CONFIRMAR]`** (o site não inventa dado; campo vazio fica oculto): ver [relatorio-final.md §4](relatorio-final.md#4-pendências-confirmar). As principais:
  - CNPJ e endereço;
  - se os telefones atendem WhatsApp;
  - LinkedIn de empresa;
  - créditos de fotos;
  - fotos em alta resolução;
  - logos em vetor dos parceiros.
