# 0003 — Renderização: ISR sob demanda, sem banco no build

- **Status:** aceita · **Data:** 2026-10-05

## Contexto

A imagem Docker é construída no GitHub Actions, que não tem acesso ao banco de produção. `cacheComponents`
(PPR do Next 16) ainda tem incompatibilidades com o admin do Payload.

## Decisão

- As páginas não são pré-renderizadas no build (`generateStaticParams` retorna `[]`); cada rota é renderizada
  no primeiro acesso e fica em cache (ISR). O deploy faz _warm-up_ das URLs do sitemap.
- Consultas ao CMS passam por `unstable_cache` com **tags** (`collection:projects`, `global:footer`…);
  hooks `afterChange` do Payload chamam `revalidateTag(tag, { expire: 0 })`/`revalidatePath` → publicação aparece
  na hora. `/next/revalidate` (com segredo) permite invalidar tudo após migrações/restores.
- Draft mode (live preview) ignora o cache.
- `robots.txt`, `sitemap.xml` e o `X-Robots-Tag` são resolvidos em tempo de execução (variável `SITE_NOINDEX`),
  para o go-live não exigir novo build.

## Consequências

Primeira visita de cada página após deploy é um pouco mais lenta (mitigado pelo warm-up). Revisitar
`cacheComponents` quando o Payload declarar suporte.
