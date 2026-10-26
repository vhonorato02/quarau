# S03 — Tudo editável no CMS

**Modelo:** `opus` · **Lê:** este arquivo + PROGRESSO · **Dono:** nada

## Objetivo

**Nenhum texto que aparece no site fica preso no código.** O gestor muda qualquer frase, título, botão, mensagem de erro, aviso de cookies, e-mail automático e SEO pelo painel, sem pedir a ninguém. Uma regra de lint garante que isso não regrida.

## Inventário do que hoje está fora do CMS (auditoria de 2026-10-10)

- **82 textos de interface** em `src/i18n/messages/pt.json`: menu, botões, busca, formulário (rótulos, ajudas, erros, sucesso), cookies, 404/500, projetos, notícias e vagas.
- **Cabeçalhos das páginas de listagem** escritos no código: Projetos, Atuação (`eyebrow="Atuação"`, `title="Áreas de atuação"`), Notícias (`"Conteúdo"`), Trabalhe conosco (`"Carreiras"`), Busca e "O que entregamos" em `atuacao/[slug]`.
- **Faixa de CTA do rodapé** ("Vamos tirar o seu projeto do papel") em `components/site/Footer.tsx`.
- **Rótulos do bloco de contato** ("E-mail", "Telefone / WhatsApp", "Localização") em `components/blocks/ContactForm.tsx`.
- **E-mails automáticos** (`packages/emails`): assunto, saudação e corpo.
- **Painel de boas-vindas do admin** (`components/admin/Welcome.tsx`): a S04 transforma em painel com conteúdo editável.

## Passos

1. **Global "Textos do site"** (`site-texts`):
   - abas por área: Geral, Navegação, Projetos, Notícias e vagas, Busca, Contato e formulário, Cookies e privacidade, Erros;
   - um campo por chave atual do `pt.json`, com rótulo humano e **descrição de onde aparece**;
   - padrões = os textos atuais;
   - o helper `t()` da S02 passa a ler este global (cache com tag `global:site-texts`, revalidado ao salvar), com o `pt.json` como reserva caso o banco falhe.
   - Teste: toda chave usada por `t()` existe no global.
2. **Páginas de listagem viram páginas do CMS:**
   - Projetos, Atuação, Notícias, Trabalhe conosco, Busca e Contato passam a ser documentos de `Páginas` (slug fixo, protegido contra exclusão), com hero, introdução, SEO e blocos livres antes e depois da lista;
   - a lista em si é um bloco ("Lista de projetos", "Lista de áreas", "Lista de notícias", "Lista de vagas", "Resultados da busca");
   - as rotas especiais leem a página pelo slug;
   - o menu passa a apontar só para páginas, sem link "externo" para rota interna (fecha o C3 do relatório).
3. **Rodapé e CTA:**
   - o global `footer` ganha a faixa de CTA (título, texto, botão, link) e a opção "ocultar nesta página" por página;
   - a página Contato vem com a faixa oculta.
4. **E-mails editáveis:**
   - global "E-mails automáticos" com assunto e corpo (texto simples com variáveis `{{nome}}`, `{{assunto}}`, `{{mensagem}}`) para:
     - aviso à equipe;
     - confirmação ao visitante;
     - convite de usuário (S04);
     - redefinição de senha.
   - Os templates React Email usam esses textos.
   - Teste de renderização com variáveis.
5. **SEO em tudo:**
   - todas as páginas, projetos, áreas e notícias têm a aba SEO (título ≤ 60, descrição 120–160, imagem OG) com contador de caracteres e prévia;
   - os padrões vêm do global "SEO e configurações".
6. **Notícias prontas para os posts das redes** (S05):
   - `gallery` (lista de mídias);
   - grupo `source` (rede, link original, id externo, data original), oculto no site exceto o link "Publicado originalmente no Instagram/LinkedIn";
   - `relatedProjects` já existe.
   - Migração incremental `migrate:create noticias-redes`.
7. **Trava contra regressão:**
   - ESLint `react/jsx-no-literals` (`noStrings: true`, permitindo só pontuação e símbolos) em `src/components/**` e `src/app/(frontend)/**`;
   - `pnpm lint` passa a falhar se alguém escrever texto visível no JSX;
   - exceções só com comentário justificando (ex.: nomes de marca em SVG `<title>`).
8. **Seed:**
   - `scripts/content/*.ts` passa a popular também os globais novos e as páginas de listagem;
   - o import continua idempotente.

## Pronto quando

- `pnpm lint` sem violações de `jsx-no-literals`.
- Teste E2E "editar texto": o editor muda um texto de cada tipo (botão do menu, mensagem de sucesso do formulário, título da página Projetos, CTA do rodapé, assunto do e-mail de confirmação), publica, e o site e o e-mail (capturado em teste) mostram o novo texto em segundos.
- Migração incremental aplicada no dev; CI verde; PROGRESSO marcado.

## Armadilhas

- Não duplicar fonte de verdade: se o texto está no global, **apague** do `pt.json`. O `pt.json` sobra só como reserva gerada a partir do global (script `texts:snapshot`).
- Rótulos e descrições do admin também em português claro, porque o gestor não é técnico. Ex.: "Texto do botão principal do topo do site", e não "headerCta".
