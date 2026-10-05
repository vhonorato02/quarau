#!/usr/bin/env bash
# Creates/updates /srv/apps/quarau/.env from the template, generating strong
# random values for every empty secret. Secrets are created ON the VPS and never
# leave it; the temporary basic-auth password is written to a root-only file.
#   provision-env.sh <temp-domain>      e.g. quarau.177-107-94-44.sslip.io
source "$(dirname "$0")/lib.sh"
domain="${1:?uso: provision-env.sh <dominio-temporario>}"
tpl="$APP_DIR/.env.production.example"
env="$APP_DIR/.env"
creds="$APP_DIR/CREDENCIAIS.txt"

[[ -f "$env" ]] || { cp "$tpl" "$env"; log ".env criado a partir do modelo"; }
chmod 600 "$env"

rand() { openssl rand -base64 64 | tr -dc 'A-Za-z0-9' | head -c "${1:-40}"; }
set_if_empty() {
  local key="$1" value="$2"
  if grep -qE "^${key}=$" "$env"; then
    sed -i "s|^${key}=$|${key}=${value}|" "$env"
    log "gerado: ${key}"
  elif ! grep -qE "^${key}=" "$env"; then
    echo "${key}=${value}" >> "$env"
  fi
}
set_value() { sed -i "s|^$1=.*|$1=$2|" "$env"; }

for k in PAYLOAD_SECRET PREVIEW_SECRET REVALIDATE_SECRET POSTGRES_PASSWORD S3_SECRET_ACCESS_KEY MEILI_MASTER_KEY UMAMI_APP_SECRET RESTIC_PASSWORD; do
  set_if_empty "$k" "$(rand 48)"
done

base="${domain#*.}"   # 177-107-94-44.sslip.io
set_value SITE_URL "https://${domain}"
set_value TRAEFIK_RULE "Host(\`${domain}\`)"
set_value UMAMI_DOMAIN "stats.${base}"
set_value STATUS_DOMAIN "status.${base}"

if grep -q 'REPLACE_WITH_BCRYPT_HASH' "$env"; then
  pass=$(rand 20)
  hash=$(htpasswd -nbB quarau "$pass" | tr -d '\n')
  sed -i "s|^BASIC_AUTH_USERS=.*|BASIC_AUTH_USERS='${hash}'|" "$env"
  sed -i "s|^HEALTH_BASIC_AUTH=.*||" "$env"
  echo "HEALTH_BASIC_AUTH=quarau:${pass}" >> "$env"
  umask 077
  {
    echo "Quarau — credenciais do ambiente temporário (gerado em $(date -u +%FT%TZ))"
    echo "URL: https://${domain}"
    echo "Basic auth: usuário quarau / senha ${pass}"
  } > "$creds"
  log "credenciais de acesso gravadas em $creds (somente root/deploy)"
fi
log ".env pronto"
