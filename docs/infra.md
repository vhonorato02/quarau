# Infraestrutura

## Visão geral

```
Internet ──► Traefik v3.6 (:80 → :443, HTTP/3, Let's Encrypt, cabeçalhos, compressão)      /srv/platform
                │  rede "proxy"   (rotas em traefik/dynamic/site-<site>.yml, escritas pelo comando "site")
                ▼
      quarau-web (Next.js 16 + Payload 3, imagem do GHCR)                                    /srv/sites/quarau
      mídias em data/media · busca no Postgres · rate limit em memória
                │  rede "db" (interna, sem internet)
                ▼
      Postgres 17 compartilhado (um banco + um usuário por site)                             /srv/platform
```

- VPS: 2 GB de RAM (+ 2 GB de swap + zram), 28 GB de disco, IP **177.107.94.31**, Ubuntu 24.04, Docker 29.
  SSH **somente na porta 22322**.
- Domínio temporário: `quarau.zewithane.vps.brz.dev.br` (DNS curinga `*.zewithane.vps.brz.dev.br`), com
  `noindex`.
- Arquitetura e motivos: [ADR 0013](decisions/0013-plataforma-vps-traefik-sem-painel.md). Operação do dia a dia:
  [guia da VPS](vps-guia.md) e [runbook](runbook.md).
- Código da plataforma: [`infra/platform/`](../infra/platform) (instala/atualiza com
  `sudo infra/platform/install.sh`). Configuração do site: [`infra/sites/quarau/`](../infra/sites/quarau).

### Memória (medida em 2026-10-06)

| Componente | Uso     | Limite |
| ---------- | ------- | ------ |
| Traefik    | ~32 MB  | 128 MB |
| Postgres   | ~95 MB  | 448 MB |
| quarau-web | ~210 MB | 768 MB |

Versão enxuta da stack: sem MinIO, Meilisearch, Valkey, pgBouncer, Umami nem Uptime Kuma (o código já degrada
para mídia local, busca no banco e rate limit em memória). Se a VPS crescer, cada um volta como serviço extra no
`compose.yml` do site.

## Pipeline (GitHub Actions)

| Workflow                                  | Quando               | O quê                                                                                                                                                                          |
| ----------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [CI/CD](../.github/workflows/ci.yml)      | push na `main` e PRs | format, lint, typecheck, unit, Storybook · integração Payload · **imagem Docker + E2E/axe na imagem real**, links, Lighthouse, k6, Trivy · push no GHCR (`:<sha>` e `:latest`) |
| [CodeQL](../.github/workflows/codeql.yml) | push/PR/semanal      | Análise de segurança do código                                                                                                                                                 |
| Renovate                                  | segunda-feira        | Atualizações de dependências                                                                                                                                                   |

Qualquer falha bloqueia a publicação da imagem. **O deploy é puxado pela VPS** (timer de 2 min que observa o
`:latest`), então o GitHub não guarda nenhuma chave de acesso ao servidor.

## Segredos

- Plataforma: `/srv/platform/.env` (senha do Postgres, senha do restic, URL de alerta). `chmod 600`, root.
- Site: `/srv/sites/quarau/app.env` (`PAYLOAD_SECRET`, `DATABASE_URL`, SMTP…). `chmod 600`, root. Modelo em
  [`infra/sites/quarau/app.env.example`](../infra/sites/quarau/app.env.example).
- Nenhum segredo vai para o Git nem para logs. Guarde `RESTIC_PASSWORD` também fora do servidor.

## Backups

- **O quê:** dump de cada banco (`pg_dump -Fc`) + globais, `/srv/sites` (inclui as mídias) e `/srv/platform`
  (sem os arquivos brutos do Postgres).
- **Onde:** restic criptografado em `/srv/backups/restic`; cópia off-site opcional com
  `RESTIC_REPOSITORY_OFFSITE` (recomendado: Backblaze B2). `[CONFIRMAR destino]`
- **Quando:** todo dia às 03:17; retenção de 7 diários, 4 semanais e 6 mensais; verificação de 5% dos dados a cada
  execução.
- **Teste de restore:** todo domingo às 04:23, restaura os dumps em bancos temporários e compara as tabelas com
  produção.

## Monitoramento e alertas

- Healthcheck do container (`/next/health`, verifica o banco) → reinício automático e bloqueio de deploy defeituoso.
- `platform-health` (timer de 5 min): HTTPS de cada site, containers, Postgres, disco > 85%, memória < 150 MB,
  backup com mais de 30 h → alerta via ntfy (`ALERT_URL`), uma vez por problema e outra na normalização.
- Erros da aplicação: Sentry/GlitchTip via `SENTRY_DSN` (opcional).
- Logs: `site logs quarau` (JSON estruturado, dados pessoais redigidos; rotação de 10 MB × 3 por container).

## Desenvolvimento local

```bash
cp .env.example .env && ln -sf ../../.env apps/web/.env
pnpm install
pnpm services:up                 # Postgres, Valkey, MinIO, Meilisearch, Mailpit
pnpm dev                         # http://localhost:3000  (admin em /admin)
pnpm migrate:wp                  # importa o conteúdo do site antigo (cache em apps/web/.migrate-cache)
ADMIN_EMAIL=voce@exemplo.com pnpm --filter @quarau/web seed:admin
pnpm storybook                   # design system em http://localhost:6006
```

E-mails de teste: Mailpit em http://localhost:8025.
