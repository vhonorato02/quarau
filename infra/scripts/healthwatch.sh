#!/usr/bin/env bash
# Runs every 5 min (cron): alerts when the site, a container or the disk is unhealthy.
source "$(dirname "$0")/lib.sh"
cd "$APP_DIR"
load_env
state_file="$APP_DIR/.healthwatch"
problems=()

probe() { curl -s -o /dev/null -w '%{http_code}' -m 15 "$SITE_URL/next/health" -u "${HEALTH_BASIC_AUTH:-}" || true; }
code=$(probe)
# One retry: a probe can land on a replica that a deploy is draining.
[[ "$code" == 200 ]] || { sleep 10; code=$(probe); }
[[ "$code" == 200 ]] || problems+=("site respondeu HTTP ${code:-000}")

for svc in web postgres pgbouncer valkey minio meilisearch; do
  id=$("${COMPOSE[@]}" ps -q "$svc" | head -1)
  st=$( [[ -n "$id" ]] && container_health "$id" || echo missing )
  [[ "$st" == healthy || "$st" == running ]] || problems+=("$svc: $st")
done

df_pct=$(df --output=pcent / | tail -1 | tr -dc '0-9')
(( df_pct < 85 )) || problems+=("disco em ${df_pct}%")
mem_avail=$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo)
(( mem_avail > 200 )) || problems+=("memória disponível ${mem_avail} MB")

if (( ${#problems[@]} )); then
  msg="⚠️ Quarau: ${problems[*]}"
  # Alert once per distinct problem set (no spam every 5 minutes).
  if [[ "$(cat "$state_file" 2>/dev/null)" != "$msg" ]]; then alert "$msg"; echo "$msg" > "$state_file"; fi
  log "$msg"
  exit 1
fi
if [[ -s "$state_file" ]]; then alert "✅ Quarau: tudo normalizado"; : > "$state_file"; fi
