# Operar a VPS pelo console web do provedor

Use quando o SSH não abre. Cole um bloco por vez no console (logado como `root`, ou rode `sudo -i` antes).
Nenhum bloco edita o `/etc/ssh/sshd_config`, muda a porta 22322, ativa firewall ou para o Coolify.

## Bloco 1 — diagnóstico do SSH (só leitura)

```bash
echo "== serviço";   systemctl is-active ssh ssh.socket sshd 2>/dev/null
echo "== escutando"; ss -tlnp | grep -E 'sshd|:22322|:22 ' || echo "NADA escutando para SSH"
echo "== config";    sshd -t && echo "config OK" ; sshd -T 2>/dev/null | grep -E '^(port|passwordauthentication|pubkeyauthentication|permitrootlogin) '
echo "== erros";     journalctl -u ssh -u ssh.socket -u sshd --since "-2h" --no-pager | tail -15
echo "== firewall";  ufw status 2>/dev/null | head -12; iptables -S INPUT 2>/dev/null | head -8
echo "== fail2ban";  fail2ban-client status sshd 2>/dev/null | grep -E 'Currently|Banned' || echo "sem fail2ban"
echo "== coolify";   docker exec coolify-db psql -U coolify -d coolify -tAc "select name, ip, port, \"user\" from servers" 2>/dev/null
echo "== chaves root"; wc -l /root/.ssh/authorized_keys 2>/dev/null
```

## Bloco 2 — correção segura do SSH

Corrige os casos comuns: serviço parado, socket do systemd escutando na porta antiga (Ubuntu 22.10+), IP
banido pelo fail2ban, firewall ativo sem a 22322.

```bash
systemctl daemon-reload
systemctl restart ssh.socket 2>/dev/null; systemctl restart ssh 2>/dev/null || systemctl restart sshd
fail2ban-client unban --all 2>/dev/null || true
ufw status | grep -q 'Status: active' && ufw allow 22322/tcp
sleep 2; ss -tlnp | grep -E ':22322' && echo "SSH OK na 22322" || echo "SSH ainda não escuta na 22322: mande a saída do Bloco 1"
```

Coolify: ele entra no próprio servidor por SSH como `root`, na porta cadastrada em _Servers → localhost_. Se o
Bloco 1 mostrar `port` diferente de `22322`, ajuste lá para 22322 (ou rode a linha abaixo) e clique em
_Validate Server_.

```bash
docker exec coolify-db psql -U coolify -d coolify -c "update servers set port = 22322 where ip in ('host.docker.internal','localhost','127.0.0.1') or id = 0;"
```

## Bloco 3 — instalar o site completo

Precisa de um token do GitHub (Settings → Developer settings → Personal access tokens → _Fine-grained_, acesso de
leitura ao repositório `quarau`). Troque `SEU_TOKEN` e o e-mail do administrador.

```bash
apt-get install -y -qq git >/dev/null
[ -d /srv/src/quarau ] || git clone https://SEU_TOKEN@github.com/vhonorato02/quarau.git /srv/src/quarau
cd /srv/src/quarau && git remote set-url origin https://github.com/vhonorato02/quarau.git  # não guarda o token
bash infra/scripts/console-install.sh --admin-email SEU_EMAIL
```

O script faz, nesta ordem: verificações (Docker, rede do Coolify, disco), preparação do servidor, arquivos da
stack e segredos gerados no próprio servidor, build das imagens, deploy sem downtime, importação de todo o conteúdo
do quarau.com.br, criação do administrador, primeiro backup e um teste final. Pode rodar de novo sem problema.
Leva de 20 a 40 minutos (a maior parte é o build e a conversão dos vídeos; `--skip-video` deixa os vídeos para
depois).

No fim: site em `https://quarau.177-107-94-44.sslip.io` e painel em `/admin`. As senhas (do acesso temporário e do
admin) ficam em `/srv/apps/quarau/CREDENCIAIS.txt`: `cat /srv/apps/quarau/CREDENCIAIS.txt`.

Atualizar o site depois: `cd /srv/src/quarau && git pull && bash infra/scripts/console-install.sh --admin-email
SEU_EMAIL --skip-content` (o administrador já criado não é alterado).
