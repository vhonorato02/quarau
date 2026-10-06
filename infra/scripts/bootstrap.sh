#!/usr/bin/env bash
# Idempotent VPS bootstrap & hardening for the Quarau stack (run as root/sudo).
#
#   sudo ./bootstrap.sh audit            # read-only report (default)
#   sudo APPLY=1 ./bootstrap.sh apply    # apply the safe changes below
#
# Inviolable rules from the server owner (docs/ACESSO rules) are enforced here:
#   * /etc/ssh/sshd_config is NEVER edited and the SSH port (22322) is NEVER changed.
#   * UFW is only enabled on request (APPLY_UFW=1) and after 22322/tcp is allowed (verified);
#     an active firewall keeps its default policy (other sites share this VPS).
#   * Coolify containers are never stopped; Docker is never restarted.
#   * Every config file touched gets a .bak-YYYYMMDD copy first.
# Optional, opt-in only: APPLY_SSH_HARDENING=1 adds a drop-in in sshd_config.d
# (key-only auth, root by key only — required by Coolify), validated with `sshd -t`.
set -Eeuo pipefail

MODE="${1:-audit}"
SSH_PORT=22322
DEPLOY_USER="${DEPLOY_USER:-deploy}"
APP_DIR=/srv/apps/quarau
BACKUP_DIR=/srv/backups/quarau
STAMP=$(date +%Y%m%d)

say() { printf '\n== %s\n' "$*"; }
backup_file() { [[ -f "$1" && ! -f "$1.bak-$STAMP" ]] && cp -a "$1" "$1.bak-$STAMP" || true; }
apply() { [[ "$MODE" == apply && "${APPLY:-0}" == 1 ]]; }

[[ $EUID -eq 0 ]] || { echo "rode como root (sudo)"; exit 1; }

# ---------------------------------------------------------------- audit
say "Sistema"
. /etc/os-release && echo "$PRETTY_NAME | kernel $(uname -r) | uptime: $(uptime -p)"
echo "CPU: $(nproc) | Memória: $(free -h | awk '/Mem/{print $2" total, "$7" disponível"}') | Swap: $(free -h | awk '/Swap/{print $2}')"
df -h / | tail -1 | awk '{print "Disco /: "$3" usado de "$2" ("$5")"}'

say "Docker e Coolify"
docker version --format 'Docker {{.Server.Version}}' 2>/dev/null || echo "Docker ausente"
docker compose version 2>/dev/null || true
docker ps --format '{{.Names}}\t{{.Status}}' | sort
docker network ls --format '{{.Name}}' | grep -qx coolify && echo "rede 'coolify' OK" || echo "ATENÇÃO: rede 'coolify' não encontrada"
docker inspect coolify-proxy --format '{{range .Args}}{{println .}}{{end}}' 2>/dev/null | grep -E 'entrypoints|certificatesresolvers|http3' | sed 's/^/  proxy: /' || true

say "SSH (somente leitura)"
sshd -T 2>/dev/null | grep -E '^(port|permitrootlogin|passwordauthentication|kbdinteractiveauthentication|pubkeyauthentication|maxauthtries) ' || true

say "Firewall / fail2ban / atualizações"
ufw status verbose 2>/dev/null | head -20 || echo "ufw ausente"
systemctl is-active fail2ban 2>/dev/null || echo "fail2ban inativo/ausente"
dpkg -l unattended-upgrades 2>/dev/null | grep -q ^ii && echo "unattended-upgrades instalado" || echo "unattended-upgrades ausente"

[[ "$MODE" == audit ]] && { echo; echo "Modo auditoria: nada foi alterado. Use: sudo APPLY=1 $0 apply"; exit 0; }
apply || { echo "Para aplicar defina APPLY=1"; exit 1; }

# ---------------------------------------------------------------- packages
say "Pacotes"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq fail2ban unattended-upgrades restic jq curl rsync apache2-utils ufw >/dev/null
restic self-update >/dev/null 2>&1 || true

# ---------------------------------------------------------------- deploy user
say "Usuário de deploy ($DEPLOY_USER)"
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash "$DEPLOY_USER"
fi
usermod -aG docker "$DEPLOY_USER"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
if [[ -n "${DEPLOY_PUBLIC_KEY:-}" ]]; then
  auth="/home/$DEPLOY_USER/.ssh/authorized_keys"
  touch "$auth"
  grep -qF "$DEPLOY_PUBLIC_KEY" "$auth" || echo "$DEPLOY_PUBLIC_KEY" >> "$auth"
  chown "$DEPLOY_USER:$DEPLOY_USER" "$auth" && chmod 600 "$auth"
fi
# Limited sudo: only the Quarau ops scripts (backups need root for volume paths).
cat > /etc/sudoers.d/quarau-deploy <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: $APP_DIR/scripts/backup.sh, $APP_DIR/scripts/restore-test.sh, $APP_DIR/scripts/restore.sh
EOF
chmod 440 /etc/sudoers.d/quarau-deploy && visudo -cf /etc/sudoers.d/quarau-deploy >/dev/null

