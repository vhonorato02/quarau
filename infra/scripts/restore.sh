#!/usr/bin/env bash
# REAL restore (disaster recovery). Overwrites production data!
#   restore.sh <snapshot-id|latest> --yes
# Takes a safety dump of the current DB first, then restores Postgres and MinIO.
source "$(dirname "$0")/lib.sh"
cd "$APP_DIR"
load_env
export RESTIC_REPOSITORY RESTIC_PASSWORD
snap="${1:?uso: restore.sh <snapshot|latest> --yes}"
[[ "${2:-}" == "--yes" ]] || die "confirme com --yes (operação destrutiva)"

stamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p "$BACKUP_DIR/pre-restore"
log "dump de segurança do estado atual"
"${COMPOSE[@]}" exec -T postgres pg_dump -U "$POSTGRES_USER" -Fc "$POSTGRES_DB" > "$BACKUP_DIR/pre-restore/${POSTGRES_DB}-${stamp}.dump"

work=$(mktemp -d /tmp/quarau-restore-XXXX)
restic restore "$snap" --target "$work"
dump=$(find "$work" -name "${POSTGRES_DB}-*.dump" | sort | tail -1)
minio_src=$(find "$work" -type d -path '*_data' | head -1)

log "parando web"
"${COMPOSE[@]}" stop web
log "restaurando Postgres"
"${COMPOSE[@]}" exec -T postgres dropdb -U "$POSTGRES_USER" --if-exists --force "$POSTGRES_DB"
"${COMPOSE[@]}" exec -T postgres createdb -U "$POSTGRES_USER" "$POSTGRES_DB"
"${COMPOSE[@]}" exec -T postgres pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner < "$dump"
if [[ -n "$minio_src" ]]; then
  log "restaurando MinIO"
  "${COMPOSE[@]}" stop minio
  minio_path=$(docker volume inspect quarau_minio -f '{{.Mountpoint}}')
  rsync -a --delete "$minio_src/" "$minio_path/"
  "${COMPOSE[@]}" start minio
fi
"${COMPOSE[@]}" start web
rm -rf "$work"
sleep 20
docker exec "$("${COMPOSE[@]}" ps -q web | head -1)" curl -fsS -X POST -H "authorization: Bearer ${REVALIDATE_SECRET}" http://127.0.0.1:3000/next/reindex || true
echo
log "restore concluído (busca reindexada)"
