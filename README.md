# Quarau — site institucional

Site e painel de conteúdo da **Quarau — Projetos Socioambientais, Educativos e Culturais** (hoje em
`quarau.com.br`, WordPress). Next.js 16 + Payload CMS 3 no mesmo app, design system próprio (direção "Lente").

|                |                                                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stack**      | Next.js 16 (App Router, RSC) · Payload CMS 3 · PostgreSQL · Tailwind CSS 4 · Zod · React Email                                                                                             |
| **Qualidade**  | TypeScript strict · ESLint (inclui "nenhum texto fora do CMS") · Prettier · Vitest · integração Payload + Postgres · Playwright + axe · Lighthouse CI · auditoria de dependências · CodeQL |
| **Hospedagem** | Grátis hoje (Vercel + Neon + Cloudflare R2), VPS amanhã com a mesma imagem Docker ([ADR 0019](docs/decisions/0019-free-tier-portavel.md))                                                  |

## Começar (Windows, macOS ou Linux, sem Docker)

```bash
corepack enable && pnpm install
cp .env.example apps/web/.env.local     # ajuste DATABASE_URL e PAYLOAD_SECRET
pnpm db:local                           # outro terminal: Postgres 17 embutido em localhost:54329
pnpm --filter @quarau/web migrate       # aplica as migrações
pnpm seed                               # conteúdo inicial (idempotente; nunca sobrescreve edições)
ADMIN_EMAIL=voce@exemplo.com pnpm --filter @quarau/web seed:admin   # senha vai para ACESSO-ADMIN.txt
pnpm dev                                # http://localhost:3000 · painel em /admin
```

Verificações: `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm --filter @quarau/web test:int` ·
`pnpm --filter @quarau/web test:e2e` · `node tools/qa/hardcoded.mjs`.

## Publicar

- **Demonstração temporária (sem conta):** GitHub → Actions → _Temporary deployment (claimable)_ → _Run workflow_.
  Publica na Vercel, roda e2e + Lighthouse na URL nova e guarda os relatórios ([tools/deploy/](tools/deploy/)).
- **Homologação e produção:** [docs/MIGRACAO-VPS.md](docs/MIGRACAO-VPS.md) (contas, primeira carga, corte para a VPS, rollback).

## Documentação

- [docs/PROGRESSO.md](docs/PROGRESSO.md): estado atual e "Retomar em"
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): camadas, modelo de conteúdo, cache, segurança, pipeline
- [docs/DESIGN.md](docs/DESIGN.md): direção de design, tokens e componentes
- [docs/cms.md](docs/cms.md): guia do painel para quem edita
- [docs/QUARAU.md](docs/QUARAU.md) e [docs/CONTENT-TODO.md](docs/CONTENT-TODO.md): fatos com fonte e o que falta confirmar
- [docs/AUTOCRITICA.md](docs/AUTOCRITICA.md): avaliação antes/depois com evidências em `docs/qa/`
- [docs/decisions/](docs/decisions/): ADRs (0016–0021 são as atuais)

Fluxo: só a branch `main`, Conventional Commits, CI completo a cada push.
