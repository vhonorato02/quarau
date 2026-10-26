# 0020 — Postgres local sem Docker, migrações versionadas e só a `main`

- **Status:** aceita
- **Data:** 2026-10-26

## Contexto

O computador do dono é Windows, sem Docker garantido. O banco de dev na nuvem (Neon) exige conta e rede, e os
testes de integração e e2e precisam de um Postgres descartável. O repositório tinha um branch padrão antigo
(`claude/…`) e um PR invertido.

## Decisão

- **Dev e testes locais:** `pnpm db:local` sobe um Postgres 17 com os binários oficiais via `embedded-postgres`
  (sem Docker, funciona em Windows, macOS e Linux), em `postgres://quarau:quarau@localhost:54329/quarau`, dados em
  `.cache/pg`. Também cria `quarau_test`.
- **CI:** serviço `postgres:17` do GitHub Actions.
- **Esquema só por migrações versionadas** (`src/migrations`); `push` desligado em todo lugar (`PAYLOAD_DB_PUSH=false`).
  O build da Vercel e o contêiner aplicam as migrações pendentes ao subir.
- **Git:** só a `main`, commits pequenos em Conventional Commits, push direto. Cada push roda o CI completo; a Vercel
  publica a homologação; tags `vX.Y.Z` publicam a imagem de release no GHCR.

## Consequências

- Nenhuma ferramenta além de Node + pnpm é necessária para rodar tudo localmente.
- O branch padrão do GitHub deve ser `main` (o antigo pode ser apagado pelo dono).
