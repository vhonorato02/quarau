# S05 — Conteúdo completo: site antigo, todas as mídias e redes sociais

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO + `content/legacy/scrape/RELATORIO.md` + `content/social/README.md`
· **Dono:** 🔑 baixar as exportações do Instagram e do LinkedIn (10 min + espera do e-mail)

## Objetivo

Tudo o que a Quarau já publicou entra no novo CMS:

- as 265 mídias da biblioteca e os vídeos;
- os textos do site antigo;
- os posts das redes que valem notícia, como rascunhos para o gestor aprovar.

## Já pronto (2026-10-10)

- **Raspagem completa** do site antigo, versionada em `content/legacy/scrape/` (`pnpm --filter @quarau/web scrape:wp`):
  - 12 páginas renderizadas, com capturas de desktop e celular;
  - textos em Markdown por página;
  - manifesto de 271 mídias (tamanho, dimensões, sha256, onde é usada);
  - contatos e redes;
  - `RELATORIO.md`;
  - `COBERTURA.md`: 30 de 46 frases do site antigo já estão no conteúdo novo; as 16 restantes são checklist da S06.
- **Leitor das exportações oficiais das redes** (`pnpm --filter @quarau/web social:parse`), testado. Gera `content/social/posts.json` e `POSTS.md`.

## Passos

1. **Re-raspar** (rápido, usa o cache):
   - `pnpm --filter @quarau/web scrape:wp --com-videos` baixa os vídeos para o cache se ainda não estiverem;
   - conferir `RELATORIO.md`.
2. **Biblioteca inteira:** em `scripts/migrate-wp.ts`, depois do conteúdo, importar todo item de `content/legacy/scrape/midias.json` ainda sem `legacyUrl`:
   - alt text = alt do WP; senão o título do WP tratado; senão um alt contextual com `needsReview: true`;
   - legenda = legenda do WP; crédito quando o nome do arquivo indicar (ex.: Fabio Bueno);
   - vídeos convertidos para 720p com ffmpeg (já existe `prepareVideo`); a duplicata `QUIPA_LEG_PORT-1.mp4` é ignorada;
   - continua **idempotente**: rodar duas vezes não duplica.
   - Rodar no dev; conferir as contagens no admin (≈ 265 imagens + 3 vídeos + logos).
3. **Logos dos parceiros:**
   - maior versão disponível no cache ou no WP;
   - quem não tem logo (Espaço Crescer, Instituto Umbuzeiro) aparece como nome em texto, com o mesmo peso visual;
   - `[CONFIRMAR]`: pedir os logos em vetor ao cliente.
4. 🔑 **Redes sociais:**
   - pedir ao dono as exportações (passo a passo em `content/social/README.md`). Enquanto o e-mail não chega, siga os outros passos e volte aqui depois;
   - com os `.zip` extraídos em `content/social/entrada/`: `pnpm --filter @quarau/web social:parse`;
   - revisar `POSTS.md`;
   - para cada post `noticia` (não repetido), criar **rascunho** de Notícia com:
     - título;
     - resumo;
     - corpo **reescrito como matéria**, só com os fatos do post. A S06 dá o acabamento de voz; aqui é estrutura e fatos;
     - capa e galeria (mídias do post);
     - `relatedProjects` sugeridos;
     - `source` (rede, link, data original);
     - data de publicação = data do post;
     - categoria Notícia ou Evento.
   - Posts `nota-curta` viram, quando fizer sentido, um item de "Linha do tempo" do projeto relacionado; os `descartar` são ignorados.
   - Script `scripts/social/import-news.ts` (idempotente por `source.externalId`), com teste de integração.
5. **Seções vazias:**
   - Notícias e Vagas somem do menu, do rodapé e do sitemap quando não houver nada publicado;
   - a página direta mostra estado vazio com `noindex`.
   - Com os posts das redes, Notícias passa a ter conteúdo depois da aprovação do gestor.

## Pronto quando

- Contagens no admin batem com `midias.json`.
- O import repetido não duplica.
- Notícias em rascunho = candidatos de `POSTS.md` (ou registrado em PROGRESSO que as exportações ainda não chegaram).
- CI verde; PROGRESSO marcado.

## Armadilhas

- `content/social/entrada/` nunca vai para o git (tem mensagens privadas). Confira `git status` antes de cada commit.
- Mídias do LinkedIn vêm com URLs assinadas que expiram: baixe logo após receber o export.
