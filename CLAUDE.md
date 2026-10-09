# Quarau — instruções para o agente

Site institucional da **Quarau** (consultoria em projetos socioambientais, educativos e culturais). Next.js 16 +
Payload CMS 3 (no mesmo app), publicado na **Vercel** com planos gratuitos. O dono não é técnico: ele quer dar um
prompt e receber o site **no ar, testado e bonito**.

## Missão

Executar [docs/PLANO.md](docs/PLANO.md) do começo ao fim, na ordem.

- Diagnóstico: [docs/RELATORIO-COMPLETO.md](docs/RELATORIO-COMPLETO.md).
- Progresso e retomada: [docs/PROGRESSO.md](docs/PROGRESSO.md). Leia antes de começar, marque ao terminar cada item e faça commit.

## Regras inegociáveis

- **Só a branch `main`.**
  - Sem branches, PRs, worktrees ou subagentes em paralelo.
  - Conventional Commits e push ao fim de cada fase.
  - Push na `main` = deploy na Vercel.
- **Produção é só a Vercel** (projeto `quarau`, time `jose-victors-projects-5cc9abbe`, `https://quarau.vercel.app`).
  - Nada de VPS, Coolify, Docker em produção ou deploy por GitHub Actions.
  - Tudo que fala de VPS no repositório é obsoleto: a Fase 2 remove.
- **Planos gratuitos:** Vercel Hobby, Neon Free, Vercel Blob e Resend Free.
- **Não mexer no domínio `quarau.com.br`** nem no WordPress antigo: DNS, e-mail e site ficam como estão. `SITE_NOINDEX=true` continua.
- **"Pronto" só com prova no ar:**
  - `tests/qa/screens.mjs` contra `https://quarau.vercel.app`;
  - **olhar as capturas** de desktop e celular;
  - corrigir o que estiver feio ou quebrado.
- **Segredos nunca no git nem na conversa.**
  - Variáveis ficam na Vercel e em `apps/web/.env.local` (fora do git).
  - Credenciais do admin vão para `ACESSO-ADMIN.txt` (fora do git).
- **Dados:** só o que o site antigo publicava ou o dono informou. O resto fica vazio/oculto e entra como `[CONFIRMAR]` em PROGRESSO.md.
- **Não perguntar ao dono** o que o plano já decide. Pare só nos 🔑 MOMENTOS DO DONO do plano (autenticar o MCP da Vercel, login na Vercel, login do GitHub no primeiro push, chave da Resend e contas de monitoramento opcionais).
- **Computador cru.**
  - Instale só o necessário: Node 22, pnpm via corepack, Vercel CLI, ffmpeg e o Chromium do Playwright.
  - **Sem Docker:** o banco de desenvolvimento é um Neon na nuvem.
  - No Windows, use o Git Bash.

## Ferramentas (MCP, em `.mcp.json`) e QA

- **playwright**: use para o QA de verdade.
  - Navegue no site e no admin no ar como uma pessoa: clique, preencha, redimensione para 390 px e 1440 px, leia o console.
  - As jornadas obrigatórias estão em [docs/QA.md](docs/QA.md).
- **vercel**: deploys, logs de build e de execução, variáveis. A CLI `vercel` é o plano B.
- **context7**: consulte a documentação atual antes de usar APIs de Next.js 16, Payload 3 ou Tailwind 4. As versões são mais novas que o seu treinamento.
- O QA tem 5 camadas (local, CI, pós-deploy, exploratório com MCP e aceite do dono). Leia [docs/QA.md](docs/QA.md) antes da Fase 2.

## Mapa do código

```
apps/web/                         Next.js + Payload (site, /admin, /api)
  src/payload.config.ts           banco, storage (Vercel Blob), e-mail, jobs, plugins
  src/collections|globals|blocks  modelo de conteúdo do CMS
  src/app/(frontend)/[locale]     páginas do site
  src/app/(payload)               admin do Payload (custom.scss = estilo do admin)
  src/components                  blocos, hero, projetos, site (header/footer), privacy (cookies)
  src/lib/platform-env.ts         SITE_URL/DATABASE_URL vindos da Vercel
  scripts/migrate-wp.ts           importação idempotente do WordPress (usa .migrate-cache/)
  scripts/content/*.ts            conteúdo-semente (textos revisados de cada página/projeto)
  scripts/vercel-build.ts         build na Vercel (migrações + next build)
  tests/{unit,int,e2e}            Vitest, integração Payload, Playwright
  tests/qa/screens.mjs            QA visual (capturas + relatório) contra qualquer URL
  vercel.json                     build, região gru1, cron diário
  .migrate-cache/                 (fora do git) cache das mídias baixadas do WP e vídeos 720p
packages/ui/                      design system (tokens da marca, componentes)
packages/emails/                  e-mails (React Email)
content/legacy/                   snapshot do site antigo (wp-json, url-map para 301)
docs/brand.md                     regras da marca
```

## Armadilhas já conhecidas

- **Payload muta o objeto `context`** em uploads: passe um objeto novo a cada chamada (`ctx()` no migrate-wp).
- **Nunca usar `push` do Payload num banco que recebe migrações.** Isso gera um prompt interativo que trava o servidor. Use `PAYLOAD_DB_PUSH=false` e migrações.
- **Requisições à API do Payload com cookie** precisam do header `Origin` (proteção CSRF).
- **Runtime, não `next.config` `headers()`:** `robots`, `sitemap` e `X-Robots-Tag` são resolvidos em tempo de execução.
- **Variáveis sensíveis da Vercel não descem com `vercel env pull`** (vêm vazias). Para scripts locais contra produção, só `DATABASE_URL` e `BLOB_READ_WRITE_TOKEN` importam.
- **Não use `pkill -f <padrão>`** quando o próprio comando contém o padrão: mata o seu shell. Mate pelo PID.
- **Turbo:** veja @AGENTS.md (docs da versão instalada em `node_modules/turbo/docs`).