install -d -m 750 -o "$DEPLOY_USER" -g "$DEPLOY_USER" /srv/apps "$APP_DIR" "$APP_DIR/scripts" "$APP_DIR/logs"
install -d -m 700 -o root -g root /srv/backups "$BACKUP_DIR"

# ---------------------------------------------------------------- swap + sysctl
say "Swap e kernel"
if ! swapon --show | grep -q .; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  backup_file /etc/fstab
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "swap de 2G criado"
fi
cat > /etc/sysctl.d/99-quarau.conf <<'EOF'
vm.swappiness = 10
vm.vfs_cache_pressure = 50
fs.inotify.max_user_watches = 524288
net.core.somaxconn = 1024
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
kernel.kptr_restrict = 2
EOF
sysctl --system >/dev/null

# ---------------------------------------------------------------- unattended upgrades
say "Atualizações automáticas de segurança"
cat > /etc/apt/apt.conf.d/20auto-upgrades <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF
systemctl enable --now unattended-upgrades >/dev/null 2>&1 || true

# ---------------------------------------------------------------- fail2ban (port 22322)
say "fail2ban"
backup_file /etc/fail2ban/jail.local
cat > /etc/fail2ban/jail.d/quarau-sshd.local <<EOF
[sshd]
enabled  = true
port     = $SSH_PORT
maxretry = 5
findtime = 10m
bantime  = 1h
EOF
systemctl enable --now fail2ban >/dev/null 2>&1 && systemctl reload fail2ban || systemctl restart fail2ban

# ---------------------------------------------------------------- firewall (guarded)
say "UFW"
# The VPS hosts other sites: never change the default policy of an active firewall, and only
# turn an inactive one on when explicitly asked (APPLY_UFW=1) after reviewing the audit.
if ufw status | grep -q 'Status: active'; then
  ufw allow "$SSH_PORT/tcp" comment 'SSH (porta oficial)' >/dev/null
  ufw allow 80/tcp comment 'HTTP' >/dev/null
  ufw allow 443/tcp comment 'HTTPS' >/dev/null
  ufw allow 443/udp comment 'HTTP/3' >/dev/null
  echo "UFW já ativo: regras 22322/80/443 garantidas (política padrão inalterada)"
elif [[ "${APPLY_UFW:-0}" == 1 ]]; then
  ufw allow "$SSH_PORT/tcp" comment 'SSH (porta oficial)' >/dev/null
  ufw show added | grep -q "$SSH_PORT/tcp" || { echo "regra $SSH_PORT não confirmada — abortando ativação do UFW"; exit 1; }
  ufw allow 80/tcp comment 'HTTP' >/dev/null
  ufw allow 443/tcp comment 'HTTPS' >/dev/null
  ufw allow 443/udp comment 'HTTP/3' >/dev/null
  ufw default deny incoming >/dev/null
  ufw default allow outgoing >/dev/null
  ufw --force enable
else
  echo "UFW inativo: mantido assim (outros serviços na VPS). Para ativar: APPLY_UFW=1 após revisar o audit."
fi
ufw status | grep -E "Status|$SSH_PORT" || true

# ---------------------------------------------------------------- optional SSH drop-in (opt-in)
if [[ "${APPLY_SSH_HARDENING:-0}" == 1 ]]; then
  say "SSH: drop-in de endurecimento (sem tocar sshd_config nem a porta)"
  drop=/etc/ssh/sshd_config.d/10-quarau-hardening.conf
  backup_file "$drop"
  cat > "$drop" <<'EOF'
# Managed by quarau bootstrap.sh — key-only authentication.
# Root keeps key-based access because Coolify manages the host over SSH as root.
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
MaxAuthTries 4
EOF
  if sshd -t; then systemctl reload ssh 2>/dev/null || systemctl reload sshd; echo "SSH recarregado (sessões abertas mantidas)"; else rm -f "$drop"; echo "config inválida — drop-in removido"; fi
fi

# ---------------------------------------------------------------- schedules
say "Agendamentos (backup diário, teste de restore semanal, monitor a cada 5 min)"
cat > /etc/cron.d/quarau <<EOF
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
17 3 * * *   root  $APP_DIR/scripts/backup.sh       >> $APP_DIR/logs/backup.log 2>&1
23 4 * * 0   root  $APP_DIR/scripts/restore-test.sh >> $APP_DIR/logs/restore-test.log 2>&1
*/5 * * * *  root  $APP_DIR/scripts/healthwatch.sh  >> $APP_DIR/logs/healthwatch.log 2>&1
EOF
cat > /etc/logrotate.d/quarau <<EOF
$APP_DIR/logs/*.log {
  weekly
  rotate 8
  compress
  missingok
  notifempty
  copytruncate
}
EOF

say "Concluído"
echo "Próximo passo: copiar docker-compose.yml/.env para $APP_DIR e rodar o deploy (GitHub Actions)."
