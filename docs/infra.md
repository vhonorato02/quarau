# Infraestrutura

## Visão geral

```
Internet ──► Traefik do Coolify (coolify-proxy, :80/:443, Let's Encrypt, HTTP/3)
                │  rede docker "coolify"
                ▼
      quarau-web (Next.js 16 + Payload 3, imagem do GHCR)  ──► Uptime Kuma / Umami (opcionais)
                │  rede interna "quarau_internal"
     ┌──────────┼──────────┬───────────┬─────────────┐
 pgBouncer ─► Postgres 17   Valkey      MinIO (S3)    Meilisearch
```

- VPS: 2 vCPU, 4 GB RAM, 30 GB SSD, IP `177.107.94.44`, SSH **somente na porta 22322**.
- Diretórios: `/srv/apps/quarau` (compose, `.env`, scripts, logs, `releases.log`) e
  `/srv/backups/quarau` (dumps + repositório restic). Novos projetos: `/srv/apps/<projeto>`.
- Limites de memória (compose): web 900 MB · Postgres 512 MB · MinIO/Meili 384 MB · Umami 320 MB ·
  Kuma 256 MB · Valkey 128 MB · pgBouncer 64 MB. Logs: `json-file` 10 MB × 5 por container.
- Decisões: [0004](decisions/0004-hospedagem-coolify-traefik.md), [0005](decisions/0005-imagens-docker.md),
  [0007](decisions/0007-valkey-cache-filas.md), [0008](decisions/0008-observabilidade.md),
  [0010](decisions/0010-acesso-vps-e-segredos.md).

## Pipeline (GitHub Actions)

| Workflow                                       | Quando               | O quê                                                                                                                                                                |
| ---------------------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CI/CD](../.github/workflows/ci.yml)           | push na `main` e PRs | format, lint, typecheck, unit, Storybook · integração Payload · **imagem Docker + E2E/axe na imagem real**, links, Lighthouse, k6, Trivy · push no GHCR · **deploy** |
| [CodeQL](../.github/workflows/codeql.yml)      | push/PR/semanal      | Análise de segurança do código                                                                                                                                       |
| [VPS operations](../.github/workflows/vps.yml) | manual               | `audit`, `bootstrap`, `migrate-content`, `create-admin`, `backup`, `restore-test`, `rollback`, `status`                                                              |
| Renovate                                       | segunda-feira        | Atualizações de dependências (instale o app Renovate no repositório)                                                                                                 |

Qualquer falha em qualidade, integração ou E2E **bloqueia o deploy**.

### Segredos do GitHub (Settings → Secrets and variables → Actions)

| Secret            | Obrigatório | Valor                                                                    |
| ----------------- | ----------- | ------------------------------------------------------------------------ |
| `VPS_SSH_KEY`     | sim         | Chave privada **dedicada ao deploy** (Ed25519)                           |
| `VPS_HOST`        | não         | padrão `177.107.94.44`                                                   |
| `VPS_PORT`        | não         | padrão `22322`                                                           |
| `VPS_USER`        | não         | padrão `deploy` (criado pelo bootstrap)                                  |
| `VPS_ADMIN_USER`  | não         | padrão `zewithane` (usuário com sudo, usado só no bootstrap)             |
| `VPS_KNOWN_HOSTS` | recomendado | saída de `ssh-keyscan -p 22322 177.107.94.44` (fixa a chave do servidor) |

Variáveis (não secretas): `TEMP_DOMAIN` (padrão `quarau.177-107-94-44.sslip.io`), `TURNSTILE_SITE_KEY`,
`UMAMI_ORIGIN`.

Todos os outros segredos (banco, MinIO, Payload, Meili, restic, basic auth) são **gerados no servidor** por
`provision-env.sh` e ficam somente em `/srv/apps/quarau/.env` (`chmod 600`). O modelo comentado está em
[`infra/compose/.env.production.example`](../infra/compose/.env.production.example).

## Primeira instalação (passo a passo)

