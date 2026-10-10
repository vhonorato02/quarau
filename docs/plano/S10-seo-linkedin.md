# S10 — SEO técnico, LinkedIn e redes

**Modelo:** `opus` · subagente `auditor-seo` · **Lê:** este arquivo + PROGRESSO + `docs/copy/palavras-chave.md` + `docs/copy/mensagem.md` · **Dono:** nada (o uso do kit é na S13)

## Objetivo

O site é entendido sem ambiguidade por Google, Bing, LinkedIn e buscadores com IA. A presença da Quarau no LinkedIn sai do perfil pessoal improvisado e vira uma página de empresa pronta para ser criada no go-live, com textos, imagens e os primeiros posts.

## Parte A — SEO técnico (no código, editável no CMS)

1. **Metadados vindos do CMS** em todas as rotas (S03):
   - título com modelo `%s — Quarau`;
   - descrição;
   - canonical absoluto;
   - OG/Twitter com imagem 1200×630 (a rota `/next/og` gera uma por página quando não houver imagem própria);
   - `og:locale pt_BR`.
2. **Dados estruturados (JSON-LD)**, um gerador por tipo, com teste de schema:
   - **Organization + ProfessionalService** (na home):
     - nome, logo, url;
     - `sameAs` (Instagram e a futura página do LinkedIn);
     - `contactPoint` (e-mail, telefones);
     - `areaServed`: só o que os fatos mostram (SP, PI…); endereço e CNPJ só se confirmados;
   - **BreadcrumbList** em todas as internas;
   - **Service** nas áreas de atuação;
   - **CreativeWork** nos cases (`about`, `locationCreated`, `sponsor`/`funder` = clientes e financiadores do case, `dateCreated`, `image`);
   - **NewsArticle** nas notícias;
   - **FAQPage** só onde houver perguntas visíveis na página.
3. **Sitemap e robots:**
   - sitemap só com publicados, `lastmod` real e imagens principais;
   - `robots` e `X-Robots-Tag` conforme `SITE_NOINDEX`;
   - 301 de todas as URLs antigas (`content/legacy/url-map.json`, já no `next.config`).
4. **`/llms.txt`:** resumo factual da Quarau (o que faz, para quem, áreas, cases com link, contato), gerado do CMS. Ajuda buscadores com IA a citar corretamente.
5. **Links internos:**
   - case ↔ área ↔ notícias relacionadas;
   - "projetos desta área" (S08);
   - âncoras descritivas, nada de "clique aqui".
6. **Imagens:** alt descritivo (S05/S06), nomes de arquivo legíveis no upload novo, dimensões e `loading` corretos (S02).
7. **Compartilhar** em cases e notícias: LinkedIn (`https://www.linkedin.com/sharing/share-offsite/?url=`), WhatsApp e copiar link. Sem scripts de terceiros.
8. **UTM:** convenção `?utm_source=linkedin&utm_medium=social&utm_campaign=<post>` para links que a Quarau publicar nas redes. Documentada em `docs/linkedin/README.md`.
9. `auditor-seo` em todas as URLs (local e, na S11, na homologação). Testes da camada 8 do QA verdes.

## Parte B — Kit do LinkedIn e do Instagram (`docs/linkedin/`)

> O LinkedIn atual (`/in/quarau-91196b258`) é um **perfil pessoal** com nome de empresa: isso fere as regras do LinkedIn e não aparece como empresa. O certo é uma **Página de empresa**, criada a partir do perfil de uma pessoa real (o dono ou o gestor) no go-live (S13).

1. `pagina-empresa.md`, com tudo pronto para colar:
   - nome;
   - URL pública sugerida (`linkedin.com/company/quarau`);
   - slogan (≤ 120 caracteres);
   - "Sobre" (≤ 2.000, a partir de `mensagem.md`);
   - site;
   - setor;
   - tamanho e tipo (`[CONFIRMAR]`);
   - sede (`[CONFIRMAR]`);
   - até 20 especialidades (das palavras-chave).
2. **Imagens geradas da marca** (script com `sharp`, sobre os SVGs de `packages/ui`): logo 400×400 PNG e capa 1128×191 (foto de projeto + logo, sem texto pequeno). Ficam em `docs/linkedin/`.
3. **6 posts de apresentação** (um por case) + **1 post de lançamento** do site novo, cada um com:
   - texto (gancho na 1ª linha, fatos do case, link com UTM, 3–5 hashtags);
   - imagem 1200×627 gerada do case (foto + título + marca);
   - data sugerida (1 por semana após o go-live).
4. **Migração do perfil pessoal:** passo a passo para avisar no perfil antigo, apontar para a página nova e, depois, renomear ou desativar o perfil (decisão do dono).
5. **Instagram:** bio (≤ 150 caracteres) com o link do site e textos para destaques (Projetos, Sobre, Contato).

## Pronto quando

- Testes de SEO verdes.
- `auditor-seo` sem pendências.
- `llms.txt` publicado.
- Kit do LinkedIn completo, com imagens geradas e revisadas pelo `revisor-copy`.
