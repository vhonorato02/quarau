# S12 — VPS engatilhada (ensaio geral, sem domínio)

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO + [ADR 0015](../decisions/0015-homologacao-vercel-producao-vps.md) + [vps-guia.md](../vps-guia.md)
· **Dono:** 🔑 acesso SSH do PC à VPS (10 min); 🔑 tornar público o pacote da imagem no GitHub (1 min)

## Objetivo

A VPS está auditada e com a plataforma saudável. A **mesma imagem** testada no CI roda lá num subdomínio de ensaio, contra o banco e a mídia de produção, aguenta carga dentro de 512 MB e tem o runbook de corte escrito. Depois do "aprovado" (S11), o go-live é trocar o domínio, não um projeto novo.

## ⚠️ Regras invioláveis da VPS (do dono; valem em toda sessão que tocar a VPS)

1. **Nunca** alterar `/etc/ssh/sshd_config` nem a porta **22322**. **Nunca** `ufw enable`, `ufw reset` ou `iptables` sem confirmar antes que `22322/tcp` está liberada.
2. **Disco:** rodar `df -h` antes de baixar imagens; nunca chegar a 100%. Nada de build na VPS: a imagem vem pronta do GHCR.
3. Não parar nem reiniciar contêineres de **outros sites**. Nada de `docker system prune -a`, `docker compose down` global ou reinício do Docker.
4. **Menor privilégio:** usuário `zewithane`; `sudo` só no comando que precisa.
5. **Backup de qualquer arquivo de configuração antes de mudar** (`cp arquivo arquivo.bak-$(date +%F)`).
6. A VPS hospeda outros sites: toda mudança deve ser reversível e afetar só o Quarau.

## Passos

1. 🔑 **SSH a partir do PC:**
   - o agente gera uma chave dedicada: `ssh-keygen -t ed25519 -f ~/.ssh/quarau_vps -N "" -C "pc-dono-quarau"`;
   - mostra **só a chave pública**;
   - o dono entra no console do provedor como `zewithane` e roda a linha que o agente der:

     ```bash
     mkdir -p ~/.ssh && echo '<PUB>' >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
     ```

   - o agente cria `~/.ssh/config`:

     ```
     Host quarau-vps
       HostName zewithane.vps.brz.dev.br   (IP 177.107.94.31)
       Port 22322
       User zewithane
       IdentityFile ~/.ssh/quarau_vps
     ```

   - testar com `ssh quarau-vps 'echo ok'`.
   - Nunca usar a chave privada que foi colada numa conversa antiga.
2. **Diagnóstico:**
   - `ssh quarau-vps 'bash -s' < infra/vps/preflight.sh > docs/vps/preflight-<data>.txt`;
   - ler e decidir:

     | Cenário                                                                      | Ação                                                                                                                                                           |
     | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
     | Plataforma da ADR 0013 presente e saudável                                   | seguir                                                                                                                                                         |
     | Sem plataforma e **80/443 livres**                                           | `scp -r infra/platform quarau-vps:/tmp/` + `sudo bash /tmp/platform/install.sh` (lê o script antes; respeita as regras)                                        |
     | Sem plataforma e **80/443 ocupadas por outro proxy** (Coolify, nginx, Caddy) | **não tomar as portas**: subir o Quarau só com o `docker compose` do site e criar a rota no proxy existente (backup da config antes); registrar em `docs/vps/` |
     | Menos de ~600 MB livres ou disco > 85%                                       | **parar** e registrar em PROGRESSO com números: o dono decide (limpar outros sites ou aumentar a VPS)                                                          |

3. 🔑 **Imagem acessível na VPS:**
   - a imagem `ghcr.io/vhonorato02/quarau` não tem segredo nenhum (variáveis só em tempo de execução), então o mais simples é deixar o **pacote público**: GitHub → seu perfil → Packages → `quarau` → Package settings → Change visibility → Public;
   - alternativa: `docker login ghcr.io` na VPS com um token só de leitura de pacotes.
4. **Variáveis de produção para a VPS** (nunca no git e nunca impressas):
   - montar `quarau.env` local a partir de `vercel env pull --environment production`, contendo `DATABASE_URL` e `BLOB_READ_WRITE_TOKEN`;
   - **novos** `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `REVALIDATE_SECRET` e `CRON_SECRET` (o `PAYLOAD_SECRET` novo só desloga quem estiver logado);
   - `SITE_URL=https://quarau.zewithane.vps.brz.dev.br`, `SITE_NOINDEX=true`, `PAYLOAD_JOBS_AUTORUN=false` (no ensaio a Vercel ainda é a dona da fila), e e-mail (Resend) se houver;
   - enviar: `scp quarau.env quarau-vps:/tmp/` → usar no `site config` → `shred -u` local e remoto.
5. **Subir o ensaio:**

   ```bash
   site novo quarau ghcr.io/vhonorato02/quarau --dominio quarau.zewithane.vps.brz.dev.br --porta 3000 --saude /next/health --memoria 512m --sem-banco
   ```

   (ou o equivalente do cenário escolhido). Depois `site config quarau` com o env, `site deploy quarau` e `site lista` → no ar com HTTPS.

6. **Ensaio geral** contra `https://quarau.zewithane.vps.brz.dev.br`:
   - `screens.mjs` + `qa-visual`;
   - smoke `@smoke`;
   - 2 personas;
   - k6 do PC: 20 req/s por 2 min e pico de 40 req/s por 30 s. Durante o teste, `ssh quarau-vps 'docker stats --no-stream'` a cada 15 s;
   - aceite: p95 ≤ 600 ms, 0 erros, memória < 450 MB, **e os outros sites continuam respondendo** (curl antes, durante e depois).
   - Registrar em `docs/vps/ensaio-<data>.md`.
7. **Atualização automática:** o `site novo` já liga o autodeploy (confira com `site lista`; para pausar, `site autodeploy quarau off`). Cada push verde na `main` publica no ensaio em até ~2 min. Rollback: `site rollback quarau`.
8. **Runbook de corte** (`docs/vps/CORTE.md`): pré-condições, passo a passo com comandos exatos da S13, tempo estimado, como voltar atrás em 5 minutos, e quem precisa fazer o quê.

## Pronto quando

- Preflight arquivado.
- Ensaio no ar com HTTPS e `noindex`.
- k6 dentro dos limites sem afetar os outros sites.
- Rollback testado uma vez.
- `CORTE.md` escrito.
- **Nada de domínio ainda.**
