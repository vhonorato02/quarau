# Arquitetura

> Como o site da Quarau é montado e por quê. Decisões em [decisions/](decisions/) (ADRs 0016–0021 são as atuais).

## 1. Visão geral

Um único app Next.js 16 com o Payload CMS 3 embutido (`apps/web`): o site público, o painel `/admin` e a API
`/api` saem do mesmo processo e do mesmo banco Postgres. Tudo que é externo (banco, mídia, e-mail, antispam,
erros, analytics) entra por variável de ambiente, para rodar igual no plano gratuito de hoje e na VPS de amanhã
([ADR 0019](decisions/0019-free-tier-portavel.md)).

```
navegador ──▶ Vercel (homologação)  ou  Caddy ▶ contêiner (VPS)
                  │                              │
                  └────────── Next.js 16 + Payload 3 (apps/web) ──────────┐
                               │            │             │               │
                         Postgres       Mídia S3       SMTP/Resend    Turnstile / Sentry
                    (Neon | compose)  (R2 | disco)    (opcional)      (opcionais)
```

## 2. Camadas do código (`apps/web/src`)

Dependências só apontam para baixo: `app` → `components` → `server` → `cms`/`lib`.

| Camada   | Pasta                                                                        | O que tem                                                                                                                                                          | Regra                                                                                          |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Rotas    | `app/(frontend)`, `app/(payload)`, `app/next`, `app/sitemap.ts`, `robots.ts` | páginas finas: buscam o documento, montam metadados, entregam aos componentes                                                                                      | sem regra de negócio                                                                           |
| UI       | `components/` (`site/`, `blocks/`)                                           | cabeçalho, rodapé, consentimento, um componente por bloco do CMS                                                                                                   | **nenhum texto literal** (`react/jsx-no-literals` + `tools/qa/hardcoded.mjs`); tudo vem do CMS |
| Serviços | `server/`                                                                    | consultas com cache por tag (`queries.ts`), contato (`contact/service.ts` + `action.ts`), SEO, e-mail, armazenamento, limitador, Turnstile, `env` validado com Zod | `server-only`; I/O isolado atrás de funções injetáveis                                         |
| Conteúdo | `cms/`                                                                       | coleções, globais, blocos, campos, permissões, hooks de revalidação, componentes do painel                                                                         | esquema = migrações versionadas                                                                |
| Puro     | `lib/`                                                                       | URLs, redirects, sitemap/robots, normalização, Lexical → texto, esquema do formulário                                                                              | sem I/O; testado em `tests/unit`                                                               |

Design system em `packages/ui` (tokens Tailwind 4 `@theme`, base e componentes `q-*`; ver [DESIGN.md](DESIGN.md)).
E-mails em `packages/emails` (React Email).

## 3. Modelo de conteúdo

- **Coleções:** Páginas (montadas com blocos; inclui as listagens Projetos, Atuação e Notícias), Projetos (ficha +
  história em blocos), Áreas de atuação, Notícias, Parceiros e clientes, Mídias, Contatos recebidos, Usuários,
  Redirecionamentos (plugin).
- **Globais:** Menu principal, Rodapé, Contato e dados da empresa, Redes sociais, SEO e compartilhamento,
  **Textos do site** (todo texto de interface: rótulos, botões, erros, cookies, 404…).
- **Blocos:** 18, um por padrão do design system (abertura com lente, lista de projetos, número em destaque, ciclo,
  áreas, texto, texto com foto, citação, imagem, galeria, vídeo, publicações, ODS, chamada, formulário, notícias…).
  No editor, cada bloco aparece com nome e título ("03 Lista de projetos — Projetos"), nunca "Sem título".
- **Rascunho, publicação e agendamento** em Páginas, Projetos, Áreas e Notícias (versões + `schedulePublish`).
- **Campo vazio = oculto.** Nada é inventado para preencher layout ([CONTENT-TODO.md](CONTENT-TODO.md)).

## 4. Renderização e cache

