# Baseline de auditoria | Quarau | 04/11/2026

**Estado inicial observado:** `main` em `aefaa1678187115b143df2b7efaaa1b6cf546ce6`.  
**Ambiente consultado:** GitHub, Vercel, Neon e páginas públicas do site/LinkedIn/IPHAN.  
**Natureza das evidências:** inspeção remota e logs reais. Não equivale a QA E2E com navegador autenticado.

## Inventário confirmado

- Produto: site institucional e editorial com Next.js 16, Payload 3 e Postgres; monorepo pnpm/Turborepo. Há nove coleções CMS, incluindo `news`, e blocos editáveis para notícia. Referências: `docs/ARCHITECTURE.md` e inspeção de `src/payload.config.ts`.
- `quarau.com.br`: website legado responde com página “Início - QUARAU”, texto institucional em WordPress. **Não houve troca de DNS, desativação de WordPress ou migração de domínio.**
- Projeto Vercel **quarau** (`prj_AprZxL0w7Iqvpbh1k92QcUUblGB0`): último deploy consultado, `dpl_5nxH7qpEe1SLw4pE4jz8kdW31LN7`, estado **ERROR**. Causa objetiva no log: `[vercel-build] DATABASE_URL (or POSTGRES_URL) is missing`.
- Banco Neon: nenhuma instância Quarau estava disponível entre os projetos conectados na primeira consulta. Criado **quarau-staging**, ID `misty-fog-46195118`, região `aws-sa-east-1`, Postgres 17 e limite de compute 0,25 CU. Conexão `DATABASE_URL` configurada na Vercel para os targets production/preview, com tipo `sensitive`. **O deploy atualizado ainda precisa ser verificado.**
- Vercel contém também `BLOB_READ_WRITE_TOKEN`, `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `REVALIDATE_SECRET`, `CRON_SECRET`, `PAYLOAD_DB_PUSH` e `SITE_NOINDEX`. A existência da variável **não comprova sua validade**; valores não foram divulgados.
- `docs/PROGRESSO.md` (de 27/10) informa teste E2E anterior 88/88 e gate Lighthouse do contêiner vermelho por TBT. Esses resultados **não valem como QA do commit atual**.
- Noticias: coleção com `sourceUrl`, rascunho/publicação e relações com projetos; a página `noticias` estava marcada `draft` no seed anterior.
- Fontes: site antigo, LinkedIn público (curadoria parcial) e IPHAN; Instagram não retornou conteúdo público confiável para importação.

## Ações desta sessão e verificações faltantes

1. Adicionada curadoria de seis matérias em `apps/web/scripts/seed/news.ts`, com fatos rastreados em `content/social/EDITORIAL-SOURCES.md`.
2. Seed `apps/web/scripts/seed/index.ts` ampliado para criar notícias idempotentes usando imagens **já existentes** no projeto correspondente, sem baixar mídia de redes.
3. Template `noticias` marcado para publicação; seed de manutenção publica apenas o template inicial ainda inalterado quando já existir em rascunho.
4. Novo teste unitário `apps/web/tests/unit/curated-news.test.ts`.
5. Banco Neon de homologação criado e `DATABASE_URL` configurada na Vercel, sem tocar domínio principal.

**Ainda não comprovado:** build, CI final, população real do CMS, upload de mídia, login, formulário, screenshots, Playwright/axe, Lighthouse, backup/restore, direitos autorais, envio de e-mail e smoke no domínio migrado. Nunca interpretar estes itens como `PASSOU`.

## Primeiros gates

| Gate                             | Situação no baseline                                             |
| -------------------------------- | ---------------------------------------------------------------- |
| G01–G04 build, tipo, testes, E2E | BLOQUEADO / NOVA EXECUÇÃO EM ANDAMENTO                           |
| G05 CMS                          | NÃO VERIFICADO no banco novo                                     |
| G08 Conteúdo                     | CURADORIA COM FONTE; direitos de imagens seguem pendentes        |
| G11 SEO e sitemap                | NÃO VERIFICADO após seed                                         |
| G14 Lighthouse/TBT               | ANTERIORMENTE VERMELHO; requer novo trace                        |
| G17 banco e migrações            | Projeto Neon criado; migrações não comprovadas                   |
| G18 Infra                        | Vercel estava ERROR por DATABASE_URL ausente; variável corrigida |
| G19 pipeline                     | Não declarar verde até checar Actions para o SHA final           |
| G21 release                      | NÃO HÁ RELEASE STABLE                                            |

## Segurança de operação

Nenhum token, senha, conteúdo privado, dump ou link privilegiado é registrado neste documento. Nenhum DNS, MX, WordPress ou produção VPS foi alterado. `quarau.com.br` continua sob plano de corte independente.
