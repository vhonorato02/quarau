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
out="${DEPLOY_DIR:-$root/.cache/deploy}" # outside the git checkout in CI: the CLI must not mix the two roots
rm -rf "$out" && mkdir -p "$out"
git -C "$root" ls-files -co --exclude-standard -z | (cd "$root" && xargs -0 tar -cf -) | tar -xf - -C "$out"
mkdir -p "$out/apps/web/public/media"
find "$media" -maxdepth 1 -type f ! -name '*.mp4' ! -name '*.webm' -exec cp {} "$out/apps/web/public/media/" \;
# Monorepo: build from the repo root with the project setting rootDirectory=apps/web (read by the local build).
# The Dockerfile is left out so the CLI does not switch to container mode.
rm -f "$out/Dockerfile" "$out/.dockerignore"
mkdir -p "$out/.vercel"
cat > "$out/.vercel/project.json" <<'JSON'
{"projectId":"","orgId":"","settings":{"framework":"nextjs","rootDirectory":"apps/web","installCommand":"pnpm install --frozen-lockfile","buildCommand":"pnpm build:vercel","outputDirectory":null,"nodeVersion":"24.x"}}
JSON
args=()
while IFS='=' read -r k v; do
  [[ -z $k || $k == \#* ]] && continue
  v=${v%$'\r'}; v=${v#\"}; v=${v%\"}; v=${v#\'}; v=${v%\'} # dotenv quotes and CRLF
  args+=(--env "$k=$v")
  export "$k=$v" # the anonymous deploy builds locally: the build reads them from this process
done < "$envfile"
cd "$out"
echo "Publicando $(du -sh "$out" | cut -f1) (fotos: $(ls apps/web/public/media | wc -l))..."
env -u CI -u GITHUB_ACTIONS -u CONTINUOUS_INTEGRATION npx --yes vercel@latest deploy --temporary --yes "${args[@]}" 2>&1 | grep -vE "^(npm warn)" | sed -E 's#(postgres(ql)?://)[^ ]+#\1***#g'
