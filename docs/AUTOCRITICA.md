# Autocrítica — estado anterior (Fase 0)

> 2026-10-26. Premissa do dono: **"fraquíssimo em todos os aspectos: não tem design, o código é ruim, parece
> mockup"**. Cada ponto foi testado contra evidência, sem defender o trabalho anterior.
> Evidências: capturas do estado anterior em [`qa/antes/capturas/`](qa/antes/capturas/) (390 e 1440 px),
> medidas em [`qa/antes/medidas.json`](qa/antes/medidas.json), Lighthouse em [`qa/antes/lighthouse/`](qa/antes/lighthouse/)
> e o diagnóstico detalhado em [RELATORIO-COMPLETO.md](RELATORIO-COMPLETO.md) (IDs S1…B4 citados abaixo).
> Referências de comparação: [DESIGN.md §2](DESIGN.md) (Gehl, Instituto Socioambiental, Fundação Tide Setubal).
> Segunda rodada (depois da reconstrução): [§6](#6-segunda-rodada-depois-da-reconstrução).

## 1. Ambiente medido

- `https://quarau.vercel.app` **não estava no ar** (404: nenhum deploy chegou ao fim). [RELATORIO §1]
- O site foi rodado localmente com o conteúdo importado do WordPress; as capturas e medidas são dessa execução.
- O Lighthouse do estado anterior falhou em performance (relatórios com nota 0 e métricas vazias: a execução não
  terminou o carregamento). A medição válida mais recente está no relatório anterior: **performance mobile 83–94**
  (S7). Acessibilidade 100, boas práticas 100, SEO 69 (o `noindex` de homologação derruba SEO; não é defeito de
  produção).

## 2. Notas (0–10)

| Aspecto            | Nota  | Veredito sobre a premissa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Evidência                                |
| ------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Design**         | **3** | **Confirmada.** Parece template: grade de cards desigual com buraco (H2, P2), banner de cookies sobre o botão principal (S1), tipografia de 12–14 px (S2), lupa 3D em cima da cabeça de uma pessoa na foto (H1), logos ilegíveis (H3), seções só de ícone e texto (H5). A marca (Barlow, azul, lupa) existia, mas como carimbo, não como estrutura. Diante do Gehl (foto do lugar + uma frase) e do ISA (peso institucional), não havia uma ideia própria.                                                                               | `diagnostico/01`–`13`                    |
| **UX e conteúdo**  | **4** | **Confirmada em parte.** A proposta aparecia no hero, mas disputava com animação e banner. Menu com "Notícias" e "Trabalhe conosco" vazios (O1). Áreas de atuação rasas, sem projetos (O2). Contato sem `tel:`/WhatsApp (O4). Conversão possível, porém sem prova perto do botão (números e territórios ficavam escondidos nos cases).                                                                                                                                                                                                   | `08`, `07`, `14`                         |
| **Código**         | **5** | **Refutada em parte.** Fundação correta (Next + Payload no mesmo app, migrações, testes E2E/axe, CSP, 301 das URLs antigas). Mas: dependências sem uso real (three.js, R3F, GSAP, Lenis, motion, Meilisearch, Valkey, next-intl com dois idiomas desligados, Storybook, Umami), **~597 KB de JS** por página, armazenamento preso à API da Vercel (Blob), importação de conteúdo dentro do build (B2), mídia servida por função (B3), três infraestruturas paralelas. Testes de componente decorativos (renderizar e checar que existe). | `qa/antes/medidas.json`, §5 do relatório |
| **CMS**            | **4** | **Confirmada.** Funcionava, mas um leigo travava: blocos "Sem título" (C1), menu com link "externo" para páginas internas (C3), ruído de idioma em todo campo (C4), listas cruas `verdadeiro/falso` (C5), painel inicial sem orientação (C6), rascunhos vazios acumulando (C8). Textos de interface fixos no código, fora do CMS.                                                                                                                                                                                                        | `10`, `11`, `12`                         |
| **Performance**    | **6** | Mobile 83–94 por causa do 3D e do JS de animação; LCP sensível à foto escura do hero.                                                                                                                                                                                                                                                                                                                                                                                                                                                    | S7                                       |
| **Acessibilidade** | **8** | axe sem violações nas 8 páginas medidas; problemas reais de leitura (texto pequeno, contraste baixo do "Quem somos" animado, H4) que o axe não pega.                                                                                                                                                                                                                                                                                                                                                                                     | `medidas.json`, H4                       |
| **SEO**            | **7** | Metadados, JSON-LD, sitemap e 301 corretos. Sitemap listava páginas vazias (O1).                                                                                                                                                                                                                                                                                                                                                                                                                                                         | §3.5                                     |

## 3. Manter / refatorar / reescrever / descartar

| Decisão        | Item                                                                         | Por quê                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manter**     | Next.js + Payload no mesmo app, Postgres, migrações versionadas              | Base certa para um site institucional editável; nada a ganhar trocando.                                                                                   |
| **Manter**     | 301 das URLs do WordPress, JSON-LD, formulário com consentimento, testes axe | Funcionavam e estavam testados.                                                                                                                           |
| **Manter**     | Marca (Barlow, cores, SVGs)                                                  | Inegociável (brand.md). O problema era a execução.                                                                                                        |
| **Refatorar**  | Modelo do CMS                                                                | Blocos com nome, links internos de verdade, listagens como páginas do CMS, todos os textos de interface editáveis ("Textos do site"), sem localização.    |
| **Refatorar**  | Formulário de contato                                                        | Caso de uso isolado (`server/contact/service.ts`) com dependências injetadas e testes reais; Zod na fronteira.                                            |
| **Refatorar**  | Armazenamento de mídia                                                       | Adaptador S3 genérico (R2 hoje, R2 ou MinIO na VPS) ou disco local; arquivos servidos direto do CDN.                                                      |
| **Reescrever** | Toda a camada visual (páginas, blocos, design system)                        | Sem salvação incremental: a grade de cards e o hero 3D eram a própria estrutura. Nova direção "Lente" (ADR 0016).                                         |
| **Reescrever** | Importação de conteúdo                                                       | Seed idempotente com o conteúdo revisado, fora do build, que nunca sobrescreve edições.                                                                   |
| **Descartar**  | three, R3F, GSAP, Lenis, motion                                              | Peso sem função para o conteúdo; Lenis sequestrava a rolagem.                                                                                             |
| **Descartar**  | Meilisearch, Valkey, next-intl, Storybook, Umami, Vercel Blob                | Infra para um site de ~15 páginas; substituídos por busca no Postgres, limitador em memória atrás de interface, pt-BR fixo e S3 genérico (ADR 0018/0019). |
| **Descartar**  | Coleções Equipe, Vagas, Documentos                                           | Sem conteúdo nem plano; geravam páginas vazias.                                                                                                           |
| **Descartar**  | Plataforma Traefik própria e Coolify                                         | A VPS passa a usar `vhonorato02/vps-platform` (Caddy + `site`).                                                                                           |

## 4. O que foi feito com isso

Ver [DESIGN.md](DESIGN.md), [ARCHITECTURE.md](ARCHITECTURE.md) e as ADRs 0016–0020. A segunda rodada abaixo mede o
resultado com os mesmos critérios.

## 5. Riscos que continuam

- Fotos do acervo têm no máximo 1600 px: a direção evita foto de tela cheia em alta resolução.
- Textos alternativos das fotos de galeria foram escritos a partir do nome do arquivo e do projeto; todos estão
  marcados "precisa de revisão" no CMS.
- Nada sobre a equipe, CNPJ, endereço completo e anos do Quipá existe em fonte verificável
  ([CONTENT-TODO.md](CONTENT-TODO.md)); esses campos ficam ocultos.

## 6. Segunda rodada (depois da reconstrução)

Preenchida na Fase 6 com as medidas de [`qa/depois/`](qa/).
