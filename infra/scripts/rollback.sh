#!/usr/bin/env bash
# Roll back to the previous release (or to a given tag): rollback.sh [tag]
source "$(dirname "$0")/lib.sh"
cd "$APP_DIR"
target="${1:-}"
if [[ -z "$target" ]]; then
  target=$(awk '{print $2}' releases.log | uniq | tail -2 | head -1)
fi
[[ -n "$target" ]] || die "nenhuma versão anterior encontrada em releases.log"
log "voltando para ${target}"
exec "$(dirname "$0")/deploy.sh" "$target"
