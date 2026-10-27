#!/usr/bin/env bash
# Lighthouse mobile (padrão do Lighthouse: Moto G Power, 4G lento) nas URLs dadas.
#   bash tools/qa/lighthouse.sh <pasta-saida> <nome=url> [...]
# Salva <nome>.report.html/.json e imprime as 4 notas.
set -euo pipefail
out=$1; shift
mkdir -p "$out"
chrome=${CHROME_PATH:-$(ls -d "$LOCALAPPDATA"/ms-playwright/chromium-*/chrome-win64/chrome.exe 2>/dev/null | tail -1)}
for pair in "$@"; do
  name=${pair%%=*}; url=${pair#*=}
  ok=0; for try in 1 2 3; do npx --no-install lighthouse "$url" --quiet --chrome-path="$chrome" --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage" \
    --only-categories=performance,accessibility,best-practices,seo --output=json --output=html \
    --output-path="$out/$name" >/dev/null 2>&1 && { ok=1; break; }; done; [ $ok = 1 ] || { echo "$name: falhou"; continue; }
  node -e "const r=require('./$out/$name.report.json');const c=r.categories;const m=r.audits;console.log('$name', ['performance','accessibility','best-practices','seo'].map(k=>k+'='+Math.round(c[k].score*100)).join(' '), 'LCP='+m['largest-contentful-paint'].displayValue, 'TBT='+m['total-blocking-time'].displayValue, 'CLS='+m['cumulative-layout-shift'].displayValue)"
done
