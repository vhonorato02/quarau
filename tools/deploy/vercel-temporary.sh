#!/usr/bin/env bash
# Publica uma versão TEMPORÁRIA e reclamável na Vercel, sem login (vercel deploy --temporary).
#   bash tools/deploy/vercel-temporary.sh <arquivo-env> <pasta-de-midia>
# - <arquivo-env>: variáveis do app (DATABASE_URL, PAYLOAD_SECRET...), fora do git. Nunca são impressas.
# - <pasta-de-midia>: arquivos gerados pelo seed (MEDIA_DIR). As fotos entram no deploy como estáticos
#   (modo MEDIA_STATIC, docs/MIGRACAO-VPS.md); vídeos ficam de fora até haver armazenamento (R2).
# Monta uma cópia limpa do repositório em .cache/deploy (arquivos versionados + fotos) e publica dela.
set -euo pipefail
envfile=$1; media=$2
root=$(git rev-parse --show-toplevel)
out="$root/.cache/deploy"
rm -rf "$out" && mkdir -p "$out"
git -C "$root" ls-files -co --exclude-standard -z | (cd "$root" && xargs -0 tar -cf -) | tar -xf - -C "$out"
mkdir -p "$out/apps/web/public/media"
find "$media" -maxdepth 1 -type f ! -name '*.mp4' ! -name '*.webm' -exec cp {} "$out/apps/web/public/media/" \;
# Monorepo sem configuração de projeto: o builder do Next roda a partir de apps/web.
cat > "$out/vercel.json" <<'JSON'
{ "builds": [{ "src": "apps/web/package.json", "use": "@vercel/next" }], "regions": ["gru1"] }
JSON
args=()
while IFS='=' read -r k v; do
  [[ -z $k || $k == \#* ]] && continue
  args+=(--env "$k=$v" --build-env "$k=$v")
done < "$envfile"
cd "$out"
echo "Publicando $(du -sh . | cut -f1) (fotos: $(ls apps/web/public/media | wc -l))..."
env -u CI -u GITHUB_ACTIONS -u CONTINUOUS_INTEGRATION npx --yes vercel@latest deploy --temporary --yes "${args[@]}" 2>&1 | grep -vE "^(npm warn)" | sed -E 's#(postgres(ql)?://)[^ ]+#\1***#g'
