#!/usr/bin/env bash
# Monitor leve (timer a cada 5 min): sites respondendo, containers saudáveis,
# Postgres, disco e memória. Avisa no ALERT_URL uma vez quando algo quebra e
# de novo quando volta ao normal.   --verbose mostra o resultado de cada item.
source "$(dirname "$(readlink -f "$0")")/lib.sh"
load_platform_env
verbose=0; [[ "${1:-}" == --verbose ]] && verbose=1
state="$STATE_DIR/health"; install -d -m 700 "$state"
problems=0

check() { # check <chave> <descrição> <ok:0|1> [detalhe]
  local desc="$2" good="$3" detail="${4:-}" f="$state/$1"
  if [[ "$good" == 1 ]]; then
    (( verbose )) && ok "$desc"
    if [[ -f "$f" ]]; then rm -f "$f"; alert "Normalizado: $desc" "$desc voltou ao normal"; fi
  else
    problems=$((problems + 1))
    printf '%s✘%s %s %s\n' "$R" "$N" "$desc" "$detail"
    if [[ ! -f "$f" ]]; then touch "$f"; alert "Problema: $desc" "$desc ${detail}"; fi
  fi
}

for dir in "$SITES_DIR"/*/; do
  [[ -f "$dir/compose.yml" ]] || continue
  site=$(basename "$dir")
  domain=$(site_get "$site" DOMAINS); domain="${domain%%,*}"
  code=$(curl -sk -o /dev/null -m 15 -w '%{http_code}' --resolve "${domain}:443:127.0.0.1" "https://${domain}/" || echo 000)
  good=0; [[ "$code" =~ ^(2|3)..$|^401$ ]] && good=1
  check "site-$site" "site $site (https://$domain)" "$good" "respondeu HTTP $code"
done

bad=$(docker ps -a --filter 'label=com.docker.compose.project' --format '{{.Names}} {{.Status}}' \
  | grep -Ei 'unhealthy|restarting|exited \([1-9]' | cut -d' ' -f1 | tr '\n' ' ' || true)
check containers "containers" "$([[ -z "$bad" ]] && echo 1 || echo 0)" "com problema: $bad"

pg=0; docker exec "$PG_CONTAINER" pg_isready -U postgres -q 2>/dev/null && pg=1
check postgres "banco de dados (Postgres)" "$pg"

disk=$(df --output=pcent / | tail -1 | tr -dc '0-9')
check disk "disco (${disk}% usado)" "$(( disk < 85 ))" "— libere espaço: docker image prune -af"

mem=$(awk '/MemAvailable/{print int($2/1024)}' /proc/meminfo)
check memory "memória (${mem} MB livres)" "$(( mem > 150 ))"

last_backup=$(cat "$STATE_DIR/last-backup-ok" 2>/dev/null || echo 0)
check backup "backup diário" "$(( $(date +%s) - last_backup < 30 * 3600 ))" "— o último backup bem-sucedido tem mais de 30 h"

(( verbose )) && { (( problems )) && echo "${problems} problema(s)" || ok "tudo certo"; }
exit 0