- Páginas públicas são renderizadas na primeira visita e ficam em cache; publicar no CMS invalida as tags do
  documento, da coleção e do sitemap na hora (`cms/hooks/revalidate.ts`). Revalidação de segurança: 24 h.
- Modo rascunho (`/next/preview`, só com sessão do painel) ignora o cache e alimenta o live preview.
- Imagens: o Payload gera tamanhos WebP no upload; o site usa `<img srcset>` direto do armazenamento
  (`components/Img.tsx`). Nenhum processamento de imagem por visita, em nenhum host.
- Busca: campo oculto `searchText` sem acentos, atualizado ao salvar; consulta `like` no Postgres.

## 5. Segurança

- Login do painel: senha ≥ 12 caracteres, bloqueio após 5 tentativas por 15 min, sessão de 8 h, cookie
  `HttpOnly`/`SameSite=Lax`/`Secure` em produção, CSRF e CORS restritos ao domínio do site.
- Papéis com menor privilégio: **admin** (tudo, inclusive usuários), **editor** (cria, edita e publica conteúdo),
  **autor** (cria rascunhos e edita os próprios; não publica). Matriz testada em `tests/int`.
- Formulário: Zod no servidor, honeypot, limite por IP (3/min, 20/dia, IP guardado só como hash), Turnstile,
  consentimento obrigatório e base legal exibida. E-mail é melhor-esforço: a mensagem fica salva mesmo se o envio falhar.
- Cabeçalhos: CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
  COOP. CSP sem nonce nas páginas estáticas: ver [ADR 0021](decisions/0021-csp-sem-nonce-nas-paginas-estaticas.md).
- Upload: só JPEG, PNG, WebP, AVIF, GIF, MP4, WebM e PDF (sem SVG). GraphQL desligado.
- Segredos só em variáveis de ambiente (Vercel, GitHub Secrets, `site config` na VPS). `.env.example` documenta todas.
- Dependências: `pnpm audit --prod --audit-level=high` bloqueia o CI; CodeQL em cada push.

## 6. Ambientes

|           | Dev (Windows, sem Docker)              | CI                    | Homologação                  | Produção (após o aceite)       |
| --------- | -------------------------------------- | --------------------- | ---------------------------- | ------------------------------ |
| App       | `pnpm dev`                             | contêiner da imagem   | Vercel Hobby `gru1`          | contêiner GHCR na VPS (`site`) |
| Banco     | `pnpm db:local` (Postgres 17 embutido) | serviço `postgres:17` | Neon Free                    | Postgres do compose do site    |
| Mídia     | disco (`apps/web/media`)               | disco                 | Cloudflare R2                | Cloudflare R2 (mesmo bucket)   |
| Indexação | `SITE_NOINDEX=true`                    | `true`                | `true`                       | `false`                        |
| Tarefas   | processo local                         | —                     | GitHub Actions a cada 15 min | fila no próprio processo       |

## 7. Pipeline (`.github/workflows/ci.yml`)

Todos bloqueantes, em cada push na `main`:

1. formato (Prettier), lint (inclui "zero texto literal"), tipos, testes unitários, auditoria de dependências,
   verificação de textos fora do CMS;
2. integração do Payload com Postgres real (permissões, rascunho/publicação, agendamento, seed idempotente);
3. build da imagem Docker → sobe com Postgres de serviço → migrações + seed offline → e2e Playwright (site e
   painel) com axe → Lighthouse CI (meta 95 nas 4 categorias) → varredura de segurança → publicação no GHCR
   (tag = SHA; tags `vX.Y.Z` geram release).

O deploy da homologação é o Git da Vercel (push na `main`). A migração para a VPS está em
[MIGRACAO-VPS.md](MIGRACAO-VPS.md).

## 8. Operação

- `GET /api/health` responde banco e armazenamento (200/503); usado pelo Docker, pelo `site` e por uptime.
- Logs JSON (pino) na saída padrão; erros no Sentry quando `SENTRY_DSN` existe.
- Backup: Neon tem histórico próprio; na VPS, `restic` da plataforma + `pg_dump` (MIGRACAO-VPS.md §Backup).
