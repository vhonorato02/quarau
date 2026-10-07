#!/usr/bin/env bash
# Backup diário (timer 03:17): dump de cada banco + arquivos de todos os sites
# e da plataforma num repositório restic criptografado. Retém 7 diários,
# 4 semanais e 6 mensais. Se RESTIC_REPOSITORY_OFFSITE estiver definido no
# /srv/platform/.env, copia os snapshots para fora do servidor também.
source "$(dirname "$(readlink -f "$0")")/lib.sh"
load_platform_env
export RESTIC_REPOSITORY RESTIC_PASSWORD
exec 9>"$STATE_DIR/backup.lock"; flock -n 9 || die "backup já em andamento"
trap 'alert "Backup falhou" "o backup de $(date +%F) falhou na linha $LINENO"' ERR

dumps="$BACKUP_DIR/dumps"
install -d -m 700 "$dumps"
rm -f "$dumps"/*.dump "$dumps"/globals.sql

log "exportando bancos"
docker exec "$PG_CONTAINER" pg_dumpall -U postgres --globals-only > "$dumps/globals.sql"
for db in $(psql_admin -c "SELECT datname FROM pg_database WHERE NOT datistemplate AND datname <> 'postgres'"); do
  docker exec "$PG_CONTAINER" pg_dump -U postgres -Fc "$db" > "$dumps/$db.dump"
done

log "copiando arquivos para o restic"
restic backup --quiet --tag diario \
  --exclude "$PLATFORM_DIR/data/postgres" --exclude '**/.next/cache' \
  "$PLATFORM_DIR" "$SITES_DIR" "$dumps"
restic forget --quiet --prune --keep-daily 7 --keep-weekly 4 --keep-monthly 6
restic check --quiet --read-data-subset=5%

if [[ -n "${RESTIC_REPOSITORY_OFFSITE:-}" ]]; then
  log "enviando cópia para fora do servidor"
  export RESTIC_FROM_PASSWORD="$RESTIC_PASSWORD"  # mesma senha nos dois repositórios
  off=(restic -r "$RESTIC_REPOSITORY_OFFSITE")
  "${off[@]}" cat config >/dev/null 2>&1 \
    || "${off[@]}" init --quiet --from-repo "$RESTIC_REPOSITORY" --copy-chunker-params
  "${off[@]}" copy --quiet --from-repo "$RESTIC_REPOSITORY"
  "${off[@]}" forget --quiet --prune --keep-daily 7 --keep-weekly 4 --keep-monthly 6
fi

date +%s > "$STATE_DIR/last-backup-ok"
ok "backup concluído ($(restic snapshots --compact --quiet | grep -c diario || true) snapshots)"
