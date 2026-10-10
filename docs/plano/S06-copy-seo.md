# S06 — Copy e SEO editorial: cada texto à altura da empresa

**Modelo:** `opus` (escrita) · subagente `revisor-copy` · **Lê:** este arquivo + PROGRESSO + `content/legacy/scrape/paginas/*.md`

- `content/legacy/scrape/COBERTURA.md` + `content/social/POSTS.md` · **Dono:** 🔑 aprovar o pacote de textos num lote (30–60 min)

## Objetivo

Textos claros, específicos e verdadeiros, com a voz da Quarau, que convencem empresas, instituições públicas e o terceiro setor e que aparecem no Google para o que a Quarau faz. Tudo aprovado pelo dono antes de entrar no site, e tudo editável depois (S03).

## Passos

1. **Fundação de mensagem** (`docs/copy/`):
   - `voz-e-tom.md`:
     - **quem fala:** consultoria experiente, próxima do território;
     - **como:** frases curtas, verbos concretos, voz ativa, norma culta, linguagem inclusiva, termos corretos para comunidades (quilombolas, povos tradicionais), siglas explicadas na primeira vez;
     - **o que evitar:** jargão vazio ("soluções inovadoras", "excelência"), superlativos sem prova, clichês de ESG;
     - **exemplos** de antes/depois com frases reais do site antigo.
   - `mensagem.md` (casa de mensagem):
     - posicionamento em 1 frase;
     - 3 pilares: atuação em todas as etapas do projeto, presença no território e resultados medidos;
     - provas por pilar (números e cases do portfólio, com fonte);
     - públicos (empresas com investimento social/ESG, instituições públicas e culturais, organizações sociais) e o que cada um precisa ouvir.
2. **Pesquisa de palavras-chave sem ferramenta paga** (`docs/copy/palavras-chave.md`):
   - para cada área de atuação e serviço, colete as sugestões do Google:

     ```bash
     curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&q=<termo>"
     ```

     variando com "como", "o que é", "empresa de", "consultoria em", "+ São Paulo/Vale do Paraíba";

   - inclua os termos institucionais certos: inventário de referências culturais (INRC), dossiê de registro IPHAN, educação patrimonial, investimento social privado, elaboração e gestão de projetos culturais/socioambientais, edital e chamada pública, monitoramento e avaliação, ODS;
   - para cada página: 1 palavra-chave principal + 2–4 secundárias + a intenção de busca. Sem canibalização (duas páginas não disputam o mesmo termo);
   - concorrentes: veja as 5 primeiras posições de cada termo principal (títulos, estrutura, profundidade) e registre o que fazer melhor.
3. **Pacote de textos por página** (`docs/copy/paginas/<pagina>.md`). Para cada página:
   - objetivo, público e palavra-chave;
   - H1, linha fina, todas as seções na ordem (título, texto, CTA), microtextos (botões, estados vazios, mensagens do formulário);
   - SEO: título ≤ 60 caracteres, descrição 120–160, texto do OG e **alt de cada imagem**.
   - **Fatos só das fontes:** `content/legacy/scrape/`, `content/social/`, `scripts/content/` e respostas do dono. O que faltar é `[CONFIRMAR]` e fica oculto.
   - Cobrir **cada frase** de `COBERTURA.md`: reescrita, descartada de propósito (com motivo) ou `[CONFIRMAR]`.
   - **Cases de projeto** com estrutura de case: contexto do território → desafio → o que a Quarau fez (por etapa) → resultados (números com fonte) → parceiros → citação (só se existir).
   - **Notícias vindas das redes** (rascunhos da S05): reescritas como matéria (título informativo, lide com quem/o quê/onde/quando, contexto do projeto, link para o case).
   - **Páginas novas que a palavra-chave pedir e os fatos sustentarem:** "Como trabalhamos" (as etapas, que já existem) e "Perguntas frequentes" (só perguntas cuja resposta está nos fatos; com `[CONFIRMAR]` onde precisar do cliente).
4. **Revisão em duas passadas:**
   - **(a) `revisor-copy`:** subagente com a rubrica abaixo, que devolve correções linha a linha;
   - **(b) automática:** `scripts/qa/copy-check.ts` passa cada texto pelo LanguageTool pt-BR (`https://api.languagetool.org/v2/check`, gratuito, respeite ~20 req/min) e pelas regras próprias:
     - sem "Lorem", "TODO", "[CONFIRMAR]" em campo publicado;
     - títulos e descrições no tamanho;
     - alt em toda imagem;
     - siglas explicadas.
   - **Rubrica (nota 1–5 cada; publicar só com ≥ 4 em todas):** clareza, especificidade (fatos e números), credibilidade (fonte), voz, ação (o próximo passo está claro?), SEO natural (palavra-chave sem forçar), correção gramatical.
5. 🔑 **Aprovação em um lote:**
   - gerar `docs/copy/APROVACAO.md` (índice com cada página, os textos lado a lado antigo → novo e a lista `[CONFIRMAR]` com perguntas objetivas para o cliente);
   - pedir ao dono para ler e responder com "aprovado" ou com os ajustes;
   - aplicar os ajustes e repetir só nos trechos alterados.
6. **Carregar:**
   - atualizar `scripts/content/*.ts` (fonte do seed) e os globais de texto;
   - aplicar no banco de dev com o import idempotente;
   - o que o gestor já tiver editado no CMS **não** é sobrescrito (o import compara `updatedAt` e marca conflito em PROGRESSO).
7. **Opcional (🔑, 5 min):** chave da Resend. O dono cria em resend.com/api-keys e cola em **Vercel → quarau → Settings → Environment Variables** como `RESEND_API_KEY` (Production e Preview). Nunca no chat.

## Pronto quando

- `docs/copy/` completo e aprovado ("aprovado" do dono registrado em PROGRESSO com a data).
- `copy-check` sem erros.
- `COBERTURA.md` com todas as frases decididas.
- Textos no CMS de dev; capturas das páginas revisadas pelo `qa-visual` (texto cabendo no layout, sem viúvas feias em títulos).
