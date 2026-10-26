# S01 — Contas, banco e variáveis

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO + [ADR 0015](../decisions/0015-homologacao-vercel-producao-vps.md)
· **Dono:** 🔑 `vercel login`, termos do Neon (se pedir), `/mcp` → vercel → Authenticate

## Objetivo

Banco de produção e de desenvolvimento criados e ligados, variáveis no lugar, admin local abrindo contra o banco de dev. Nenhum segredo passa pela conversa.

## Já existe (não recriar)

- Projeto Vercel `quarau` (`prj_AprZxL0w7Iqvpbh1k92QcUUblGB0`, time `jose-victors-projects-5cc9abbe`), raiz `apps/web`, região `gru1`, ligado ao GitHub.
- Blob `quarau-media` (público) → `BLOB_READ_WRITE_TOKEN` em todos os ambientes.
- Variáveis de produção:
  - sensíveis: `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `REVALIDATE_SECRET`, `CRON_SECRET`;
  - comuns: `PAYLOAD_DB_PUSH=false`, `SITE_NOINDEX=true`, `NEXT_PUBLIC_ENABLED_LOCALES=pt`, `CONTACT_RECIPIENT`.

## Passos

1. 🔑 **Vercel:**
   - `vercel login` (o dono confirma no navegador, com o GitHub `vhonorato02`);
   - depois, na raiz: `vercel link --yes --project quarau --scope jose-victors-projects-5cc9abbe`;
   - 🔑 no Claude Code, `/mcp` → vercel → Authenticate.
2. **Neon** (gratuito, São Paulo, sem Neon Auth), dois bancos separados:
   - produção e preview:

     ```bash
     vercel integration add neon --name quarau-db --plan free_v3 -m region=gru1 -m auth=false -e production -e preview --no-env-pull
     ```

   - desenvolvimento:

     ```bash
     vercel integration add neon --name quarau-dev --plan free_v3 -m region=gru1 -m auth=false -e development --no-env-pull
     ```

   - Flags mudaram? `vercel integration add neon --help`. Pedido de termos: `vercel integration accept-terms neon` (🔑 interativo).
   - O código aceita `DATABASE_URL` ou `POSTGRES_URL` (`src/lib/platform-env.ts`).
   - **Este `quarau-db` é o banco definitivo:** a VPS vai usá-lo no go-live (ADR 0015).
3. **Variáveis de desenvolvimento** (só `development`). Gere valores novos, sem eco no log:

   ```bash
   gen() { node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"; }
   for k in PAYLOAD_SECRET PREVIEW_SECRET REVALIDATE_SECRET CRON_SECRET; do gen | vercel env add "$k" development >/dev/null; done
   for kv in SITE_NOINDEX=true NEXT_PUBLIC_ENABLED_LOCALES=pt PAYLOAD_DB_PUSH=false; do printf '%s' "${kv#*=}" | vercel env add "${kv%%=*}" development >/dev/null; done
   ```

4. **Baixar:** `vercel env pull apps/web/.env.local --environment development --yes`.
   - Padronize: o app e **todos** os scripts leem `apps/web/.env.local` (`--env-file-if-exists=.env.local` nos scripts `tsx` do `package.json`).
   - Apague o `.env` da raiz e o symlink `apps/web/.env`, se existirem.
   - **Nunca imprimir o arquivo:** para conferir, `grep -c '=' apps/web/.env.local` ou `cut -d= -f1`.
5. **Banco de dev:**
   - `pnpm --filter @quarau/web payload migrate`;
   - `pnpm dev` em segundo plano → `http://localhost:3000/admin` abre a tela "criar primeiro usuário".
   - Crie o admin técnico do dono com `seed:admin`, usando o e-mail de `gh api user --jq .email` ou de `git config user.email`.
   - Grave a senha gerada em `ACESSO-ADMIN.txt` (fora do git).
6. **CI:** confira com `gh run list -L 3` se o CI da `main` está verde. Se não estiver, corrija antes de seguir.

## Pronto quando

- `vercel env ls` mostra `DATABASE_URL` em production, preview e development (bancos diferentes).
- O admin local abre e loga.
- PROGRESSO marcado; commit `chore(env): …` se os scripts mudaram.

## Armadilhas

- Variáveis sensíveis da Vercel **não** descem no `pull`: vêm vazias. É esperado.
- Nunca `PAYLOAD_DB_PUSH=true` num banco que recebe migrações: trava num prompt interativo.
