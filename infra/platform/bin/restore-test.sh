#!/usr/bin/env bash
# Teste de restore semanal (timer, domingo 04:23): restaura os dumps do último
# snapshot em bancos temporários e confere se têm as mesmas tabelas que produção.
# Backup que nunca foi restaurado não é backup.
source "$(dirname "$(readlink -f "$0")")/lib.sh"
load_platform_env
export RESTIC_REPOSITORY RESTIC_PASSWORD
trap 'alert "Teste de restore falhou" "o teste de restore de $(date +%F) falhou na linha $LINENO"' ERR

tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
restic restore latest --quiet --target "$tmp" --include "$BACKUP_DIR/dumps"
shopt -s nullglob
for dump in "$tmp$BACKUP_DIR"/dumps/*.dump; do
  db=$(basename "$dump" .dump); test_db="restore_test_${db}"
  psql_admin -c "DROP DATABASE IF EXISTS \"$test_db\"" -c "CREATE DATABASE \"$test_db\""
  docker exec -i "$PG_CONTAINER" pg_restore -U postgres --no-owner --no-acl -d "$test_db" < "$dump"
  q="SELECT count(*) FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema')"
  prod=$(docker exec "$PG_CONTAINER" psql -U postgres -d "$db" -qAt -c "$q")
  restored=$(docker exec "$PG_CONTAINER" psql -U postgres -d "$test_db" -qAt -c "$q")
  psql_admin -c "DROP DATABASE \"$test_db\""
  [[ "$prod" == "$restored" ]] || { alert "Teste de restore: $db" "produção tem $prod tabelas, o backup restaurou $restored"; exit 1; }
  ok "$db: $restored tabelas restauradas"
done
date +%s > "$STATE_DIR/last-restore-test-ok"
