#!/usr/bin/env bash
# Instala/atualiza a plataforma na VPS (idempotente):   sudo infra/platform/install.sh
# - copia compose, Traefik e scripts para /srv/platform;
# - gera /srv/platform/.env com segredos aleatórios (só na primeira vez);
# - sobe Traefik + Postgres; cria o repositório de backup;
# - instala o comando "site" e os timers (auto-deploy, monitor, backup, teste de restore).
set -Eeuo pipefail
[[ $EUID -eq 0 ]] || exec sudo "$0" "$@"
src="$(cd "$(dirname "$0")" && pwd)"
P=/srv/platform

install -d -m 755 /srv /srv/sites
install -d -m 755 "$P" "$P/bin" "$P/traefik" "$P/traefik/dynamic"
install -d -m 750 "$P/data"
install -d -m 700 "$P/traefik/acme" /srv/backups /var/lib/platform
install -m 644 "$src/docker-compose.yml" "$P/docker-compose.yml"
install -m 644 "$src/traefik/dynamic/00-common.yml" "$P/traefik/dynamic/00-common.yml"
rm -f "$P/traefik/dynamic.yml"
install -m 755 "$src"/bin/* "$P/bin/"
ln -sf "$P/bin/site" /usr/local/bin/site

if [[ ! -f "$P/.env" ]]; then
  rand() { openssl rand -base64 64 | tr -dc 'A-Za-z0-9' | head -c "$1"; }
  ip=$(ip -4 route get 1.1.1.1 | awk '{for(i=1;i<=NF;i++) if($i=="src") print $(i+1)}')
  umask 077
  cat > "$P/.env" <<EOF
# Configuração da plataforma. Guarde RESTIC_PASSWORD também fora do servidor:
# sem ela os backups não podem ser lidos.
SERVER_IP=$ip
BASE_DOMAIN=$(hostname -f)
POSTGRES_PASSWORD=$(rand 40)
RESTIC_REPOSITORY=/srv/backups/restic
RESTIC_PASSWORD=$(rand 48)
# Cópia off-site opcional (ex.: s3:https://s3.us-west-000.backblazeb2.com/meu-bucket
# + AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY, ou sftp:usuario@outro-servidor:/backups)
RESTIC_REPOSITORY_OFFSITE=
# Alertas no celular: instale o app ntfy e assine o tópico abaixo.
ALERT_URL=https://ntfy.sh/vps-$(rand 20 | tr 'A-Z' 'a-z')
EOF
  echo "✔ /srv/platform/.env criado"
fi
chmod 600 "$P/.env"

docker compose --project-directory "$P" -f "$P/docker-compose.yml" up -d --remove-orphans --wait

set -a; source "$P/.env"; set +a
if ! RESTIC_REPOSITORY="$RESTIC_REPOSITORY" RESTIC_PASSWORD="$RESTIC_PASSWORD" restic cat config >/dev/null 2>&1; then
  RESTIC_REPOSITORY="$RESTIC_REPOSITORY" RESTIC_PASSWORD="$RESTIC_PASSWORD" restic init --quiet
  echo "✔ repositório de backup criado em $RESTIC_REPOSITORY"
fi

unit() { # unit <nome> <script> <OnCalendar|intervalo> <descrição>
  cat > "/etc/systemd/system/platform-$1.service" <<EOF
[Unit]
Description=$4
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=$P/bin/$2
Nice=10
IOSchedulingClass=idle
EOF
  local when
  if [[ "$3" == *:* ]]; then when="OnCalendar=$3
Persistent=true
RandomizedDelaySec=5m"; else when="OnBootSec=2min
OnUnitActiveSec=$3"; fi
  cat > "/etc/systemd/system/platform-$1.timer" <<EOF
[Unit]
Description=$4 (agendamento)

[Timer]
$when

[Install]
WantedBy=timers.target
EOF
}
unit autodeploy autodeploy.sh 2min 'Auto-deploy dos sites (imagens :latest)'
unit health healthwatch.sh 5min 'Monitor da VPS e dos sites'
unit backup backup.sh '*-*-* 03:17:00' 'Backup diário (restic)'
unit restore-test restore-test.sh 'Sun *-*-* 04:23:00' 'Teste semanal de restore'
systemctl daemon-reload
systemctl enable --now platform-autodeploy.timer platform-health.timer platform-backup.timer platform-restore-test.timer >/dev/null

echo "✔ plataforma pronta. Rode: site ajuda"
