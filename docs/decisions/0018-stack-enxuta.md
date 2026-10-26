# 0018 — Stack enxuta: o que sai e o que fica

- **Status:** aceita (substitui as partes de stack das ADRs 0007, 0011 e 0012)
- **Data:** 2026-10-26

## Contexto

A autocrítica ([AUTOCRITICA.md](../AUTOCRITICA.md)) mediu peso de JS e encontrou dependências sem uso real para um
site institucional de ~15 páginas: hero 3D (three.js + React Three Fiber), GSAP, Lenis (sequestra a rolagem),
`motion`, Meilisearch, Valkey, next-intl com dois idiomas desligados, Vercel Blob (API proprietária), Storybook,
Umami. Cada um é código, configuração, variável e risco a mais.

## Decisão

**Fica:** Next.js 16 (App Router, RSC) + Payload CMS 3 no mesmo app; PostgreSQL; Tailwind CSS 4; Zod; React Email;
Sentry (opcional por env); Playwright, Vitest, axe.

**Sai:** three, @react-three/fiber, gsap, @gsap/react, lenis, motion, meilisearch, iovalkey, next-intl e a
localização do Payload (só pt-BR; tabelas `_locales` somem), @payloadcms/storage-vercel-blob, Storybook, Umami,
coleções sem conteúdo nem plano (Equipe, Vagas, Documentos).

**Substitui:**

| Antes | Agora |
| --- | --- |
| Meilisearch | busca no Postgres com `unaccent` + `ILIKE` em campos indexados (site pequeno; nada a sincronizar) |
| Valkey (rate limit, cache) | limitador em memória atrás de uma interface (`RateLimiter`); troca por Postgres/Valkey sem tocar no domínio |
| Vercel Blob | S3 genérico (Cloudflare R2 em produção; disco local em dev), ADR 0019 |
| Animações GSAP/Lenis/motion | CSS (uma animação: a lente da home), `prefers-reduced-motion` respeitado |
| i18n | pt-BR fixo; `lang="pt-BR"` |

## Consequências

- First Load JS medido antes e depois (AUTOCRITICA.md e `docs/qa/`).
- Migração inicial do banco recriada do zero (não existe banco de produção).
- Se um dia houver inglês, a localização do Payload volta como decisão nova, com conteúdo para justificar.
