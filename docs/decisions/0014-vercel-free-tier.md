# 0014 — Hospedagem na Vercel, só com planos gratuitos

- **Status:** aceita (substitui a [0013](0013-plataforma-vps-traefik-sem-painel.md) para o site Quarau) · **Data:** 2026-10-07

## Contexto

A VPS de 2 GB não ficou estável como plataforma, e o acesso a ela (SSH, console do provedor) falhou várias vezes.
O dono pediu para tirar tudo da VPS e publicar o site na Vercel usando só planos gratuitos.

## Decisão

| Peça               | Antes (VPS)                  | Agora (gratuito)                                                        |
| ------------------ | ---------------------------- | ----------------------------------------------------------------------- |
| App (site + CMS)   | container Node standalone    | Vercel Hobby, funções em `gru1` (São Paulo)                             |
| Banco              | Postgres 17 próprio          | Neon Free (integração da Vercel, 0,5 GB), `DATABASE_URL`/`POSTGRES_URL` |
| Mídia e documentos | MinIO (S3)                   | Vercel Blob (`BLOB_READ_WRITE_TOKEN`, upload direto do navegador)       |
| E-mail             | SMTP                         | Resend (`RESEND_API_KEY`, 3 mil e-mails/mês)                            |
| Busca              | Meilisearch                  | busca no próprio Postgres (`src/lib/search-fallback.ts`)                |
| Limite de envio    | Valkey                       | memória da função (por instância)                                       |
| Tarefas agendadas  | fila do Payload a cada 1 min | Vercel Cron 1×/dia em `/api/payload-jobs/run` (`CRON_SECRET`)           |

- O build (`pnpm build:vercel`, `scripts/vercel-build.ts`) aplica as migrações, importa o conteúdo do quarau.com.br
  **só se o banco estiver vazio** (edições no CMS nunca são sobrescritas) e roda o `next build`.
- `SITE_URL` cai para o domínio de produção da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`) quando não for definido.
- Os adaptadores antigos (S3, Meilisearch, Valkey, SMTP) continuam no código e voltam a valer se as variáveis
  forem definidas: o site não fica preso à Vercel.

## Consequências

- **Uso comercial:** o plano Hobby da Vercel é para uso pessoal/não comercial. Para o site de um cliente em produção,
  o correto é o plano Pro (US$ 20/mês) ou voltar a um servidor. `[CONFIRMAR]` com o dono.
- Publicação agendada roda uma vez por dia (limite do cron no Hobby). Publicar na hora continua instantâneo.
- Vídeos do site antigo não são importados (limite do Blob gratuito: 1 GB); dá para subir pelo CMS ou usar YouTube.
- E-mail saindo de `@quarau.com.br` exige verificar o domínio no Resend (registros DNS). Até lá o formulário
  grava as mensagens em _Contatos recebidos_ normalmente.
- O site sai com `noindex` (`SITE_NOINDEX=true`) até o domínio definitivo ser apontado.
