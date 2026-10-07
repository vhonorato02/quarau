# Quarau — site institucional

Site da **Quarau — Projetos Socioambientais, Educativos e Culturais**, reconstruído a partir de
[quarau.com.br](https://quarau.com.br) (WordPress) com foco no **portfólio de projetos** e em um CMS completo e
simples para a equipe.

|               |                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**     | Next.js 16 (App Router, RSC, View Transitions) · Payload CMS 3.90 · PostgreSQL 17 + pgBouncer · Valkey · MinIO · Meilisearch · Tailwind CSS v4 · Radix · GSAP/Lenis · React Three Fiber · next-intl · React Email |
| **Qualidade** | TypeScript strict · ESLint/Prettier · Vitest · Payload integration tests · Playwright E2E + axe (WCAG 2.2 AA) · visual regression · Lighthouse CI · links · k6 · Trivy · CodeQL · Renovate                        |
| **Infra**     | Docker (GHCR) · VPS própria: Traefik (HTTPS/HTTP3) + Postgres compartilhado · auto-deploy sem downtime · restic · alertas ntfy · Sentry                                                                           |

## Estrutura

```
apps/web/                 Next.js + Payload (site, /admin, /api)
  src/collections|globals|blocks   modelo de conteúdo do CMS
  src/app/(frontend)/[locale]      páginas do site
  src/components                   blocos, portfólio, hero 3D, formulário…
  scripts/migrate-wp.ts            migração idempotente do WordPress (pnpm migrate:wp)
  tests/{unit,int,e2e}             Vitest, integração Payload, Playwright
packages/ui/              design system (tokens da marca, componentes, Storybook)
packages/emails/          templates React Email
packages/config/          ESLint e tsconfig compartilhados
infra/compose|scripts     stack de produção e scripts de operação (deploy, backup…)
content/legacy/           snapshot do site antigo (wp-json, textos, mapa de URLs)
docs/                     documentação (ver abaixo)
```

## Começar

```bash
corepack enable && pnpm install
cp .env.example .env && ln -sf ../../.env apps/web/.env
pnpm services:up          # Postgres, Valkey, MinIO, Meilisearch, Mailpit (Docker)
pnpm dev                  # http://localhost:3000 · painel em /admin
pnpm migrate:wp           # importa todo o conteúdo do quarau.com.br
ADMIN_EMAIL=voce@exemplo.com pnpm --filter @quarau/web seed:admin
```

Scripts úteis: `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm --filter @quarau/web test:int` ·
`pnpm test:e2e` · `pnpm storybook` · `pnpm format`.

## Documentação

- [docs/relatorio-final.md](docs/relatorio-final.md): o que foi feito, decisões, pendências `[CONFIRMAR]`
- [docs/brand.md](docs/brand.md): regras da marca (logo, cores, tipografia)
- [docs/cms.md](docs/cms.md): guia do painel para quem edita o site
- [docs/infra.md](docs/infra.md): infraestrutura, CI/CD, segredos, backups, monitoramento
- [docs/vps-guia.md](docs/vps-guia.md): guia da VPS (como pôr qualquer site no ar)
- [docs/runbook.md](docs/runbook.md): deploy, rollback e incidentes do Quarau
- [docs/go-live.md](docs/go-live.md): checklist da troca para quarau.com.br
- [docs/inventario.md](docs/inventario.md): inventário do site antigo
- [docs/decisions/](docs/decisions): ADRs
- [docs/HANDOFF.md](docs/HANDOFF.md): estado atual do trabalho

Fluxo de trabalho: commits pequenos no padrão Conventional Commits diretamente na `main`. Cada push roda o CI
completo e, se tudo passar, publica a imagem; a VPS a coloca no ar sozinha em até 2 minutos.
