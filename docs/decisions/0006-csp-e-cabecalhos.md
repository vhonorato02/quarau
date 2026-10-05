# 0006 — Content-Security-Policy compatível com ISR

- **Status:** aceita · **Data:** 2026-10-05

## Contexto
CSP com *nonce* obriga toda página a ser renderizada dinamicamente (o nonce muda a cada requisição), anulando o
cache ISR (ver 0003). O Next.js injeta scripts inline (payload RSC).

## Decisão
CSP restritiva em tudo, exceto `script-src 'self' 'unsafe-inline'` (+ Turnstile/Umami): `default-src 'self'`,
`object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'self'` (live preview do CMS),
`frame-src` só para Turnstile/YouTube-nocookie/Vimeo/OpenStreetMap, `upgrade-insecure-requests`.
Também: HSTS (2 anos, preload), `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `COOP`.
O site não renderiza HTML de terceiros nem conteúdo de usuários sem escape (rich text é renderizado como JSX).

## Consequências
Rever quando o Next oferecer hashes automáticos para scripts inline em páginas estáticas (SRI experimental).
