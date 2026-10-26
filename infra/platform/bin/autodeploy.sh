#!/usr/bin/env bash
# Auto-deploy "estilo Vercel" sem dar acesso SSH ao GitHub: a cada 2 minutos
# (timer systemd) confere se a imagem :latest de cada site mudou no registro e,
# se mudou, publica sem tirar do ar. A versão recebe o nome do commit
# (APP_VERSION ou label org.opencontainers.image.revision) ou do digest.
source "$(dirname "$(readlink -f "$0")")/lib.sh"
load_platform_env
install -d -m 700 "$STATE_DIR/autodeploy"

for dir in "$SITES_DIR"/*/; do
  [[ -f "$dir/compose.yml" ]] || continue
  site=$(basename "$dir")
  watch=$(site_get "$site" AUTODEPLOY_TAG)
  [[ -n "$watch" ]] || continue
  image=$(site_get "$site" IMAGE)

  docker pull -q "${image}:${watch}" >/dev/null 2>&1 || { warn "$site: não consegui consultar ${image}:${watch}"; continue; }
  latest_id=$(docker image inspect -f '{{.Id}}' "${image}:${watch}")
  running=$(compose "$site" ps -q web | head -1)
  running_id=$([[ -n "$running" ]] && docker inspect -f '{{.Image}}' "$running" || true)
  [[ "$latest_id" != "$running_id" ]] || continue

  failed_file="$STATE_DIR/autodeploy/$site.failed"
  [[ "$(cat "$failed_file" 2>/dev/null)" == "$latest_id" ]] && continue  # já falhou: não insiste

  version=$(docker image inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$latest_id" | sed -n 's/^APP_VERSION=//p')
  [[ "$version" =~ ^[0-9a-f]{7,40}$ ]] || version=$(docker image inspect -f '{{index .Config.Labels "org.opencontainers.image.revision"}}' "$latest_id" 2>/dev/null || true)
  [[ "$version" =~ ^[0-9a-zA-Z._-]+$ ]] || version="d-${latest_id#sha256:}"
  version="${version:0:40}"
  docker tag "$latest_id" "${image}:${version}"

  log "$site: nova versão ${version:0:12} encontrada, publicando"
  if SKIP_PULL=1 "$PLATFORM_DIR/bin/deploy.sh" "$site" "$version"; then
    rm -f "$failed_file"
    alert "Publicado: $site" "$site está no ar na versão ${version:0:12}"
  else
    echo "$latest_id" > "$failed_file"
  fi
done
