#!/usr/bin/env bash
# Daily backup: Postgres (pg_dump) + MinIO data + .env → restic, with retention
# and optional off-site copy. Scheduled by /etc/cron.d/quarau (see bootstrap.sh).
source "$(dirname "$0")/lib.sh"
cd "$APP_DIR"
load_env
export RESTIC_REPOSITORY RESTIC_PASSWORD

stamp=$(date -u +%Y%m%dT%H%M%SZ)
dump_dir="$BACKUP_DIR/pg"
mkdir -p "$dump_dir"

log "pg_dump ${POSTGRES_DB}"
"${COMPOSE[@]}" exec -T postgres pg_dump -U "$POSTGRES_USER" -Fc "$POSTGRES_DB" > "$dump_dir/${POSTGRES_DB}-${stamp}.dump"
if "${COMPOSE[@]}" exec -T postgres psql -U "$POSTGRES_USER" -lqt | cut -d'|' -f1 | grep -qw umami; then
  "${COMPOSE[@]}" exec -T postgres pg_dump -U "$POSTGRES_USER" -Fc umami > "$dump_dir/umami-${stamp}.dump"
fi
[[ -s "$dump_dir/${POSTGRES_DB}-${stamp}.dump" ]] || die "pg_dump vazio"

minio_path=$(docker volume inspect quarau_minio -f '{{.Mountpoint}}')
restic snapshots >/dev/null 2>&1 || restic init

log "restic backup"
restic backup --tag quarau --tag "$stamp" "$dump_dir" "$minio_path" "$APP_DIR/.env" "$APP_DIR/releases.log" --exclude '*.tmp'
restic forget --tag quarau --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune
restic check --read-data-subset=2% >/dev/null

find "$dump_dir" -name '*.dump' -mtime +2 -delete

if [[ -n "${RESTIC_REPOSITORY_OFFSITE:-}" ]]; then
  log "cópia off-site"
  RESTIC_FROM_REPOSITORY="$RESTIC_REPOSITORY" RESTIC_FROM_PASSWORD="$RESTIC_PASSWORD" \
    RESTIC_REPOSITORY="$RESTIC_REPOSITORY_OFFSITE" RESTIC_PASSWORD="${RESTIC_PASSWORD_OFFSITE:-$RESTIC_PASSWORD}" \
    bash -c 'restic snapshots >/dev/null 2>&1 || restic init; restic copy --tag quarau latest'
fi

log "backup ${stamp} concluído"
