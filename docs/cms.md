# Guia do painel (CMS) — para quem edita o site

Este guia é para a equipe da Quarau, sem nenhum conhecimento técnico. O painel fica em
**`/admin`** (ex.: `https://quarau.com.br/admin`).

> Regra de ouro: **nada vai para o ar sem você clicar em “Publicar”**. Tudo o que você digita fica salvo
> como rascunho automaticamente, e você pode visualizar antes de publicar.

---

## 1. Entrar no painel

1. Acesse `/admin` e informe e-mail e senha.
2. Esqueceu a senha? Use “Esqueci minha senha” (o e-mail precisa estar configurado) ou peça ao administrador.
3. Por segurança, a conta é bloqueada por 15 minutos após 5 tentativas erradas.

### Quem pode fazer o quê

| Papel             | Pode                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Administrador** | Tudo, inclusive criar usuários, configurações, redirecionamentos e excluir contatos. |
| **Editor**        | Criar, editar, **publicar** e excluir conteúdo; ver os contatos recebidos.           |
| **Autor**         | Criar e editar **rascunhos** de projetos e notícias. Um editor revisa e publica.     |

---

## 2. O menu do painel

- **Conteúdo:** Páginas, Áreas de atuação, **Projetos (cases)**, Notícias e Vagas.
- **Institucional:** Equipe, Parceiros e clientes.
- **Biblioteca:** Mídias (fotos e vídeos), Documentos e downloads (PDFs).
- **Relacionamento:** Contatos recebidos pelo formulário do site.
- **Configurações do site:** Menu principal, Rodapé, Contato, Redes sociais, SEO e configurações gerais,
  Redirecionamentos.
- **Configurações:** Usuários.

---

## 3. Adicionar um novo projeto ao portfólio (o mais importante)

1. Vá em **Projetos (cases) → Criar novo**.
2. Aba **Resumo**:
   - **Nome do projeto**, **Resumo** (1–2 frases que aparecem nos cards e no Google).
   - **Imagem de capa** (obrigatória): use uma foto horizontal, de pelo menos 1600 px de largura. Ao enviar,
     clique na imagem para marcar o **ponto focal** (o que não pode ser cortado: um rosto, por exemplo).
   - **Cliente / realizador, Local, Ano de início e Ano de término** (deixe o término vazio se estiver em andamento).
   - **Papel da Quarau** (ex.: “Gestão de equipes e relatórios técnicos”).
   - **Parceiros e financiadores** e **Áreas de atuação**: escolha da lista (as áreas viram filtros do portfólio).
   - **ODS atendidos**, **Território** (latitude/longitude, opcional) e **Destacar na home**.
   - **Cor de destaque da página**: azul, verde ou azul-escuro (sempre dentro da marca).
3. Aba **Conteúdo**:
   - **Resultados em números** (até 4): só números comprovados, por exemplo “1.913 — pessoas beneficiadas diretamente”.
   - **Texto do projeto**: use os botões de negrito, listas e títulos. Não é possível mudar cores ou fontes; isso
     é proposital, para o site manter a identidade.
   - **Citação em destaque** (opcional).
   - **Capítulos da história** (opcional): monte uma narrativa intercalando blocos de texto, imagem + texto,
     números, galeria, vídeo, linha do tempo, depoimentos e ODS.
   - **Publicações e links**: livros, relatórios ou PDFs externos (com capa, se houver).
4. Aba **Mídia**: **Vídeo** (MP4) e **Galeria de fotos** (selecione várias de uma vez).
5. Aba **SEO**: título e descrição para o Google e para o compartilhamento no WhatsApp/LinkedIn. Os botões
   “Gerar automaticamente” preenchem a partir do nome, resumo e capa, e a pré-visualização mostra como fica.
6. Clique em **Visualizar** (ou abra o **Live preview**) para ver o projeto exatamente como ficará no site, em
   celular, tablet e computador.
7. Clique em **Publicar alterações**. Pronto: o projeto aparece no portfólio, na busca, no sitemap e, se
   marcado, na home, em poucos segundos.

### Boas práticas de fotos

- **Texto alternativo é obrigatório.** Descreva a cena para quem não enxerga: “Jovens plantam mudas na horta
  comunitária do Bairro Esmeralda, em Atibaia”. Evite “foto 1”.
- Informe o **crédito** do fotógrafo quando souber.
- Imagens marcadas com **“Texto alternativo precisa de revisão”** vieram do site antigo com descrição
  automática. Revise-as quando puder (filtre a lista de Mídias por esse campo).
