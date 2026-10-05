# 0002 — Next.js 16 + Payload CMS 3 no mesmo app

- **Status:** aceita · **Data:** 2026-10-05

## Decisão
Next.js **16.3** (App Router, RSC, View Transitions nativas do React 19.3) com **Payload 3.90** embutido
(`/admin` e `/api` no mesmo processo). Postgres via `@payloadcms/db-postgres` (Drizzle), migrações versionadas
em `apps/web/src/migrations` e aplicadas automaticamente no boot (`prodMigrations`). Em desenvolvimento o
schema é sincronizado por `push`.

## Consequências
- Um único container, sem API intermediária: o front lê o CMS pela Local API (sem HTTP).
- Toda mudança de schema exige `pnpm --filter @quarau/web migrate:create` e deve ser **aditiva**
  (o deploy roda duas versões lado a lado por alguns segundos — ver 0004).
