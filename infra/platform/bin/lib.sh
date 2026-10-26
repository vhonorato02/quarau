#!/usr/bin/env bash
# Funções comuns da plataforma (carregado pelos outros scripts, não executado).
set -Eeuo pipefail

PLATFORM_DIR="${PLATFORM_DIR:-/srv/platform}"
SITES_DIR="${SITES_DIR:-/srv/sites}"
BACKUP_DIR="${BACKUP_DIR:-/srv/backups}"
STATE_DIR="${STATE_DIR:-/var/lib/platform}"
PG_CONTAINER="${PG_CONTAINER:-platform-postgres-1}"

if [[ -t 1 ]]; then B=$'\e[1m' G=$'\e[32m' R=$'\e[31m' Y=$'\e[33m' N=$'\e[0m'; else B='' G='' R='' Y='' N=''; fi

log() { printf '%s[%s]%s %s\n' "$B" "$(date +%H:%M:%S)" "$N" "$*"; }
ok() { printf '%s✔%s %s\n' "$G" "$N" "$*"; }
warn() { printf '%s!%s %s\n' "$Y" "$N" "$*" >&2; }
die() { printf '%s✘ %s%s\n' "$R" "$*" "$N" >&2; exit 1; }

load_platform_env() {
  [[ -f "$PLATFORM_DIR/.env" ]] || die "plataforma não instalada ($PLATFORM_DIR/.env ausente)"
  set -a
  # shellcheck disable=SC1091
  source "$PLATFORM_DIR/.env"
  set +a
}

# Notificação no celular (ntfy) ou em qualquer webhook que aceite texto.
alert() {
  local title="$1" msg="${2:-$1}"
  [[ -n "${ALERT_URL:-}" ]] || return 0
  curl -fsS -m 10 -H "Title: ${title}" -H 'Tags: computer' -d "$msg" "$ALERT_URL" >/dev/null 2>&1 || true
}

valid_site() { [[ "$1" =~ ^[a-z][a-z0-9-]{1,30}$ ]] || die "nome inválido: use letras minúsculas, números e hífen (ex.: oficina-ze)"; }
site_dir() { echo "$SITES_DIR/$1"; }
site_exists() { [[ -f "$SITES_DIR/$1/compose.yml" ]]; }
need_site() { valid_site "$1"; site_exists "$1" || die "site '$1' não existe (veja: site lista)"; }
db_name() { echo "${1//-/_}"; }

site_get() { # site_get <site> <VAR>
  { grep -E "^$2=" "$SITES_DIR/$1/.env" 2>/dev/null || true; } | tail -1 | cut -d= -f2- | sed -E "s/^'(.*)'$/\1/"
}
site_set() { # site_set <site> <VAR> <value>
  local f="$SITES_DIR/$1/.env"
  if grep -qE "^$2=" "$f"; then
    local esc; esc=$(printf '%s' "$3" | sed 's/[&|\\]/\\&/g')
    sed -i "s|^$2=.*|$2=${esc}|" "$f"
  else
    echo "$2=$3" >> "$f"
  fi
}

compose() { # compose <site> <args...>
  local s="$1"; shift
  docker compose --project-directory "$SITES_DIR/$s" -f "$SITES_DIR/$s/compose.yml" "$@"
}

container_health() {
  docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$1" 2>/dev/null || echo missing
}

psql_admin() { docker exec -i "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -qAt "$@"; }

rand() { openssl rand -base64 64 | tr -dc 'A-Za-z0-9' | head -c "${1:-40}"; }

route_file() { echo "$PLATFORM_DIR/traefik/dynamic/site-$1.yml"; }

# Aponta o domínio do site para os containers informados (troca atômica: o
# Traefik relê o arquivo em ~2 s). Sem containers, remove a rota.
write_route() { # write_route <site> [container...]
  local site="$1"; shift
  local f; f=$(route_file "$site")
  if [[ $# -eq 0 ]]; then rm -f "$f"; return; fi
  local port health servers='' c
  port=$(site_get "$site" PORT); health=$(site_get "$site" HEALTH_PATH)
  for c in "$@"; do servers+="          - url: http://${c}:${port}"$'\n'; done
  {
    echo "# Gerado pelo comando \"site\" — não edite (use: site dominio / site deploy)."
    echo "http:"
    echo "  routers:"
    echo "    ${site}:"
    echo "      rule: \"$(rule_for "$(site_get "$site" DOMAINS)")\""
    echo "      entryPoints: [https]"
    echo "      service: ${site}"
    echo "  services:"
    echo "    ${site}:"
    echo "      loadBalancer:"
    echo "        servers:"
    printf '%s' "$servers"
    if [[ -n "$health" ]]; then
      echo "        healthCheck:"
      echo "          path: ${health}"
      echo "          interval: 10s"
      echo "          timeout: 3s"
    fi
  } > "$f.tmp"
  chmod 644 "$f.tmp"
  mv -f "$f.tmp" "$f"
}

# Domínios "a.com,www.a.com" -> regra do Traefik Host(`a.com`) || Host(`www.a.com`)
rule_for() {
  local out='' d
  IFS=',' read -ra ds <<< "$1"
  for d in "${ds[@]}"; do
    d="${d// /}"; [[ -n "$d" ]] || continue
    out+="${out:+ || }Host(\`$d\`)"
  done
  echo "$out"
}
