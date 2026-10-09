# Plano de ação — terminar o site Quarau e publicar na Vercel

> Para um único agente executar do começo ao fim, em ordem. Diagnóstico que justifica cada item:
> [RELATORIO-COMPLETO.md](RELATORIO-COMPLETO.md) (os IDs S1, H2, C1, B3… vêm de lá).
> Progresso: marque cada item em [PROGRESSO.md](PROGRESSO.md) ao terminar e faça commit.

## Regras do jogo (valem para todas as fases)

1. **Um agente, uma branch.**
   - Trabalhe só na `main`, sem branches, sem PRs e sem subagentes em paralelo.
   - Commits pequenos no padrão Conventional Commits (`feat(site): …`, `fix(cms): …`).
   - `git push origin main` ao fim de cada fase (a Vercel publica sozinha).
2. **Um destino.** Produção = projeto Vercel `quarau` → `https://quarau.vercel.app`.
   - Não usar VPS, Docker em produção, Coolify ou GitHub Actions para deploy.
   - **Não mexer no domínio quarau.com.br** (DNS, e-mail, WordPress): ele continua no WordPress.
3. **Só planos gratuitos:** Vercel Hobby, Neon Free, Vercel Blob e Resend Free.
4. **"Pronto" exige prova no ar.** Nenhuma fase visual ou funcional termina sem:
   - rodar `tests/qa/screens.mjs` contra `https://quarau.vercel.app`;
   - **olhar as capturas** (desktop e celular);
   - corrigir o que estiver feio ou quebrado.
   - Teste local não basta.
5. **Não perguntar o que o plano já responde.**
   - Decisões de design e técnica já estão tomadas aqui; na dúvida, escolha a opção mais simples e registre em PROGRESSO.md.
   - Só pare para o dono nos **MOMENTOS DO DONO** (marcados com 🔑).
6. **Segredos nunca no git nem no chat.**
   - `.env*`, `.vercel/` e `ACESSO-ADMIN.txt` ficam fora do git.
   - Não peça ao dono para colar chave na conversa: use o painel da Vercel ou um prompt da CLI.
7. **Dados reais:** só o que o site antigo publicava ou o que o dono informar. O que faltar fica vazio e oculto, com `[CONFIRMAR]` em PROGRESSO.md.
8. **Economia.**
   - Não reinstalar o que já existe.
   - Não reler arquivos grandes sem necessidade.
   - Rode só os testes do que mudou durante o trabalho e a suíte completa no fim de cada fase.

## Fase 0 — Preparar o computador (cru)

O computador pode estar sem nada. Detecte o sistema (`uname -a` ou `$env:OS`). No **Windows**, use o Git Bash (é o que o Claude Code usa).

**Instalar só o necessário** (sem Docker; o banco de desenvolvimento é um Neon na nuvem):

- **Node.js 22 LTS** (`node -v` deve dar `v22.x`).
  - Windows: `winget install -e --id OpenJS.NodeJS.LTS`, ou `winget install Schniz.fnm`, depois `fnm install 22 && fnm use 22`.
  - macOS: `brew install node@22`.
  - Linux: nvm/fnm.
  - 🔑 **No Windows pode aparecer uma janela pedindo permissão (UAC): o dono clica "Sim".**
- **pnpm:** `corepack enable && corepack prepare pnpm@10.28.0 --activate`.
- **Vercel CLI:** `npm i -g vercel@latest`.
- **Dependências:** na raiz do projeto, `pnpm install`.
- **Navegador de teste:** `pnpm --filter @quarau/web exec playwright install chromium`.

**Pronto quando:** `node -v`, `pnpm -v`, `vercel --version` respondem; `pnpm typecheck` passa.

## Fase 1 — Contas, banco e variáveis

1. 🔑 **Login na Vercel:** rode `vercel login`.
   - Aparece um link ou código; **o dono abre no navegador e confirma** com a conta que já tem o projeto `quarau` (entra com o GitHub `vhonorato02`).
