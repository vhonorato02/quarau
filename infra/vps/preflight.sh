#!/usr/bin/env bash
# Diagnóstico da VPS antes de receber o Quarau. SOMENTE LEITURA: não instala, não para e não altera nada.
#
#   ssh quarau-vps 'bash -s' < infra/vps/preflight.sh > docs/vps/preflight-$(date +%F).txt
#
# Responde: há memória, disco e Docker para mais um contêiner de 512 MB? Quem já usa as portas 80/443?
# A plataforma da ADR 0013 (Traefik + comando `site`) está instalada e saudável? Quais outros sites existem?
set -u
section() { printf '\n===== %s =====\n' "$1"; }
run() { printf '$ %s\n' "$*"; "$@" 2>&1 | head -n "${LINES_MAX:-40}"; }
can_sudo() { sudo -n true 2>/dev/null; }

section "Sistema"
run uname -a
run cat /etc/os-release
run uptime
run nproc

section "Memória e swap (precisa de ~600 MB livres para o Quarau)"
run free -m

section "Disco (regra: nunca chegar a 100%; o Quarau precisa de ~1,5 GB para imagem + folga)"
run df -h / /var/lib/docker /srv

section "Docker"
run docker --version
run docker compose version
if docker info >/dev/null 2>&1 || (can_sudo && sudo docker info >/dev/null 2>&1); then
  D="docker"; docker info >/dev/null 2>&1 || D="sudo docker"
  run $D ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
  run $D stats --no-stream --format 'table {{.Name}}\t{{.MemUsage}}\t{{.CPUPerc}}'
  run $D system df
else
  echo "Docker indisponível para este usuário (sem sudo sem senha?)"
fi

section "Quem escuta em 80/443 (não tomar portas de outros sites)"
if can_sudo; then run sudo ss -ltnp '( sport = :80 or sport = :443 or sport = :22322 )'; else run ss -ltn; fi

section "Firewall (somente leitura; a porta 22322/tcp deve estar liberada)"
if can_sudo; then run sudo ufw status verbose; else echo "sem sudo: não foi possível ler o UFW"; fi

section "Plataforma da ADR 0013"
run ls -la /srv/platform /srv/sites
command -v site >/dev/null && run site lista || echo "comando 'site' não encontrado"
run ls /srv/platform/traefik/dynamic

section "DNS e saída para o GHCR"
run getent hosts quarau.zewithane.vps.brz.dev.br
run curl -sS -o /dev/null -w 'ghcr.io HTTP %{http_code}\n' https://ghcr.io/v2/

section "Fim"
echo "Leia o relatório e siga docs/plano/S12-vps.md."