- Formatos: JPG, PNG, WebP, AVIF ou SVG. O sistema converte e gera todos os tamanhos automaticamente.

---

## 4. Editar páginas (Início, Sobre, Contato…)

Cada página é uma pilha de **blocos**. Clique em **Adicionar bloco** e escolha:

| Bloco                     | Para quê                                                         |
| ------------------------- | ---------------------------------------------------------------- |
| Destaque (Hero)           | Abertura da página, com título grande, imagem e botões           |
| Frase de impacto          | Manifesto que se revela durante a rolagem                        |
| Texto                     | Conteúdo corrido com títulos e listas                            |
| Imagem + texto            | Foto ao lado de um texto curto                                   |
| Números                   | Indicadores (16 mil, 1.913…), com fonte/período                  |
| Linha do tempo            | Marcos ou etapas (ex.: “Como trabalhamos”)                       |
| Galeria / Vídeo           | Fotos em mosaico ou carrossel; vídeo enviado ou do YouTube/Vimeo |
| Projetos (cases)          | Destaques, mais recentes ou escolhidos à mão                     |
| Áreas de atuação          | Cards das áreas                                                  |
| Depoimentos               | Falas de parceiros (apenas autorizadas por escrito)              |
| Parceiros e clientes      | Faixa de logos                                                   |
| ODS / Equipe / Documentos | Objetivos, pessoas, downloads                                    |
| Perguntas frequentes      | Acordeão, que também aparece como FAQ no Google                  |
| Mapa                      | Mapa (carrega só quando o visitante clica)                       |
| Formulário de contato     | O formulário oficial do site                                     |
| Chamada para ação         | Faixa com convite e botões                                       |

- Arraste os blocos para reordenar; use o menu ⋯ para duplicar ou remover.
- Cada bloco tem **“Fundo da seção”** (branco, cinza-claro, azul ou azul-escuro). As cores do texto se ajustam sozinhas
  para manter a leitura acessível.
- A página com endereço **`inicio`** é a home.
- Para criar uma página nova (ex.: “Metodologia”): Páginas → Criar novo → blocos → publicar. Depois adicione-a no
  **Menu principal**, se quiser.

---

## 5. Rascunho, agendamento e histórico

- **Salvamento automático:** enquanto você edita, as mudanças ficam como rascunho.
- **Agendar:** no botão de publicar, escolha **Agendar publicação** e defina data e hora. Também é possível
  agendar a despublicação.
- **Versões:** na aba **Versões** você compara qualquer versão anterior com a atual e pode **restaurá-la**.
- **Despublicar:** use “Despublicar” para tirar do ar sem apagar.

---

## 6. Menu, rodapé, contato e redes

- **Menu principal:** até 7 itens e o botão de destaque (“Fale com a Quarau”).
- **Rodapé:** frase institucional e colunas de links.
- **Contato:** e-mail, telefones (marque “WhatsApp” se o número atender), endereço, CNPJ, horário, **assuntos
  do formulário** e **quem recebe as mensagens**.
- **Redes sociais:** Instagram, LinkedIn etc.
- **SEO e configurações gerais:** descrição padrão, imagem padrão de compartilhamento, dados da organização para
  o Google, ID do Umami (estatísticas) e um **aviso no topo** do site, se necessário.

---

## 7. Contatos recebidos (formulário)

- Cada mensagem chega por e-mail para os destinatários configurados e fica em **Relacionamento → Contatos recebidos**.
- Atualize a **Situação** (Novo → Em atendimento → Respondido → Arquivado) e use **Anotações internas**.
- São dados pessoais (LGPD): não exporte nem compartilhe sem necessidade e exclua quando não forem mais necessários
  (só administradores podem excluir).

---

## 8. Redirecionamentos

Se mudar o endereço (slug) de uma página ou projeto, crie um **Redirecionamento** (Configurações do site →
Redirecionamentos) do endereço antigo para o novo (tipo 301). Os endereços do site WordPress antigo já estão
redirecionados automaticamente.

---

## 9. Dúvidas frequentes

- **Publiquei e não apareceu.** Aguarde alguns segundos e recarregue. Confira se clicou em “Publicar alterações”
  (e não só salvou rascunho).
- **A foto ficou cortada errada.** Abra a mídia e reposicione o ponto focal.
- **Quero um layout diferente.** Os blocos foram desenhados para manter a marca; peça um bloco novo ao time técnico.
- **Inglês/espanhol?** O site já está preparado: no topo de cada documento há o seletor de idioma
  (Português/English/Español). As versões em outros idiomas são ligadas pelo time técnico quando o conteúdo estiver traduzido.
