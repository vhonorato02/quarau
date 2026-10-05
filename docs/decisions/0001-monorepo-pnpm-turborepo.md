# 0001 — Monorepo pnpm + Turborepo, TypeScript strict

- **Status:** aceita · **Data:** 2026-10-05

## Contexto
Site, design system, e-mails e configurações compartilhadas precisam evoluir juntos e ser testados no mesmo CI.

## Decisão
Monorepo `pnpm` + `turbo`: `apps/web` (Next.js + Payload), `packages/ui` (design system + Storybook),
`packages/emails` (React Email), `packages/config` (ESLint/tsconfig). Pacotes internos são consumidos
como código-fonte TypeScript (`transpilePackages`), sem etapa de build própria. TypeScript `strict` +
`noUncheckedIndexedAccess` em tudo.

**TypeScript 6.0.x** (não 7.x): o TS 7 (compilador nativo) ainda não expõe a API JS usada por
`next build`, `typescript-eslint` e Payload `generate:types`.

## Consequências
Um único `pnpm install`/lockfile; tarefas cacheadas pelo Turbo. Atualizar o TS 7 quando o ecossistema suportar.