2. **Vincular** (na raiz do repo): `vercel link --yes --project quarau --scope jose-victors-projects-5cc9abbe`.
3. **Criar os bancos Neon gratuitos** (região São Paulo, sem Neon Auth):
   - Produção e preview:

     ```bash
     vercel integration add neon --name quarau-db --plan free_v3 -m region=gru1 -m auth=false -e production -e preview --no-env-pull
     ```

   - Desenvolvimento:

     ```bash
     vercel integration add neon --name quarau-dev --plan free_v3 -m region=gru1 -m auth=false -e development --no-env-pull
     ```

   - Se algum flag mudou, veja `vercel integration add neon --help`.
   - Se a CLI pedir para aceitar os termos, rode `vercel integration accept-terms neon`. 🔑 Esse comando é interativo: **o dono confirma**.
   - Os bancos injetam `DATABASE_URL`/`POSTGRES_URL` em cada ambiente; o código já aceita os dois (`src/lib/platform-env.ts`).
4. **Variáveis de desenvolvimento.** As de produção já existem e são sensíveis, por isso não descem com `pull`.
   - Gere valores novos e adicione só em `development`:
     - `PAYLOAD_SECRET` (32+ caracteres aleatórios);
     - `PREVIEW_SECRET`;
     - `REVALIDATE_SECRET`;
     - `CRON_SECRET`;
     - `SITE_NOINDEX=true`;
     - `NEXT_PUBLIC_ENABLED_LOCALES=pt`;
     - `PAYLOAD_DB_PUSH=false`.
   - Comando para cada uma, sem eco no log: `printf '%s' "$VALOR" | vercel env add NOME development`.
5. **Baixar as variáveis:** `vercel env pull apps/web/.env.local --environment development --yes`.
   - Padronize: **o app e os scripts leem `apps/web/.env.local`**. Ajuste os scripts `--env-file-if-exists=../../.env` para `--env-file-if-exists=.env.local`.
   - Apague o `.env` da raiz e o symlink `apps/web/.env`, se existirem.
6. **Testar o banco de dev:**
   - `pnpm --filter @quarau/web payload migrate` aplica as migrações no Neon dev;
   - depois `pnpm dev` e abrir `http://localhost:3000/admin`.
7. 🔑 **Primeiro `git push`:** se o Git pedir login do GitHub (janela do navegador ou do Git Credential Manager), **o dono autoriza**.
   - Não usar tokens antigos colados em conversas.

**Pronto quando:**

- `vercel env ls` mostra `DATABASE_URL` em production, preview e development;
- o admin local abre;
- um push na `main` funciona.

## Fase 2 — Limpar e simplificar (antes de qualquer design)

O objetivo é menos peças. Cada remoção precisa deixar lint, tipos e testes verdes.

1. **Remover a era VPS e Docker de produção** (B8):
   - `Dockerfile`, `.dockerignore`;
   - `infra/` inteiro;
   - `docs/{infra,runbook,go-live,vps-guia}.md`.
   - Na pasta de ADRs, as ADRs 0004, 0005, 0010 e 0013 passam a "substituída pela 0014".
   - Remover as rotas e scripts que só existiam para a VPS:
     - `app/next/health` se ninguém usar;
     - `app/next/reindex` (Meilisearch);
     - o drain file.
2. **Remover serviços opcionais que a Vercel não usa** (B5): Meilisearch (`src/lib/search.ts`, hooks de indexação, `ensureIndex`), Valkey/Redis, S3/MinIO (`@payloadcms/storage-s3`, `ensureBucket`), Mailpit e Sentry/Umami se não estiverem configurados.
   - **Busca:** fica só a do Postgres. Ela deve **ignorar acentos e maiúsculas** (O5).
   - Crie um campo oculto `searchText` (título + resumo, minúsculo e sem acentos) preenchido num `beforeChange`.
   - A busca normaliza o termo do mesmo jeito e consulta `like` nesse campo.
   - **Rate limit:** fica só em memória (`src/lib/rate-limit.ts`).
3. **Tirar o i18n** (B9, C4). O site é só em português.
   - Remover a `localization` do Payload, `localized: true` dos campos, next-intl com prefixo e as mensagens EN/ES.
   - Manter as rotas sem `/[locale]`, ou manter o segmento com `pt` fixo, o que for mais simples sem quebrar URLs e 301.
   - **Como o banco de produção está vazio, apague `src/migrations/*` e gere a migração inicial de novo:** `pnpm --filter @quarau/web payload migrate:create initial`.
   - Recrie o banco dev do zero:
     - no painel do Neon, ou derrubando as tabelas;
     - **nunca** com `push` num banco que recebe migrações (B6).