1. Cadastre `VPS_SSH_KEY` (a chave pública correspondente já precisa estar em `~zewithane/.ssh/authorized_keys`).
2. Actions → **VPS operations** → `audit`: relatório somente-leitura (Docker, Coolify, SSH, UFW, disco, memória).
3. Actions → **VPS operations** → `bootstrap`:
   - pacotes (fail2ban, unattended-upgrades, restic, jq, rsync, ufw);
   - usuário `deploy` (grupo docker, chave autorizada, sudo restrito aos scripts de backup);
   - swap de 2 GB (se não houver) e ajustes de kernel (`/etc/sysctl.d/99-quarau.conf`);
   - atualizações automáticas de segurança;
   - fail2ban para SSH na porta 22322;
   - UFW: libera **22322/tcp primeiro**, depois 80/tcp, 443/tcp e 443/udp, e só então ativa;
   - cron: backup diário (03:17), teste de restore semanal (dom 04:23), healthwatch a cada 5 min; logrotate;
   - gera o `.env` com segredos aleatórios e o arquivo `CREDENCIAIS.txt` (basic auth do domínio temporário).
   - Endurecimento SSH é **opcional** (`arg: APPLY_SSH_HARDENING=1`): adiciona um drop-in em
     `/etc/ssh/sshd_config.d/` com login só por chave (root continua por chave, porque o Coolify depende disso),
     validado com `sshd -t` antes do reload. O `sshd_config` e a porta 22322 **nunca** são alterados.
4. Faça um push na `main` (ou _Re-run_ no CI): a imagem é publicada e o deploy roda.
5. Actions → **VPS operations** → `migrate-content`: importa o conteúdo do quarau.com.br (idempotente).
6. Actions → **VPS operations** → `create-admin` com seu e-mail em `arg`. A senha fica em
   `/srv/apps/quarau/CREDENCIAIS.txt` (leia por SSH; não aparece no log).
7. (Opcional) `docker compose --profile monitoring --profile analytics up -d` para Uptime Kuma e Umami.

## Deploy, rollback e operação

Ver [runbook.md](runbook.md).

## Backups

- **O quê:** dump do Postgres (`pg_dump -Fc`, banco do site e do Umami), volume do MinIO (todas as mídias),
  `.env` e `releases.log`.
- **Onde:** repositório restic em `/srv/backups/quarau/restic` (criptografado com `RESTIC_PASSWORD`).
- **Retenção:** 7 diários, 4 semanais e 6 mensais (`restic forget --prune`) + verificação de integridade parcial.
- **Off-site:** defina `RESTIC_REPOSITORY_OFFSITE` (S3, Backblaze B2, outro servidor via SFTP/rclone) e as
  credenciais no `.env`; cada backup é copiado (`restic copy`). **Recomendado antes do go-live.** `[CONFIRMAR destino]`
- **Teste de restore automático** (semanal): restaura o último snapshot num banco temporário, compara contagens de
  `pages/projects/services/media/users` com produção e confere as mídias no snapshot; alerta em caso de falha.
- **Restore real:** `sudo /srv/apps/quarau/scripts/restore.sh <snapshot|latest> --yes`. Faz um dump de segurança do
  estado atual antes de sobrescrever.

Importante: a senha do restic (`RESTIC_PASSWORD` no `.env`) deve ser guardada também fora do servidor, por exemplo
num gerenciador de senhas. Sem ela os backups não podem ser lidos.

## Monitoramento e alertas

- Healthcheck do container (`/next/health`, que verifica o banco) → reinício automático e bloqueio de deploy defeituoso.
- `healthwatch.sh` (cron, 5 min): site fora, container não saudável, disco > 85% ou memória < 200 MB →
  `ALERT_WEBHOOK_URL` (Slack, Discord, Google Chat, ntfy…). Avisa uma vez por problema e de novo na normalização.
- Uptime Kuma (opcional): `https://status.<domínio>`; configure monitores e notificações pela UI.
- Erros da aplicação: Sentry/GlitchTip via `SENTRY_DSN` (opcional). Traces: OpenTelemetry via `OTEL_EXPORTER_OTLP_ENDPOINT`.
- Logs: `docker compose logs -f web` (JSON estruturado, dados pessoais redigidos).

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

## Adicionar outro projeto na mesma VPS

1. Crie `/srv/apps/<projeto>` com seu `docker-compose.yml`, usando nomes de router/serviço Traefik prefixados e a
   rede externa `coolify` apenas no container público.
2. Use volumes nomeados do próprio projeto e limites de memória.
3. Copie o padrão de `infra/scripts` (deploy/backup) ou use a UI do Coolify. Os dois convivem no mesmo proxy.
