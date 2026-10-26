# 0021 — CSP sem nonce nas páginas estáticas

- **Status:** aceita (complementa a 0006)
- **Data:** 2026-10-26

## Contexto

A missão pede "CSP com nonce". A documentação do Next.js 16 instalada
(`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`) é explícita: _"you must use dynamic
rendering to add nonces"_ e _"when you use nonces in your CSP, all pages must be dynamically rendered"_. Isso
significa uma função serverless por visita na Vercel (com o Payload inicializando a frio e o Neon acordando depois de
5 min ocioso) e nenhum cache de página: contraria a meta de Lighthouse ≥ 95 e o plano gratuito. A alternativa
experimental (SRI) só cobre arquivos `<script src>`, não os scripts inline do RSC.

## Decisão

- Páginas públicas continuam **estáticas com revalidação sob demanda** (publicar no CMS atualiza na hora).
- CSP estrita em tudo, menos `script-src`, que aceita `'self' 'unsafe-inline'` (necessário para o payload inline do RSC).
- Compensações que fecham o risco de XSS que o nonce cobriria:
  - nenhum HTML vindo do CMS é injetado como HTML: rich text vira elementos React (sem `dangerouslySetInnerHTML`);
    o único `dangerouslySetInnerHTML` é o JSON-LD, serializado com `<` escapado;
  - upload não aceita SVG (pode carregar script);
  - nenhum script de terceiro antes do consentimento; origens permitidas listadas uma a uma (Turnstile, analytics
    configurado por env, Sentry);
  - `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'self'`, `upgrade-insecure-requests`.
- **Se** um dia houver conteúdo de terceiros incorporado, a CSP passa a nonce **só** nas rotas afetadas (proxy +
  renderização dinâmica naquela rota), sem tornar o site inteiro dinâmico.

## Consequências

- O Mozilla Observatory desconta pontos por `'unsafe-inline'`; o resultado medido fica em `docs/qa/depois/`.
- A decisão é revista se o Next passar a suportar nonce em páginas estáticas.
