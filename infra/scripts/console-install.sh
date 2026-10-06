#!/usr/bin/env bash
# One-shot install of the Quarau site on the VPS, meant to be run from the provider's web console
# (or any root shell) when SSH/GitHub Actions are not available. Idempotent: safe to run again.
#
#   sudo bash infra/scripts/console-install.sh --admin-email voce@exemplo.com [--domain quarau.X.sslip.io]
#        [--skip-video] [--skip-content] [--skip-build]
#
# Respects the server owner's rules: never touches /etc/ssh/sshd_config or port 22322, does not
# enable/reconfigure UFW, never stops the Coolify containers, checks disk space before building.
set -Eeuo pipefail

SRC_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
APP_DIR=/srv/apps/quarau
DOMAIN="quarau.177-107-94-44.sslip.io"
ADMIN_EMAIL=""
SKIP_VIDEO=0
SKIP_CONTENT=0
SKIP_BUILD=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2 ;;
    --admin-email) ADMIN_EMAIL="$2"; shift 2 ;;
    --skip-video) SKIP_VIDEO=1; shift ;;
    --skip-content) SKIP_CONTENT=1; shift ;;
    --skip-build) SKIP_BUILD=1; shift ;;
    *) echo "opção desconhecida: $1"; exit 1 ;;
  esac
done

step() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
ok() { printf '\033[1;32m✔ %s\033[0m\n' "$*"; }
fail() { printf '\033[1;31m✘ %s\033[0m\n' "$*"; exit 1; }
as_deploy() { runuser -u deploy -- "$@"; }

[[ $EUID -eq 0 ]] || fail "rode como root: sudo bash $0 ..."
[[ -n "$ADMIN_EMAIL" ]] || fail "informe --admin-email voce@exemplo.com"
cd "$SRC_DIR"
TAG=$(git rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M)
IMAGE=ghcr.io/vhonorato02/quarau-web

# ------------------------------------------------------------------ 1. pre-flight
step "1/8 Verificações"
command -v docker >/dev/null || fail "Docker não encontrado"
docker network inspect coolify >/dev/null 2>&1 || fail "rede 'coolify' não existe: o proxy do Coolify precisa estar rodando"
for c in coolify coolify-db coolify-proxy; do
  docker ps --format '{{.Names}}' | grep -qx "$c" && ok "$c rodando" || echo "  aviso: $c não está rodando"
done
free_gb() { df --output=avail -BG / | tail -1 | tr -dc '0-9'; }
if (( $(free_gb) < 8 )); then
  echo "  pouco espaço livre ($(free_gb) GB): limpando imagens e cache sem uso (docker system prune -f)"
  docker system prune -f >/dev/null
fi
(( $(free_gb) >= 6 )) || fail "menos de 6 GB livres em / — libere espaço antes de continuar"
ok "disco: $(free_gb) GB livres"

# ------------------------------------------------------------------ 2. host preparation
step "2/8 Preparação do servidor (usuário deploy, swap, fail2ban, atualizações, cron)"
APPLY=1 bash infra/scripts/bootstrap.sh apply

