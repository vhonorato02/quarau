#!/usr/bin/env bash
# Restarts the local dev server on port ${PORT:-3100} (kills only the process listening on that port).
PORT=${PORT:-3100}
for pid in $(netstat -ano | grep ":$PORT " | grep LISTEN | awk '{print $5}' | sort -u); do taskkill //F //T //PID "$pid" >/dev/null 2>&1; done
cd "$(dirname "$0")/../apps/web" || exit 1
set -a; . ./.env.local; set +a
export SITE_URL=http://localhost:$PORT NEXT_PUBLIC_SITE_URL=http://localhost:$PORT PAYLOAD_DB_PUSH=false
nohup npx next dev -p "$PORT" > ../../.cache/dev.log 2>&1 &
for i in $(seq 1 60); do c=$(curl -s -o /dev/null -w "%{http_code}" --max-time 240 "http://localhost:$PORT/api/health"); [ "$c" = "200" ] && echo "ready" && exit 0; sleep 3; done
echo "not ready"; tail -20 ../../.cache/dev.log
