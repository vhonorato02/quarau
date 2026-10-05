# Handoff — estado do trabalho

> Atualizado continuamente. Se uma sessão for interrompida, comece por aqui.

## Onde estamos (2026-10-05)

- Branch única: `main` (pedido do cliente: sem branches, tudo direto na main, deploy automático).
- Produto completo no repositório: site + CMS + migração + testes + CI/CD + infra + documentação.
  Ver [relatorio-final.md](relatorio-final.md).
- **Bloqueio para estar no ar:** falta o secret `VPS_SSH_KEY` no GitHub (o ambiente de construção não tem SSH).
  Depois disso, rodar em Actions → _VPS operations_: `audit` → `bootstrap` → (push/re-run CI = deploy) →
  `migrate-content` → `create-admin <email>` → `backup` → `restore-test`.

## Últimos passos concluídos

- CI no GitHub: qualidade, integração, E2E na imagem real, links, Lighthouse CI e k6 passando; Trivy corrigido
  (imagem endurecida, 0 altas/críticas corrigíveis).
- Infra validada numa VPS simulada (Traefik 3.6 + rede `coolify`): deploy sem downtime (drain), versão quebrada
  rejeitada, rollback, backup + off-site, restore-test, restore real, healthwatch. Ver `docs/runbook.md`.
- Local: 30 unit, 9 integração, 90 E2E (desktop + mobile, axe WCAG 2.2 AA) passando.

Para repetir a simulação: crie a rede `coolify`, rode um `traefik:v3.6` nela (provider docker, entrypoints
`http`/`https`), copie `infra/compose` + `infra/scripts` para um diretório e use `APP_DIR=<dir> SKIP_PULL=1
scripts/deploy.sh <tag>`. O Traefik 3.5 não fala com o Docker 29 (API mínima 1.40): use 3.6+.

## Próximos passos

1. CI no commit `66500e1` (run 37365106378): integração, imagem + E2E/axe, links, Lighthouse, k6 e Trivy **verdes** e
   imagem publicada no GHCR. O job _Lint, typecheck, unit, Storybook_ ficou 4 vezes na fila por 15 min e foi
   cancelado sem receber runner (problema do lado do GitHub; os mesmos passos passam localmente e passaram no run 10).
   Verificar limites/cobrança de Actions da conta e re-executar só esse job.
2. Com o secret `VPS_SSH_KEY`: Actions → _VPS operations_ `audit` → `bootstrap` → re-run do CI (deploy) →
   `migrate-content` → `create-admin <email>` → `backup` → `restore-test`. No `audit`, conferir a versão do Traefik
   do Coolify (3.5 não conversa com Docker 29; se for o caso, atualizar o proxy pelo painel do Coolify).
3. Medir performance em produção (meta ≥ 95; laboratório local hoje: 83–94).
4. Resolver `[CONFIRMAR]` com o cliente (relatório final, §4).

## Ambiente local (resumo)

```bash
docker compose -f infra/compose/docker-compose.dev.yml up -d
cp .env.example .env && (cd apps/web && ln -sf ../../.env .env)
pnpm install && pnpm dev            # site + /admin
pnpm migrate:wp                     # conteúdo real (ou MIGRATE_OFFLINE=1 para placeholders)
```

Armadilhas já resolvidas (não repetir):

- Payload **muta o objeto `context`** durante uploads: passe um objeto novo em cada chamada (`ctx()`).
- Imagens do Docker Hub: use `mirror.gcr.io/...`; MinIO: `cgr.dev/chainguard/minio` (não há mais `minio/minio`).
- `robots`, `sitemap` e `X-Robots-Tag` são runtime (não usar `headers()` do next.config para isso).
- Standalone precisa de `HOSTNAME=0.0.0.0` (já no Dockerfile).
- Não usar `pkill -f <padrão>` em comandos que contenham o próprio padrão (mata o shell).
- Valores com parênteses/crases no `.env` (ex.: `TRAEFIK_RULE`) precisam de aspas simples: os scripts fazem `source`.
- Requisições à API do Payload com cookie precisam do header `Origin` (proteção CSRF).
- O banco de dev `quarau` tem drift de schema; testes de integração usam `quarau_test` (CI usa banco novo).
