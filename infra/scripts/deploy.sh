#!/usr/bin/env bash
# Zero-downtime deploy of the web container.
#   deploy.sh <image-tag>          (SKIP_PULL=1 uses an image already on the host)
# 1. pulls the image, 2. starts a second replica next to the current one,
# 3. waits for its healthcheck (DB migrations run on boot), 4. Traefik starts
# routing to it, 5. removes the old replica. On failure the old one keeps serving.
source "$(dirname "$0")/lib.sh"

TAG="${1:?uso: deploy.sh <tag>}"
cd "$APP_DIR"
load_env

if [[ -n "${GHCR_TOKEN:-}" ]]; then
  echo "$GHCR_TOKEN" | docker login ghcr.io -u "${GHCR_USER:-deploy}" --password-stdin >/dev/null
fi

df_pct=$(df --output=pcent / | tail -1 | tr -dc '0-9')
if (( df_pct > 85 )); then
  log "disco em ${df_pct}% — limpando imagens antigas antes do deploy"
  docker image prune -af --filter "until=168h" >/dev/null || true
fi

export WEB_TAG="$TAG"
if [[ "${SKIP_PULL:-0}" == 1 ]]; then
  log "usando imagem local ${WEB_IMAGE}:${TAG} (SKIP_PULL=1)"
else
  log "puxando imagem ${WEB_IMAGE}:${TAG}"
  "${COMPOSE[@]}" pull web
fi

log "garantindo serviços de apoio"
"${COMPOSE[@]}" up -d postgres pgbouncer valkey minio meilisearch

old_ids=$("${COMPOSE[@]}" ps -q web || true)
if [[ -z "$old_ids" ]]; then
  log "primeiro deploy: subindo web"
  "${COMPOSE[@]}" up -d --no-deps web
  new_id=$("${COMPOSE[@]}" ps -q web | head -1)
else
  log "subindo réplica nova ao lado da atual"
  "${COMPOSE[@]}" up -d --no-deps --no-recreate --scale web=2 web
  new_id=$(comm -13 <(echo "$old_ids" | sort) <("${COMPOSE[@]}" ps -q web | sort) | head -1)
fi
[[ -n "$new_id" ]] || die "não foi possível identificar o container novo"

log "aguardando healthcheck de ${new_id:0:12}"
for _ in $(seq 1 60); do
  status=$(container_health "$new_id")
  [[ "$status" == healthy ]] && break
  if [[ "$status" == unhealthy || "$status" == exited ]]; then break; fi
  sleep 5
done
if [[ "$(container_health "$new_id")" != healthy ]]; then
  docker logs --tail 80 "$new_id" || true
  docker rm -f "$new_id" >/dev/null || true
  die "deploy ${TAG} falhou no healthcheck — versão anterior continua no ar"
fi

if [[ -n "$old_ids" ]]; then
  # Give Traefik a moment to register the new backend, then drain the old one:
  # its /next/health starts answering 503, Traefik's health check (5 s) takes it
  # out of rotation, and only then is it stopped (in-flight requests finish).
  sleep 5
  for id in $old_ids; do
    log "drenando réplica antiga ${id:0:12}"
    docker exec "$id" touch /tmp/quarau-drain || true
  done
  sleep "${DRAIN_SECONDS:-12}"
  for id in $old_ids; do
    log "removendo réplica antiga ${id:0:12}"
    docker stop -t 30 "$id" >/dev/null && docker rm "$id" >/dev/null
  done
  "${COMPOSE[@]}" up -d --no-deps --no-recreate --scale web=1 web
fi

echo "$(date -u +%FT%TZ) ${TAG}" >> "$APP_DIR/releases.log"
sed -i "s/^WEB_TAG=.*/WEB_TAG=${TAG}/" "$APP_DIR/.env"

log "aquecendo cache das páginas"
base="http://127.0.0.1:3000"
docker exec "$new_id" sh -c "curl -fsS $base/sitemap.xml" 2>/dev/null \
  | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g; s#^https?://[^/]+##' | head -200 \
  | while read -r path; do docker exec "$new_id" curl -s -o /dev/null "$base$path" || true; done

docker image prune -f >/dev/null || true
[[ -n "${GHCR_TOKEN:-}" ]] && docker logout ghcr.io >/dev/null 2>&1 || true
log "deploy ${TAG} concluído"
alert "✅ Quarau: deploy ${TAG} concluído"
