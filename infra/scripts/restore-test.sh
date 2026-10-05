#!/usr/bin/env bash
# Weekly restore drill: restores the latest snapshot into a scratch database and
# compares row counts with production. Alerts on any mismatch. Never touches prod data.
source "$(dirname "$0")/lib.sh"
cd "$APP_DIR"
load_env
export RESTIC_REPOSITORY RESTIC_PASSWORD

work=$(mktemp -d /tmp/quarau-restore-XXXX)
trap 'rm -rf "$work"; "${COMPOSE[@]}" exec -T postgres dropdb -U "$POSTGRES_USER" --if-exists quarau_restore_test >/dev/null 2>&1 || true' EXIT

log "restaurando último snapshot em $work"
restic restore latest --tag quarau --target "$work" --include "$BACKUP_DIR/pg"
dump=$(find "$work" -name "${POSTGRES_DB}-*.dump" | sort | tail -1)
[[ -n "$dump" ]] || die "teste de restore: nenhum dump no snapshot"

"${COMPOSE[@]}" exec -T postgres dropdb -U "$POSTGRES_USER" --if-exists quarau_restore_test
"${COMPOSE[@]}" exec -T postgres createdb -U "$POSTGRES_USER" quarau_restore_test
"${COMPOSE[@]}" exec -T postgres pg_restore -U "$POSTGRES_USER" -d quarau_restore_test --no-owner < "$dump"

fail=0
for table in pages projects services media users; do
  live=$("${COMPOSE[@]}" exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "select count(*) from $table")
  restored=$("${COMPOSE[@]}" exec -T postgres psql -U "$POSTGRES_USER" -d quarau_restore_test -tAc "select count(*) from $table")
  log "  $table: produção=$live restaurado=$restored"
  # The snapshot may be up to 24h older than prod: restored must exist and not exceed live.
  if [[ -z "$restored" ]] || (( restored == 0 && live > 0 )) || (( restored > live )); then fail=1; fi
done

files=$(restic ls latest --tag quarau | grep -c '/quarau-media/' || true)
log "  objetos de mídia no snapshot: $files"
(( files > 0 )) || fail=1

if (( fail )); then die "teste de restore falhou (veja $APP_DIR/logs/restore-test.log)"; fi
log "teste de restore OK"
alert "✅ Quarau: teste semanal de restore OK"
