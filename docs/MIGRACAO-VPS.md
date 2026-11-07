# VPS: homologação, operação e go-live

> A Quarau roda na VPS `zewithane` com a plataforma [`vhonorato02/vps-platform`](https://github.com/vhonorato02/vps-platform)
> (Caddy + um `docker compose` por site + CLI `site`). Decisão: [ADR 0022](decisions/0022-homologacao-na-vps.md).
> A homologação **já é** a máquina de produção: o go-live só troca o domínio e liga a indexação.

## Como está montado

| Peça      | Onde                                                                                          |
| --------- | --------------------------------------------------------------------------------------------- |
| App       | `ghcr.io/vhonorato02/quarau:<sha>` (publicada pelo CI depois de todos os testes), 640 MB      |
| Endereço  | `https://quarau.zewithane.vps.brz.dev.br` (provisório, `SITE_NOINDEX=true`)                   |
| Banco     | Postgres 17 da plataforma, banco/usuário `quarau` (`DATABASE_URL` injetada pelo `site`)       |
| Mídia     | `/srv/sites/quarau/data/media` → `/app/media` (dono uid 1001)                                 |
| Variáveis | `/srv/sites/quarau/app.env` (root, 600), editar com `site config quarau`                      |
| Tarefas   | fila do Payload no próprio processo, a cada minuto (publicação agendada)                      |
| Backup    | `site backup` (restic diário: dump do banco + `data/media`); `site teste-restauracao` semanal |
| Contêiner | raiz somente leitura; graváveis só `/tmp` e `/app/media`; cache de páginas em memória         |
| Saúde     | `GET /api/health` → `{"status":"ok","db":"ok","storage":"ok"}` (200) ou 503                   |
| Migrações | aplicadas quando o contêiner sobe (`prodMigrations`); nunca `push`                            |

## Publicar uma versão nova

Automático: push na `main` → CI/CD verde → job **Deploy to the VPS** (chave SSH dedicada, sem downtime) →
smoke test exige `/api/health` com o SHA novo. Manual, se preciso:

```bash
ssh zewithane-vps 'site deploy quarau <sha-completo> && site saude'
ssh zewithane-vps 'site rollback quarau'   # se algo der errado: volta para a versão anterior
```

## Reinstalação da VPS (06–07/11/2026)

A VPS foi zerada em 06/11 à noite (Ubuntu 24.04 + vps-platform 1.0). O banco e a mídia do Quarau foram
exportados antes para `/srv/backups/import/quarau/` e restaurados em 07/11: `site novo quarau ...`,
`site config quarau --stdin` com o `app.env` antigo, `pg_restore` do `db.dump`, `media.tar.gz` em
`data/` com `chown -R 1001:1001 data/media`, `site deploy`. Conferido: 61 mídias, administrador e conteúdo.

## Carga de conteúdo (feita em 06/11/2026; repetir só se o banco for recriado)

O seed é idempotente: rodar de novo não duplica nem sobrescreve o que foi editado no painel.

```bash
# 1) túnel até o Postgres da plataforma (IP do contêiner: docker inspect postgres)
ssh -N -L 55432:<ip-do-postgres>:5432 zewithane-vps &
# 2) arquivo fora do git com DATABASE_URL=postgres://quarau:<senha do /srv/sites/quarau/.env>@127.0.0.1:55432/quarau,
#    PAYLOAD_DB_PUSH=false, PAYLOAD_JOBS_AUTORUN=false, MEDIA_DIR=<pasta local vazia>
set -a; . ~/quarau-vps.env; set +a
pnpm --filter @quarau/web exec payload migrate
pnpm --filter @quarau/web exec tsx scripts/seed/index.ts
ADMIN_EMAIL=<e-mail do dono> pnpm --filter @quarau/web exec tsx scripts/create-admin.ts   # senha → ACESSO-ADMIN.txt
# 3) fotos geradas → pasta do site
tar -C "$MEDIA_DIR" -cf - . | ssh zewithane-vps 'sudo tar -C /srv/sites/quarau/data/media -xf - && sudo chown -R 1001:1001 /srv/sites/quarau/data/media'
```

A tela pública "criar primeiro usuário" do Payload fica fechada: o primeiro administrador só nasce pelo
`create-admin.ts` (ou com `ALLOW_FIRST_USER_SIGNUP=true` de propósito).

## Go-live em `quarau.com.br` (só com o "aprovado" do dono)

**Pré-requisitos:** aceite do dono; acesso ao painel da **Hostinger** (DNS em `ns1/ns2.dns-parking.com`, e-mail em
`mx1/mx2.hostinger.com`); backup do WordPress antigo;
`df -h` na VPS com ≥ 3 GB livres.

1. **Inventário do DNS** (5 min): anotar todos os registros atuais (A, AAAA, CNAME, **MX**, TXT/SPF/DKIM/DMARC).
   **Não mexer em MX nem nos TXT de e-mail**: o `contato@quarau.com.br` continua onde está.
2. **Backup** (2 min): `ssh zewithane-vps 'site backup'`.
3. **Domínio na plataforma** (2 min):
   `site dominio quarau quarau.com.br,www.quarau.com.br --redirecionar www.quarau.com.br --para quarau.com.br`.
4. **Variáveis** (2 min): `site config quarau` → `SITE_URL=https://quarau.com.br` e `SITE_NOINDEX=false`
   (o `site config` republica sem queda).
5. **DNS** (5–15 min): `A` de `quarau.com.br` e `www` → `177.107.94.44`. TTL curto antes, se possível.
6. **Conferir** (5 min): HTTPS válido, `/api/health` = ok, home, um projeto, notícias, contato, `/admin`, um
   endereço antigo do WordPress redirecionando (301), `robots.txt` liberando e `sitemap.xml` com `quarau.com.br`.
7. **Depois:** Search Console com `https://quarau.com.br/sitemap.xml`; verificar o domínio no provedor de e-mail
   (Resend/SMTP) se o formulário for mandar e-mail; pausar ou apagar o projeto antigo na Vercel.

## Rollback

- **Versão ruim:** `site rollback quarau`.
- **Depois do DNS:** voltar os registros `A` anotados no passo 1 (o WordPress continua no servidor antigo até ser
  desligado de propósito) e `SITE_NOINDEX=true`.
- **Dados:** `site restaurar quarau [snapshot]` (pede confirmação; guarda o estado atual antes).

## E-mail do formulário (pendente do dono)

Sem SMTP o contato **fica salvo no painel** (Relacionamento → Contatos recebidos), mas ninguém é avisado por e-mail.
O caminho sem custo é o SMTP da caixa `contato@quarau.com.br` na Hostinger:

```bash
ssh zewithane-vps
site config quarau   # acrescentar as linhas abaixo e salvar (republica sozinho)
# SMTP_HOST=smtp.hostinger.com
# SMTP_PORT=465
# SMTP_SECURE=true
# SMTP_USER=contato@quarau.com.br
# SMTP_PASS=<senha da caixa>
# EMAIL_FROM_ADDRESS=contato@quarau.com.br
```

Depois, enviar um contato de teste pelo site e conferir a caixa. Não mexe em DNS nem em MX.
