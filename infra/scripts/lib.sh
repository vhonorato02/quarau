#!/usr/bin/env bash
# Shared helpers for Quarau ops scripts (sourced, not executed).
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/srv/apps/quarau}"
BACKUP_DIR="${BACKUP_DIR:-/srv/backups/quarau}"
COMPOSE=(docker compose --project-directory "$APP_DIR" -f "$APP_DIR/docker-compose.yml")

log() { printf '[%s] %s\n' "$(date -u +%FT%TZ)" "$*"; }
die() { log "ERRO: $*"; alert "❌ Quarau: $*"; exit 1; }

load_env() {
  [[ -f "$APP_DIR/.env" ]] || die "arquivo $APP_DIR/.env não encontrado"
  set -a
  # shellcheck disable=SC1091
  source "$APP_DIR/.env"
  set +a
}

alert() {
  local msg="$1"
  if [[ -n "${ALERT_WEBHOOK_URL:-}" ]]; then
    curl -fsS -m 10 -H 'content-type: application/json' \
      -d "$(printf '{"text":%s}' "$(printf '%s' "$msg" | jq -Rs .)")" "$ALERT_WEBHOOK_URL" >/dev/null || true
  fi
}

container_health() { docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$1" 2>/dev/null || echo missing; }
