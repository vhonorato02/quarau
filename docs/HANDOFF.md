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

- CI no GitHub: qualidade e integração verdes; job E2E (imagem + Playwright + Lighthouse + links + k6 + Trivy)
  em validação no primeiro run.
- Local: 30 unit, 8 integração, 90 E2E (desktop + mobile, axe WCAG 2.2 AA) passando.

## Próximos passos

1. Acompanhar o CI até ficar verde (ajustar o que o ambiente do GitHub revelar).
2. Com o secret configurado: bootstrap da VPS, deploy, migração, admin, backup e teste de restore.
3. Medir Lighthouse em produção e continuar otimizando o JS do cliente (meta: performance ≥ 95 no mobile).
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
