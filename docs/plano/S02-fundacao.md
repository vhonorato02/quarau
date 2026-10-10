# S02 — Fundação técnica

**Modelo:** `opusplan` · **Lê:** este arquivo + PROGRESSO + §5 do [RELATORIO-COMPLETO](../RELATORIO-COMPLETO.md) · **Dono:** nada

## Objetivo

Menos peças, nenhuma dívida que vire depuração depois:

- a mesma aplicação roda igual na Vercel (homologação) e no contêiner da VPS (produção);
- o servidor nunca processa imagem;
- o CI prova o contêiner a cada push.

**Regra da sessão:** cada item termina com `pnpm lint && pnpm typecheck && pnpm test` verde e um commit próprio.

## Antes de mexer

Registre as medidas de partida em PROGRESSO: `pnpm --filter @quarau/web build`, com o "First Load JS" de `/`, `/projetos/[slug]` e `/contato`. Serão comparadas no fim.

## Passos

1. **Tirar o que pesa e não paga:**
   - hero 3D (`three`, `@react-three/*`, `components/hero/HeroScene.tsx`);
   - GSAP, `@gsap/react`, Lenis, `components/motion/SmoothScroll`;
   - Meilisearch (`src/lib/search.ts`, hooks de indexação, `app/next/reindex`, `scripts/reindex-search.ts`, `MEILI_*`);
   - Valkey/Redis (o rate limit fica em memória);
   - Umami;
   - `infra/compose/docker-compose.dev.yml` (dev usa Neon).
   - **Ficam:** `Dockerfile`, `infra/platform/` (é a plataforma da VPS), adaptador S3 (portabilidade futura para R2), SDK do Sentry (liga com `SENTRY_DSN`), `app/next/health`.
2. **Busca no Postgres sem acento:**
   - campo oculto `searchText` (título + resumo + texto, minúsculo e sem acentos), preenchido em `beforeChange` de páginas, projetos, áreas e notícias;
   - a busca normaliza o termo igual e usa `like`.
   - Teste unitário da normalização e teste de integração ("patrimonio" acha "Patrimônio").
3. **Tirar o i18n** (só português):
   - `localization` do Payload fora;
   - `localized: true` fora;
   - rotas sem o segmento `[locale]`, com as mesmas URLs públicas: `/`, `/projetos/...`, e os 301 continuam valendo;
   - next-intl fora: os textos de `src/i18n/messages/pt.json` passam por um helper `t()` temporário, que a S03 troca pelo CMS;
   - `NEXT_PUBLIC_ENABLED_LOCALES` sai de tudo.
   - **O banco de produção está vazio:** apague `src/migrations/*`, recrie o banco de dev (painel do Neon via `vercel integration open neon`, ou `DROP SCHEMA public CASCADE` no dev) e gere a migração inicial nova com `pnpm --filter @quarau/web payload migrate:create inicial`.
     **Zere também o banco de produção (`quarau-db`, ainda sem conteúdo)**: algum deploy da S01 pode já ter aplicado a migração antiga lá. Use `vercel env pull --environment production` para um arquivo temporário e rode `DROP SCHEMA public CASCADE; CREATE SCHEMA public;` com `node` + `pg`. Apague o arquivo em seguida. O próximo deploy aplica a nova inicial.
4. **Imagens sem processamento no servidor** (vale para Vercel e VPS):
   - `Media` gera no upload os tamanhos WebP 480, 768, 1200, 1600 e 2400, mais `og` 1200×630, com ponto focal;
   - `vercelBlobStorage({ …, disablePayloadAccessControl: true })`: as URLs apontam direto para o CDN do Blob;
   - o componente `components/Media.tsx` renderiza `<img srcset sizes width height loading decoding fetchpriority>` com os tamanhos do documento e o `blurDataURL` de fundo, **sem** `next/image` para mídia do CMS (o `next/image` fica só para os arquivos estáticos de `/public`);
   - CSP: adicionar `https://*.public.blob.vercel-storage.com` em `img-src` e `media-src`;
   - teste unitário do cálculo de `srcset`/`sizes`.
5. **Build da Vercel:** `scripts/vercel-build.ts` = `payload migrate` + `next build`. Nada de importação dentro do build.
6. **Fila de tarefas:**
   - no contêiner (VPS), `autoRun` a cada minuto;
   - na Vercel, cron diário (`vercel.json`);
   - variável `PAYLOAD_JOBS_AUTORUN` decide, com padrão `true` fora da Vercel.
7. **CI novo** (`.github/workflows/ci.yml`), jobs em série curta:
   - `qualidade`: format, lint, typecheck, unit.
   - `integracao`: serviço Postgres do GitHub + testes da Local API do Payload (S09 amplia).
   - `conteiner`:
     - build da imagem Docker;
     - sobe com Postgres do serviço e `--memory=512m`;
     - `migrate:wp` offline + admin de teste;
     - Playwright (projetos `desktop-chrome`, `desktop-safari`, `iphone`, `android`, `tablet`) com axe e visual;
     - k6 (carga leve) medindo memória do contêiner;
     - Trivy;
     - **push da imagem no GHCR só na `main`**: é a imagem que a VPS vai rodar.
   - **Removidos:** Storybook, Lighthouse dentro do CI (vai para o pós-deploy), Meilisearch.
   - `pos-deploy.yml` (novo): no evento `deployment_status` da Vercel (`success`) roda o smoke `@smoke`, links, cabeçalhos e `npx @lhci/cli autorun` contra a URL publicada.
8. **Windows:**
   - nada de `VAR=x comando` nos scripts do `package.json` (use `--env-file` do tsx/node ou defina dentro do script);
   - caminhos com `path.join`.
9. **Limpeza:**
   - `.env.example` só com o que existe;
   - README curto (o que é, como rodar, como publicar, onde está o plano);
   - ADR 0014 marcada "complementada pela 0015";
   - `gh pr close 1 -c "Fluxo é direto na main."`.

## Pronto quando

- CI verde no último commit, inclusive o job `conteiner`, com a imagem publicada no GHCR.
- `pnpm dev` funciona só com `apps/web/.env.local`; o deploy de homologação na Vercel fica **Ready**.
- "First Load JS" da home menor que o de partida (registrar os números).
- `git grep -n -i -E "meili|valkey|redis|umami|three|gsap|lenis|next-intl"` só aparece em ADRs históricas.

## Armadilhas

- **Payload muta `context`** em uploads: um objeto novo por chamada.
- **Ordem ao recriar as migrações:** gere a nova inicial **depois** de todas as mudanças de schema desta sessão. Mudanças das próximas sessões geram migrações incrementais (`migrate:create <nome>`), nunca editam a inicial.
