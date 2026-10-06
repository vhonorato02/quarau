#!/usr/bin/env bash
# Publica um site sem tirar do ar:   deploy.sh <site> [versão]
#   1. baixa a imagem (SKIP_PULL=1 usa a que já está no servidor);
#   2. sobe uma réplica nova ao lado da atual;
#   3. espera o healthcheck dela (se a imagem tiver um);
#   4. troca a rota do Traefik para a nova (a antiga deixa de receber tráfego);
#   5. drena e para a antiga. Se a nova falhar, a antiga continua no ar.
source "$(dirname "$(readlink -f "$0")")/lib.sh"
load_platform_env

site="${1:?uso: deploy.sh <site> [versão]}"
need_site "$site"
dir=$(site_dir "$site")
cd "$dir" || exit 1

exec 9>"$dir/.deploy.lock"
flock -w 600 9 || die "outro deploy de '$site' está em andamento"

image=$(site_get "$site" IMAGE)
tag="${2:-$(site_get "$site" TAG)}"
export TAG="$tag"

fail() {
  alert "Deploy falhou: $site" "$1"
  die "$1"
}

df_pct=$(df --output=pcent / | tail -1 | tr -dc '0-9')
if (( df_pct > 85 )); then
  warn "disco em ${df_pct}%: limpando imagens sem uso"
  docker image prune -af --filter "until=72h" >/dev/null || true
fi

if [[ "${SKIP_PULL:-0}" != 1 ]]; then
  log "baixando ${image}:${tag}"
  compose "$site" pull --quiet web || fail "não consegui baixar ${image}:${tag}"
fi

# Outros serviços do site (worker, cache…), se o compose tiver.
others=$(compose "$site" config --services | grep -vx web || true)
[[ -z "$others" ]] || compose "$site" up -d --remove-orphans $others

old_ids=$(compose "$site" ps -q web || true)
if [[ -z "$old_ids" ]]; then
  log "primeira publicação de '$site'"
  compose "$site" up -d --no-deps web
  new_id=$(compose "$site" ps -q web | head -1)
else
  log "subindo réplica nova ao lado da atual"
  compose "$site" up -d --no-deps --no-recreate --scale web=2 web
  new_id=$(comm -13 <(sort <<< "$old_ids") <(compose "$site" ps -q web | sort) | head -1)
fi
[[ -n "$new_id" ]] || fail "não identifiquei o container novo de '$site'"

log "aguardando a versão nova ficar saudável"
stable=0
for _ in $(seq 1 90); do
  status=$(container_health "$new_id")
  case "$status" in
    healthy) break ;;
    running)  # imagem sem healthcheck: 3 checagens seguidas rodando
      stable=$((stable + 1))
      if (( stable >= 3 )); then break; fi ;;
    unhealthy|exited|dead|missing) break ;;
  esac
  sleep 5
done
status=$(container_health "$new_id")
if [[ "$status" != healthy && "$status" != running ]]; then
  docker logs --tail 60 "$new_id" 2>&1 || true
  docker rm -f "$new_id" >/dev/null 2>&1 || true
  fail "versão ${tag} de '$site' não ficou saudável (${status}); a anterior continua no ar"
fi

new_name=$(docker inspect -f '{{.Name}}' "$new_id"); new_name="${new_name#/}"
write_route "$site" "$new_name"

if [[ -n "$old_ids" ]]; then
  sleep 4  # Traefik relê a rota (~2 s); requisições em andamento na antiga terminam
  drain_file=$(site_get "$site" DRAIN_FILE)
  if [[ -n "$drain_file" ]]; then
    for id in $old_ids; do docker exec "$id" touch "$drain_file" 2>/dev/null || true; done
  fi
  for id in $old_ids; do
    log "parando réplica antiga ${id:0:12}"
    docker stop -t 30 "$id" >/dev/null && docker rm "$id" >/dev/null
  done
  compose "$site" up -d --no-deps --no-recreate --scale web=1 web >/dev/null 2>&1
fi

site_set "$site" TAG "$tag"
last=$(tail -1 releases.log 2>/dev/null | awk '{print $2}' || true)
[[ "$last" == "$tag" ]] || echo "$(date -u +%FT%TZ) ${tag}" >> releases.log

# Guarda só as 3 últimas versões da imagem (para rollback rápido).
keep=$( { awk '{print $2}' releases.log | tail -3; site_get "$site" AUTODEPLOY_TAG; echo "$tag"; } | sort -u)
docker images "$image" --format '{{.Tag}}' | { grep -vxF -f <(echo "$keep") || true; } | { grep -vx '<none>' || true; } \
  | while read -r t; do docker rmi "${image}:${t}" >/dev/null 2>&1 || true; done
docker image prune -f >/dev/null 2>&1 || true

ok "'$site' publicado na versão ${tag}"
