# 0019 — Hospedagem gratuita hoje, VPS amanhã, sem reescrever código

- **Status:** aceita (substitui 0004, 0013, 0014 e 0015; a plataforma da VPS agora é o repo `vhonorato02/vps-platform`)
- **Data:** 2026-10-26

## Contexto

O site precisa ir ao ar sem custo e, depois do aceite, migrar para a VPS `zewithane` (Caddy + um `docker compose`
por site + CLI `site`, repo `vhonorato02/vps-platform`). A migração tem de levar menos de 1 hora.

Limites conferidos nas páginas oficiais em 2026-10-26:

| Serviço | Plano gratuito |
| --- | --- |
| Vercel Hobby | **uso não comercial e pessoal**; 100 GB de transferência; 1 M invocações; 4 h de CPU ativa; funções até 300 s; cron **1×/dia** com precisão de ±59 min ([hobby](https://vercel.com/docs/plans/hobby), [cron](https://vercel.com/docs/cron-jobs/usage-and-pricing)) |
| Neon Free | 1 GB por projeto; 100 CU-h/mês por projeto; 10 branches; suspende após 5 min ocioso ([plans](https://neon.com/docs/introduction/plans)) |
| Cloudflare R2 | 10 GB-mês; 1 M operações classe A e 10 M classe B por mês; **saída gratuita** ([pricing](https://developers.cloudflare.com/r2/pricing/)) |
| Resend Free | 3.000 e-mails/mês, **100/dia**, 3 domínios ([pricing](https://resend.com/pricing)) |

## Decisão

Toda dependência externa fica atrás de um adaptador escolhido por variável de ambiente:

| Peça | Agora (grátis) | Na VPS | Adaptador / variável |
| --- | --- | --- | --- |
| App | Vercel Hobby, `gru1` | contêiner `ghcr.io/vhonorato02/quarau` atrás do Caddy | `output: 'standalone'` fora da Vercel |
| Banco | Neon Free | Postgres do compose do site | `DATABASE_URL`; só migrações versionadas |
| Mídia | Cloudflare R2 | **continua no R2** | `S3_*` (`@payloadcms/storage-s3`); sem `S3_*` = disco (`MEDIA_DIR`) |
| E-mail | Resend (SMTP) | Resend | `SMTP_*` ou `RESEND_API_KEY`; sem nenhum = só grava no CMS |
| Antispam | Turnstile | Turnstile | `TURNSTILE_SECRET_KEY` (sem chave = desligado em dev) |
| Erros | Sentry free | Sentry | `SENTRY_DSN` (vazio = desligado) |
| Busca | Postgres `unaccent` | igual | — |
| Rate limit | memória da função | memória do processo (ou Postgres) | interface `RateLimiter` |
| Tarefas agendadas | GitHub Actions `schedule` a cada 15 min chamando `/api/payload-jobs/run` (o cron da Vercel Hobby é 1×/dia) | fila do Payload no próprio processo, a cada minuto | `PAYLOAD_JOBS_AUTORUN`, `CRON_SECRET` |
| CI/CD | GitHub Actions + deploy Git da Vercel | GitHub Actions → GHCR → `site deploy` | mesmo pipeline |

Regra: **nenhuma API exclusiva da Vercel no código de domínio.** `VERCEL` só decide detalhes de runtime
(tamanho do pool, autorun de tarefas).

## Risco obrigatório: Vercel Hobby é não comercial

A Quarau é uma empresa; o site institucional dela é uso comercial. As regras de uso justo da Vercel permitem que
a conta seja pausada. **Mitigação:** a arquitetura acima torna a saída barata:

1. **Saída 1 (recomendada, prevista):** migrar para a VPS ([MIGRACAO-VPS.md](../MIGRACAO-VPS.md)). A imagem já é
   construída e testada com Postgres local no CI a cada commit; banco = `pg_dump`/`pg_restore`; mídia fica no R2;
   DNS troca. Menos de 1 hora.
2. **Saída 2:** Vercel Pro (US$ 20/mês por membro), sem nenhuma mudança de código.

Até o aceite, o site roda com `SITE_NOINDEX=true` (homologação, não produção pública).

## Consequências

- O `Dockerfile` precisa buildar e rodar em todo commit (job de CI com Postgres de serviço + e2e contra o contêiner).
- A contêiner roda com sistema de arquivos somente leitura (template da VPS): nada é gravado fora de `/tmp`,
  `/app/.next/cache` e `/app/media`.
- Publicação agendada tem atraso de até 15 min na Vercel; documentado em `docs/cms.md`.