4. **Mídia direto do CDN do Blob** (B3). Em `payload.config.ts`:
   - `vercelBlobStorage({ … disablePayloadAccessControl: true })`;
   - adicionar `https://*.public.blob.vercel-storage.com` em `img-src` e `media-src` da CSP (`next.config.ts`; o `connect-src` já foi liberado);
   - adicionar o mesmo domínio em `images.remotePatterns`.
5. **Build da Vercel só migra e compila** (B2):
   - `scripts/vercel-build.ts` = `payload migrate` + `next build`;
   - a importação de conteúdo sai do build (Fase 3 e Fase 7).
6. **CI enxuto** (B7). `.github/workflows/ci.yml` com dois jobs:
   - **quality:** format, lint, typecheck e unit;
   - **e2e:** serviço Postgres do GitHub, `payload migrate`, `MIGRATE_OFFLINE=1 pnpm migrate:wp`, `next build`, `next start` e Playwright.
   - Remover imagem Docker, GHCR, Trivy, k6, Lighthouse CI e Storybook do CI.
   - Remover `@lhci/cli` e `lighthouse` das dependências (B11).
   - CodeQL pode ficar.
7. **Scripts que funcionem no Windows:** nada de `VAR=x comando` no `package.json`. Use o `--env-file` do tsx/node, ou defina a variável dentro do script.
8. **Housekeeping:**
   - `.env.example` só com o que existe (tirar `NEXT_PUBLIC_SITE_URL`, que não é usado);
   - README curto: o que é, como rodar e como publicar;
   - fechar o PR [vhonorato02/quarau#1](https://github.com/vhonorato02/quarau/pull/1) se o `gh` estiver logado. Se não estiver, anotar em PROGRESSO.

**Pronto quando:**

- `pnpm lint && pnpm typecheck && pnpm test` passam;
- `pnpm dev` funciona só com `apps/web/.env.local`;
- `git grep -i -E "coolify|traefik|minio|meili|valkey|vps"` só aparece em ADRs históricas.

## Fase 3 — Conteúdo e TODAS as mídias

O cache em `apps/web/.migrate-cache/` (fora do git, veio no zip) tem:

- `uploads/`: as **265 mídias** da biblioteca do WordPress (`content/legacy/wp-json/media.json`) mais logos e arquivos usados no conteúdo;
- `video/`: 3 vídeos **já convertidos** para 720p (dispensa ffmpeg).

Ignore os `.mp4` originais de `uploads/`; se existirem, são enormes.

> Se o projeto veio do zip **sem mídias** (sem `apps/web/.migrate-cache/`), o script baixa tudo do WordPress
> (que continua no ar). Os vídeos então precisam do ffmpeg para virar 720p: `winget install Gyan.FFmpeg` /
> `brew install ffmpeg`. Sem ffmpeg, importe só as imagens e deixe os vídeos para depois (anote em PROGRESSO).

1. **Importar a biblioteca inteira** (C2). Em `scripts/migrate-wp.ts`, depois do conteúdo:
   - percorrer `media.json` e importar todo item ainda sem `legacyUrl` correspondente;
   - alt text = `alt_text`, ou senão o título do WP, ou senão um alt contextual;
   - `needsReview: true` quando o alt for genérico;
   - legenda = `caption` do WP.
   - Vídeos vêm de `video/`. A duplicata `QUIPA_LEG_PORT-1.mp4` é ignorada.
   - Deve continuar **idempotente**: rodar duas vezes não duplica nada.
2. **Logos de parceiros** (H3):
   - Use a maior versão disponível no cache ou no WordPress.
   - Quem não tem logo (Espaço Crescer, Instituto Umbuzeiro) aparece como **nome em texto** no mesmo tamanho visual.
   - Registre em PROGRESSO: "pedir logos em vetor ao cliente `[CONFIRMAR]`".
3. **Dados do Quipá:** anos ficam vazios e ocultos (`[CONFIRMAR]`). Nada inventado.
4. Rodar no **banco dev**: `pnpm --filter @quarau/web migrate:wp`. Conferir no `/admin`:
   - ~269 mídias (265 da biblioteca + vídeos + logos);
   - 6 projetos;
   - 4 áreas;
   - 7 parceiros;
   - 4 páginas.
5. **Seções vazias** (O1, B10):
   - Notícias e Vagas **somem do menu, do rodapé e do sitemap** quando não houver nada publicado (consulta com `limit: 1`);
   - a página direta mostra um estado vazio bonito com `noindex`.

**Pronto quando:** contagens batem, o import repetido não duplica, e o site local mostra as mídias servidas pelo domínio do Blob.

## Fase 4 — Design do site (refazer o acabamento)

**Direção:**

- institucional, humano e editorial;
- **guiado por fotografia de território**;
- hierarquia forte;
- espaço em branco com propósito, não vazio.

Marca: Barlow, azul `#0089CF` (texto azul sobre branco: `#006FA8`), verde `#39B54A` só como acento, tinta `#0B1F2E`, fundo claro `#F2F6F9`. Regras completas em [brand.md](brand.md).

### 4.1 Fundamentos (em `packages/ui` e `globals.css`)

- **Escala tipográfica:**
  - corpo 18 px / 1.6;
  - texto de card 16 px;
  - metadados **≥ 14 px** (nada menor, exceto rodapé legal);
  - h1 `clamp(2.75rem, 6vw, 5.5rem)`;
  - h2 `clamp(2rem, 4vw, 3.5rem)`;
  - h3 24–28 px.
  - Medida de leitura máxima: 68ch.
- **Grade:** container de 1280 px com margens de 20, 32 e 48 px; grade de 12 colunas; ritmo vertical de seção 96–128 px no desktop e 64 px no celular.
  - **Proibido:** coluna vazia de meia tela e buraco em grade.
- **Imagens:**
  - proporções fixas: card 4:3, hero 16:9 no desktop e 4:5 no celular, galeria 3:2;
  - `object-position` pelo ponto focal do CMS;
  - `quality` 80, com `images.qualities` incluindo 80;
  - `sizes` corretos;
  - nunca ampliar acima do original (máx. 1600 px no WP) (S3).
- **Movimento:**
  - só CSS (fade + 12 px, 300 ms, ao entrar na tela);
  - **remover** React Three Fiber/three.js (hero 3D), GSAP e Lenis (S7, H1);
  - respeitar `prefers-reduced-motion`.
- **Banner de cookies** (S1): compacto, canto inferior esquerdo, máx. 400 px no desktop e barra fina no celular. Não pode cobrir CTA nem título.
- **Header:** logo completo também no celular (~120 px de largura) (S6); menu Sobre · Atuação · Projetos · Contato + botão "Fale com a Quarau".
- **Rodapé:** como está. A faixa de CTA não aparece na página Contato (S5).

### 4.2 Páginas

- **Home:**
  - Hero:
    - foto de projeto em tela cheia (85 vh) escolhida no CMS;
    - gradiente de tinta à esquerda;
    - H1, subtítulo e 2 CTAs;
    - o símbolo da marca como acento SVG pequeno, **nunca sobre rostos**.
  - "Quem somos": frase de 28–32 px em cor sólida (sem o cinza que revela por palavra, H4) + foto.
  - Números: 3 indicadores.
  - **Projetos em destaque:** 3 cards iguais, ou 1 grande + 2 empilhados que fechem a grade (H2).
  - **Atuação:** 4 cards **com foto** (H5).
  - Como trabalhamos: 6 etapas compactas (linha horizontal no desktop, vertical no celular).
  - **Parceiros:** logos de 56–64 px de altura, 4–6 por linha, cinza → cor no hover, nome em texto quando não há logo (H3).
  - CTA final.
- **Projetos (lista):**
  - introdução + filtros com chips de 16 px;
  - grade **uniforme** de 3 colunas (2 no tablet, 1 no celular) (P2);
  - card: foto 4:3, área, título 22 px, resumo de 2 linhas em 16 px, ano e local em 14 px.
- **Case de projeto:**
  - capa de 70 vh com título e chips;
  - lead de 24 px + **ficha técnica** lateral em 16 px (sticky no desktop);
  - faixa de resultados;
  - "Sobre o projeto" em coluna legível sem metade vazia (P3);
  - capítulos alternando imagem e texto;
  - **mapas e "Território" em grade 2–3 colunas com lightbox, no container** (acabar com o carrossel cortado, P1);
  - vídeo;
  - ODS (chips de 15 px);
  - galeria com as 9 primeiras + botão "Ver todas as N fotos" no lightbox (P4);
  - publicações;
  - próximo projeto.
- **Sobre** (O3):
  - hero com foto;
  - introdução;
  - linha do tempo/história (com o que já existe; sem inventar);
  - missão, visão e valores em 3 cards (texto de 17 px);
  - como trabalhamos;
  - equipe (só se houver cadastro);
  - ODS;
  - parceiros;
  - CTA.
- **Atuação:**
  - lista com 4 cards grandes com foto, descrição e nº de projetos;
  - página da área (O2): capa com foto (novo campo `cover` em Áreas), descrição, "o que entregamos", **grade dos projetos daquela área**, CTA.
- **Contato** (O4):
  - canais clicáveis: `mailto:`, `tel:`, WhatsApp `https://wa.me/55…` (marcar `[CONFIRMAR]` se é WhatsApp), Instagram e LinkedIn;
  - formulário ao lado;
  - sem faixa de CTA.
- **Busca:** alinhada ao container; resultados com miniatura.
- **404:** manter.

### 4.3 Como validar

- Para cada página, compare as capturas do `tests/qa/screens.mjs` com esta lista.
- Critério: nenhum item de §3 do relatório pode continuar visível.
- Atualize os snapshots do teste visual (`tests/e2e/visual.spec.ts`) só depois de aprovar as capturas.

**Pronto quando (medido no ar, Fase 7):**

- QA sem problemas;
- **Lighthouse mobile:** Performance ≥ 90, Acessibilidade = 100, Boas práticas ≥ 95 (`npx lighthouse https://quarau.vercel.app --form-factor=mobile`);
- JS inicial da home ≤ 150 KB gzip;
- axe sem violações.

## Fase 5 — CMS para quem edita

1. **Blocos com nome** (C1): cada bloco mostra no rótulo o título, ou o primeiro texto, ou o tipo + nº de itens (`admin.components.Label` / `RowLabel`). Fim do "Sem título".
2. **Menu sem gambiarra** (C3): tipo de link novo **"Seção do site"**, com select: Início, Sobre, Atuação, Projetos, Notícias, Trabalhe conosco, Contato, Busca. Migrar o menu e o rodapé para usar isso.
3. **Listas legíveis** (C5): miniatura da capa, "Destaque" como ✓/—, anos vazios como "—", colunas úteis por padrão.
4. **Painel inicial** (C6):
   - contadores (projetos publicados, rascunhos, mídias para revisar alt, contatos novos);
   - últimos 5 contatos;
   - atalhos.
   - Uma página **"Ajuda"** dentro do admin, com o conteúdo de `docs/cms.md` reescrito para leigos.
5. **Limpezas** (C7, C8):
   - primeiro usuário sem o campo Papéis (sempre admin);
   - "Criado por" preenchido automaticamente ou oculto;
   - aba API escondida para quem não é admin (`admin.hideAPIURL`);
   - "Criar novo" não grava rascunho vazio (autosave só depois do primeiro salvamento, ou intervalo maior + limpeza de rascunhos sem título).
6. **Identidade** (C9): Barlow e as cores da marca no admin (`app/(payload)/custom.scss`).
7. **Mídias para revisar:** filtro salvo "Precisa revisar alt" (`needsReview`).

**Pronto quando:**

- um editor consegue, sem ajuda: criar um projeto com capa e galeria, publicar, ver no site, reordenar blocos da home sabendo o que cada um é e trocar um link do menu;
- isso foi verificado com Playwright no ar e com capturas do admin.

## Fase 6 — Backend e integrações

1. **E-mail (Resend, gratuito)** (B4):
   - 🔑 **Momento opcional do dono, ~5 min:**
     - entrar em resend.com (login com GitHub);
     - criar uma API key;
     - colar em **Vercel → projeto quarau → Settings → Environment Variables** como `RESEND_API_KEY` (Production e Preview).
     - Não colar no chat.
   - Enquanto o domínio `quarau.com.br` não for verificado (não é para mexer agora), a Resend só entrega para o e-mail da conta do dono. Use esse e-mail em `CONTACT_RECIPIENT` e remetente `onboarding@resend.dev`.
   - **Sem chave, o formulário continua funcionando:** grava em "Contatos recebidos" e o painel mostra "contatos novos".
2. **Formulário:** validar ponta a ponta no ar (grava, mostra sucesso, e-mail se houver chave, limite por IP). O Turnstile fica desligado (sem chaves).
3. **Agendamento:** o cron diário (`vercel.json`) chama `/api/payload-jobs/run` com `CRON_SECRET`. Teste no ar com `curl -H "Authorization: Bearer …"`, usando o valor do dev, ou crie um temporário.
4. **Revalidação:** publicar no CMS aparece no site em segundos. Testar no ar.
5. **Sitemap e robots:** `SITE_NOINDEX=true` continua (domínio provisório); sitemap sem seções vazias.

## Fase 7 — Publicar e provar no ar

1. `git push origin main` e acompanhar: `vercel ls`, `vercel inspect <url> --logs`. Corrigir até o deploy ficar **Ready**.
2. **Conteúdo em produção** (uma vez, do computador local, usando o cache):
   - `vercel env pull apps/web/.env.production.local --environment production --yes`.
   - As sensíveis vêm vazias: defina um `PAYLOAD_SECRET` qualquer só para o script.
   - Depois: `pnpm --filter @quarau/web migrate:wp --env-file=.env.production.local`, ou o equivalente que a Fase 2 padronizou.
   - Conferir as contagens no `/admin` de produção.
   - Apagar o `.env.production.local` ao terminar.
3. **Admin de produção:**
   - criar com `seed:admin` usando o e-mail de `git config user.email` (ou o da conta Vercel) e uma senha forte gerada;
   - gravar e-mail + senha em `ACESSO-ADMIN.txt` na raiz (no `.gitignore`).
4. **QA no ar (obrigatório):**
   - `pnpm --filter @quarau/web exec node tests/qa/screens.mjs https://quarau.vercel.app`;
   - **olhar todas as capturas** (desktop e celular);
   - corrigir, publicar, repetir até zero problemas e nada feio.
   - Copiar 1 captura por página para `docs/qa/` (JPEG ≤ 150 KB).
5. **Fluxos no ar** (Playwright ou à mão, com capturas):
   - login no admin;
   - criar projeto com **upload de imagem** (testa o upload direto para o Blob e a CSP);
   - publicar → aparece no site;
   - despublicar/excluir;
   - formulário de contato → aparece em "Contatos recebidos";
   - busca com e sem acento;
   - 301 de 3 URLs antigas (ex.: `/portfolio/projeto-ecoe-verde/` → `/projetos/projeto-ecoe-verde`);
   - 404;
   - vídeo toca;
   - lightbox abre e fecha no teclado.
6. **Lighthouse mobile no ar** (metas da Fase 4) e registrar os números em PROGRESSO.

## Fase 8 — Entrega

- Reescrever `docs/relatorio-final.md`, curto: o que é, URL, como editar, limites do plano gratuito e `[CONFIRMAR]` pendentes.
- Reescrever `docs/cms.md` para leigos.
- Atualizar `README.md`.
- PROGRESSO.md 100% marcado.
- Último push; deploy **Ready**; QA final limpo.
- Mensagem final ao dono, em português simples:
  - URL do site e do admin;
  - onde está `ACESSO-ADMIN.txt`;
  - o que ele precisa confirmar com o cliente;
  - os limites do plano gratuito:
    - Hobby é para uso não comercial;
    - publicação agendada roda 1×/dia;
    - Blob de 1 GB.

## Referências rápidas

| Comando                                                               | Para quê                                 |
| --------------------------------------------------------------------- | ---------------------------------------- |
| `pnpm dev`                                                            | site + admin em `localhost:3000`         |
| `pnpm lint && pnpm typecheck && pnpm test`                            | qualidade                                |
| `pnpm --filter @quarau/web test:e2e`                                  | E2E (Playwright)                         |
| `pnpm --filter @quarau/web payload migrate` / `migrate:create <nome>` | migrações                                |
| `pnpm --filter @quarau/web migrate:wp`                                | importar conteúdo e mídias (idempotente) |
| `pnpm --filter @quarau/web exec node tests/qa/screens.mjs <url>`      | QA visual (capturas + relatório)         |
| `vercel ls` · `vercel inspect <url> --logs` · `vercel logs <url>`     | deploys e logs                           |
| `vercel env ls` · `vercel env pull …`                                 | variáveis                                |