# ------------------------------------------------------------------ 3. stack files + secrets
step "3/8 Arquivos da stack em $APP_DIR"
install -d -m 750 -o deploy -g deploy "$APP_DIR" "$APP_DIR/scripts" "$APP_DIR/logs" "$APP_DIR/postgres-init"
install -m 640 -o deploy -g deploy infra/compose/docker-compose.prod.yml "$APP_DIR/docker-compose.yml"
install -m 640 -o deploy -g deploy infra/compose/.env.production.example "$APP_DIR/.env.production.example"
install -m 644 -o deploy -g deploy infra/compose/postgres-init/* "$APP_DIR/postgres-init/"
install -m 750 -o deploy -g deploy infra/scripts/*.sh "$APP_DIR/scripts/"
as_deploy "$APP_DIR/scripts/provision-env.sh" "$DOMAIN"
ok "segredos gerados no servidor ($APP_DIR/.env, só o usuário deploy lê)"

# ------------------------------------------------------------------ 4. images
step "4/8 Imagens Docker ($IMAGE:$TAG)"
if [[ "$SKIP_BUILD" == 1 ]] && docker image inspect "$IMAGE:$TAG" >/dev/null 2>&1; then
  ok "imagem já existe, build pulado"
else
  echo "  build do site (5–15 min; usa até ~2,5 GB de RAM com swap)…"
  docker build --target runner --build-arg APP_VERSION="$TAG" -t "$IMAGE:$TAG" .
  docker build --target tools -t quarau-tools:"$TAG" .
fi
ok "imagens prontas"

# ------------------------------------------------------------------ 5. deploy
step "5/8 Deploy (sem downtime; migrações do banco rodam no boot)"
as_deploy env SKIP_PULL=1 APP_DIR="$APP_DIR" "$APP_DIR/scripts/deploy.sh" "$TAG"

# Values the one-off containers need (read as root, never printed).
set -a
# shellcheck disable=SC1091
source "$APP_DIR/.env"
set +a
tools() {
  docker run --rm --network quarau_internal --env-file <(grep -E '^[A-Z0-9_]+=' "$APP_DIR/.env" | grep -v "'") \
    -e NODE_ENV=production -e PAYLOAD_JOBS_AUTORUN=false -e PAYLOAD_DB_PUSH=false \
    -e DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@postgres:5432/$POSTGRES_DB" \
    -e S3_ENDPOINT=http://minio:9000 -e MEILI_HOST=http://meilisearch:7700 \
    -v quarau_migrate-cache:/repo/apps/web/.migrate-cache \
    "$@"
}
web_exec() { docker exec "$(docker compose --project-directory "$APP_DIR" -f "$APP_DIR/docker-compose.yml" ps -q web | head -1)" "$@"; }

# ------------------------------------------------------------------ 6. content
if [[ "$SKIP_CONTENT" == 1 ]]; then
  step "6/8 Conteúdo: pulado (--skip-content)"
else
  step "6/8 Conteúdo do quarau.com.br (idempotente; vídeos são convertidos para 720p)"
  tools -e MIGRATE_SKIP_VIDEO="$SKIP_VIDEO" quarau-tools:"$TAG" pnpm migrate:wp
  web_exec sh -c 'curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" -H "content-type: application/json" -d "{\"all\":true}" http://127.0.0.1:3000/next/revalidate; echo; curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" http://127.0.0.1:3000/next/reindex; echo'
  ok "conteúdo importado, cache e busca atualizados"
fi

# ------------------------------------------------------------------ 7. administrator
step "7/8 Administrador do CMS ($ADMIN_EMAIL)"
if grep -qs "Admin CMS.*: $ADMIN_EMAIL /" "$APP_DIR/CREDENCIAIS.txt"; then
  ok "já criado antes (senha em $APP_DIR/CREDENCIAIS.txt); não foi alterado"
else
  pass=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 20)
  tools -e ADMIN_EMAIL="$ADMIN_EMAIL" -e ADMIN_NAME=Administrador -e ADMIN_PASSWORD="$pass" quarau-tools:"$TAG" pnpm seed:admin
  ( umask 077; printf 'Admin CMS (https://%s/admin): %s / %s\n' "$DOMAIN" "$ADMIN_EMAIL" "$pass" >> "$APP_DIR/CREDENCIAIS.txt" )
  chown deploy:deploy "$APP_DIR/CREDENCIAIS.txt"
  ok "senha gravada em $APP_DIR/CREDENCIAIS.txt"
fi

# ------------------------------------------------------------------ 8. backup + checks
step "8/8 Primeiro backup e verificação"
"$APP_DIR/scripts/backup.sh" > "$APP_DIR/logs/backup.log" 2>&1 && ok "backup feito" || echo "  aviso: backup falhou (veja $APP_DIR/logs/backup.log)"
code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "https://$DOMAIN/" || true)
echo "  https://$DOMAIN → HTTP $code (401 = protegido por senha, esperado)"
docker compose --project-directory "$APP_DIR" -f "$APP_DIR/docker-compose.yml" ps --format 'table {{.Name}}\t{{.Status}}'
docker image prune -f >/dev/null

printf '\n\033[1;32mPronto.\033[0m Site: https://%s  ·  Painel: https://%s/admin\n' "$DOMAIN" "$DOMAIN"
echo "Senhas (basic auth do domínio temporário e admin): sudo cat $APP_DIR/CREDENCIAIS.txt"
