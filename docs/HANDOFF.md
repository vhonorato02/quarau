# Handoff — estado do trabalho

> Atualizado continuamente. Se uma sessão for interrompida, comece por aqui.

## Onde estamos
- Branch única: `main` (pedido do cliente: sem branches; tudo direto na main).
- Monorepo pnpm + Turborepo: `apps/web` (Next 16 + Payload 3.90), `packages/ui` (design system + Storybook),
  `packages/emails` (React Email), `packages/config`.
- Inventário do site antigo: `docs/inventario.md`; marca: `docs/brand.md`; snapshot bruto: `content/legacy/`.

## Feito
- Scraping completo, mapa de URLs, logo vetorizado, tokens, componentes UI (testes ok).
- CMS: coleções (pages, services, projects, news, jobs, team, partners, media, documents, leads, users),
  globals (navigation, footer, contact, social, site-settings), blocos, papéis, rascunhos/agendamento,
  live preview, SEO, redirects, S3 (MinIO), Meilisearch, revalidação on-demand.
- Frontend: layout, header/footer, todos os blocos, portfólio (listagem com filtro + case completo),
  atuação, notícias, vagas, busca, 404/500, sitemap/robots/manifest, OG dinâmica, redirects legados.

## Próximos passos (em ordem)
1. `apps/web/scripts/migrate-wp.ts` (conteúdo + mídia + copy reescrito) → `pnpm migrate:wp`.
2. Revisão visual com screenshots (Playwright) e ajustes de design.
3. Testes (Vitest, Playwright E2E, axe, visual, links, LHCI, k6), CI no GitHub Actions.
4. Dockerfile + compose de produção (Traefik do Coolify), deploy por SSH via Actions, backups restic.
5. Docs: README, infra.md, cms.md, ADRs, runbook, relatório final.

## Ambiente local
```bash
docker compose -f infra/compose/docker-compose.dev.yml up -d   # postgres, valkey, minio, meili, mailpit
cp .env.example .env && (cd apps/web && ln -sf ../../.env .env)
pnpm install && pnpm --filter @quarau/web dev
```
Imagens Docker: usar `mirror.gcr.io/...` (Docker Hub limita pulls) e `cgr.dev/chainguard/minio`
(a MinIO deixou de publicar imagens oficiais).

## Bloqueios conhecidos
- O container de desenvolvimento não alcança a VPS por SSH (só HTTPS sai). O deploy é feito pelo
  GitHub Actions; requer os Secrets `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_SSH_KEY` cadastrados pelo dono do repo.
