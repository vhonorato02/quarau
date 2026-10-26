# Migração para a VPS (menos de 1 hora)

> Da homologação gratuita (Vercel + Neon + R2) para a VPS `zewithane` com a plataforma
> [`vhonorato02/vps-platform`](https://github.com/vhonorato02/vps-platform) (Caddy + `site`).
> **Nada aqui foi executado na VPS** (fora do escopo da missão). Decisões: [ADR 0019](decisions/0019-free-tier-portavel.md).

## O que já está pronto

- **Imagem:** `ghcr.io/vhonorato02/quarau:<sha>` publicada pelo CI a cada push na `main` (e `:vX.Y.Z` nas tags), depois
  de passar por: build sem banco, subida com Postgres de serviço, migrações, seed, e2e Playwright (site e painel),
  axe, Lighthouse e varredura de segurança. É a mesma imagem que vai para a VPS.
- **Saúde:** `GET /api/health` → `{"status":"ok","db":"ok","storage":"ok"}` (200) ou 503. Usado pelo `HEALTHCHECK`
  da imagem e pelo `site`.
- **Migrações:** aplicadas automaticamente quando o contêiner sobe (`prodMigrations`). Nada de `push`.
- **Mídia:** fica no **Cloudflare R2** (mesmo bucket da homologação). Nada a copiar.
- **Tarefas agendadas:** na VPS o próprio processo roda a fila a cada minuto (`PAYLOAD_JOBS_AUTORUN` padrão).

## Contas que o dono precisa ter (uma vez, antes da homologação)

| Serviço              | Para quê             | O que gerar                                                                                                                      | Onde colocar                                                                                              |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Vercel (Hobby)       | homologação          | projeto `quarau`, raiz `apps/web`, região `gru1`                                                                                 | variáveis abaixo no painel da Vercel                                                                      |
| Neon (Free)          | banco da homologação | projeto em São Paulo; copiar a _connection string_                                                                               | `DATABASE_URL`                                                                                            |
| Cloudflare R2        | mídia                | bucket `quarau-media` com acesso público (domínio `r2.dev` ou `media.quarau.com.br` no go-live) e um token S3 de leitura/escrita | `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL`, `S3_REGION=auto` |
| Resend               | e-mail do formulário | chave de API (domínio `quarau.com.br` só verificado no go-live)                                                                  | `RESEND_API_KEY`                                                                                          |
| Cloudflare Turnstile | antispam             | site key + secret                                                                                                                | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`                                                  |
| Sentry (opcional)    | erros                | DSN do projeto                                                                                                                   | `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`                                                                    |

Gerar segredos (nunca colar em chat): `openssl rand -hex 32` para `PAYLOAD_SECRET`, `REVALIDATE_SECRET` e `CRON_SECRET`.
Lista completa e comentada: [`.env.example`](../.env.example).

## Primeira carga de conteúdo (homologação)

```bash
# no computador do dono, com as variáveis de produção num arquivo fora do git (ex.: ~/quarau-prod.env)
pnpm --filter @quarau/web exec tsx --env-file=$HOME/quarau-prod.env scripts/seed/index.ts
ADMIN_EMAIL=gestor@quarau.com.br pnpm --filter @quarau/web exec tsx --env-file=$HOME/quarau-prod.env scripts/create-admin.ts
```

O seed é idempotente: rodar de novo não duplica nem sobrescreve nada editado no painel.

## Corte para a VPS (passo a passo, ~45 min)

**Pré-requisitos:** aceite do dono; DNS de `quarau.com.br` acessível; `df -h` na VPS com ≥ 3 GB livres.

1. **Criar o site na VPS** (5 min)

   ```bash
   ssh zewithane-vps
   site novo quarau --imagem ghcr.io/vhonorato02/quarau --porta 3000 --saude /api/health --memoria 768m --rw
   ```

   `--rw`: no monorepo o cache do Next fica em `/app/apps/web/.next/cache`, fora do `tmpfs` que o template monta em
   modo somente leitura. Sem `--rw` as páginas não entram em cache.

2. **Variáveis** (5 min): `site config quarau` e colar as mesmas variáveis da Vercel, **exceto** `DATABASE_URL`
   (a plataforma injeta a do Postgres local). Trocar:
   `SITE_URL=https://quarau.com.br`, `SITE_NOINDEX=false`. Remover `PAYLOAD_JOBS_AUTORUN` se existir.

3. **Congelar edições** (1 min): avisar a equipe para não editar no painel até o fim do corte.

4. **Banco: Neon → Postgres da VPS** (10 min)

   ```bash
   # no computador do dono (pg_dump 17); a URL do Neon fica numa variável, não no histórico
   read -rs NEON_URL && pg_dump --format=custom --no-owner --no-acl "$NEON_URL" > quarau.dump
   scp quarau.dump zewithane-vps:/tmp/
   # na VPS
   docker exec -i postgres pg_restore -U postgres -d quarau --no-owner --no-acl --role=quarau --clean --if-exists < /tmp/quarau.dump
   rm /tmp/quarau.dump
   ```

5. **Publicar** (3 min): `site deploy quarau <sha-da-imagem-da-homologação>` e conferir `site logs quarau 100`.

6. **Verificar antes do DNS** (5 min), pelo domínio provisório da plataforma
   (`https://quarau.<BASE_DOMAIN>`): `/api/health` = ok; home, um projeto, contato; login no `/admin` e uma edição
   de teste revertida.

7. **DNS** (5–15 min): no Cloudflare, `quarau.com.br` e `www` → IP da VPS. Depois:
   `site dominio quarau quarau.com.br,www.quarau.com.br --redirecionar www.quarau.com.br --para quarau.com.br`.
   **Não mexer nos registros MX** (o e-mail `contato@` continua onde está; [CONTENT-TODO.md](CONTENT-TODO.md)).

8. **Depois do DNS** (5 min):
   - Vercel: pausar o projeto ou apontar a homologação para um branch novo do Neon (nunca deixar dois processos
     rodando a fila do mesmo banco);
   - GitHub: apagar a variável `JOBS_URL` (desliga o agendador da homologação);
   - R2: se usar `media.quarau.com.br`, apontar o domínio para o bucket e trocar `S3_PUBLIC_URL`;
   - Resend: verificar o domínio `quarau.com.br`;
   - Search Console: enviar `https://quarau.com.br/sitemap.xml`.

## Rollback (2 min)

- **Antes do DNS:** nada a desfazer; a homologação continua no ar.
- **Depois do DNS:** apontar o DNS de volta para a Vercel (o projeto não foi apagado) e reativar `JOBS_URL`. Edições
  feitas na VPS depois do corte precisam ir de volta ao Neon com o mesmo `pg_dump`/`pg_restore` invertido.
- **Versão ruim na VPS:** `site rollback quarau`.

## Backup na VPS

O `site backup` da plataforma (restic, diário) já inclui o dump do banco do site; `site teste-restauracao` valida
semanalmente. A mídia está no R2 (versão de objetos desligada no plano gratuito): para cópia extra,
`rclone sync r2:quarau-media /srv/backups/quarau-media` agendado no cron da VPS.

## Ensaio já automatizado

O job "Production container" do CI faz, a cada push, o caminho dos passos 1–6 com Postgres de serviço:
sobe a imagem, aplica migrações, roda o seed offline e passa os e2e contra o contêiner. Se ele está verde, a imagem
está pronta para a VPS.
