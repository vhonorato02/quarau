# Inventário de conteúdo — quarau.com.br (WordPress)

Levantamento feito em **2026-10-05** por scraping do HTML público, dos sitemaps (Yoast) e da API
`wp-json` (aberta). O WordPress não foi alterado; ele serviu apenas de fonte. Os arquivos brutos estão
em [`content/legacy/`](../content/legacy).

## 1. Stack do site antigo

| Item          | Valor                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| CMS           | WordPress, tema **BeTheme** (Muffin Builder) e Slider Revolution 6.6           |
| Plugins vistos | Yoast SEO, LiteSpeed Cache, Smush, Contact Form 7, WPForms, MonsterInsights, Site Kit, WP Mail SMTP, Akismet |
| Analytics     | Google Analytics (gtag via MonsterInsights/Site Kit)                           |
| Formulário    | Contact Form 7: nome, e-mail, assunto e mensagem                               |
| Idioma        | pt-BR                                                                          |

## 2. Páginas e URLs (base dos redirects 301)

| URL antiga                                      | Tipo      | Conteúdo                                       | URL nova                                         |
| ----------------------------------------------- | --------- | ---------------------------------------------- | ------------------------------------------------ |
| `/`                                             | página    | O que é / O que faz a Quarau, galeria e logos de parceiros | `/`                                     |
| `/sobre-a-quarau/`                              | página    | Missão, Visão, Valores, projetos e formulário  | `/sobre`                                         |
| `/contato/`                                     | página    | Formulário e dados de contato                  | `/contato`                                       |
| `/hello-world/`                                 | post      | Post padrão do WordPress (sem valor)           | `/noticias` (não migrado)                        |
| `/category/uncategorized/`                      | categoria | Vazia                                          | `/noticias`                                      |
| `/portfolio-item/ecomuseu-dos-campos-…/`        | projeto   | Ecomuseu dos Campos de São José                | `/projetos/ecomuseu-dos-campos-de-sao-jose`      |
| `/portfolio-item/inventario-cultural-…/`        | projeto   | INRC Congado Paulista + Dossiê Samba de Bumbo  | `/projetos/inventario-cultural-e-dossie-de-registro` |
| `/portfolio-item/programa-celeo-…-projeto-ecoe/` | projeto  | Projeto Ecoe Verde                             | `/projetos/projeto-ecoe-verde`                   |
| `/portfolio-item/programa-celeo-…-projeto-quipa/` | projeto | Projeto Quipá                                  | `/projetos/projeto-quipa`                        |
| `/portfolio-item/programa-de-educacao-patrimonial-…/` | projeto | Programa de Educação Patrimonial (PEP)   | `/projetos/programa-de-educacao-patrimonial`     |
| `/portfolio-item/projeto-de-memoria-institucional-…/` | projeto | Memória Institucional do Museu do Folclore | `/projetos/memoria-institucional-museu-do-folclore` |
| `/wp-content/uploads/*`                         | mídia     | 275 arquivos                                   | 301 dinâmico para a mídia migrada                |

O mapa completo, usado pelo script de migração e pelos testes E2E, está em
[`content/legacy/url-map.json`](../content/legacy/url-map.json).

## 3. Mídia

- **275 arquivos** na biblioteca (269 públicos via API e mais 6 referenciados só no HTML): 232 JPEG,
  31 PNG, 2 GIF e **4 vídeos MP4** (≈1,2 GB no total, sendo ≈1,19 GB de vídeo).
- Nenhuma imagem tinha **texto alternativo**. A migração gera um alt descritivo provisório a partir do
  contexto (projeto e legenda do arquivo) e marca o item para revisão editorial.
- Vídeos: `Video_Final.mp4` (Ecomuseu, o único incorporado no site), `ECOEVERDE_5MIN_LEG_PORT.mp4`
  e `QUIPA_LEG_PORT.mp4` (duplicado em `-1`). Os dois últimos estavam na biblioteca, mas não
  apareciam em nenhuma página. Foram associados aos projetos Ecoe e Quipá pelo nome do arquivo `[CONFIRMAR]`.
- Arquivos de demonstração do tema (`home_company3_*`, `logotipo.png` da “Magano Design”) não
  fazem parte da marca e não foram migrados como conteúdo.

## 4. Quem é a Quarau (síntese para o copy)

**Razão de ser (texto do site):** “empresa de consultoria em projetos educativos, culturais e
socioambientais que tem experiência consolidada nas várias etapas que compõem um projeto, desde a sua
concepção, prospecção, seleção, planejamento, execução, monitoramento, controle, encerramento,
promoção e difusão.”

**Para quem:** empresas, instituições públicas e organizações do terceiro setor, com projetos em
territórios urbanos e rurais e para instituições locais, regionais ou nacionais.

**Como:** metodologias adequadas a cada contexto, com identificação das potencialidades dos
territórios e das instituições, e articulação de atores sociais em torno dos ODS.

**Missão, visão e valores:** transcritos integralmente da página “Sobre” (ver `content/legacy/html`).

### Frentes de atuação (derivadas dos projetos publicados, sem extrapolação)

1. **Projetos socioambientais e investimento social privado**: concepção, editais, prospecção e
   seleção de OSCs, monitoramento e avaliação (Programa Celeo na Comunidade: Ecoe e Quipá).
2. **Patrimônio cultural e pesquisa**: inventários (INRC), dossiês de registro de patrimônio
   imaterial e memória institucional (IPHAN, Museu do Folclore).
3. **Educação patrimonial e ambiental**: coordenação e gestão de programas educativos (PEP da
   Fundação Cassiano Ricardo e Ecomuseu).
4. **Gestão e difusão de projetos**: gerenciamento de equipes, articulação de parceiros, relatórios
   técnicos, publicações e difusão audiovisual.

### Números confirmados no site atual

| Dado                                                            | Fonte              |
| --------------------------------------------------------------- | ------------------ |
| ~16 mil pessoas mobilizadas na 3ª edição do Ecomuseu (2021–2023) | página Ecomuseu    |
| 1.913 beneficiários diretos e 7.652 indiretos em 1 ano (Ecoe)     | página Ecoe        |
| Atuação junto ao CECP desde 2015                                 | página Ecomuseu    |
| INRC do Congado Paulista (2015–2017)                             | página Inventário  |
| Dossiê do Samba de Bumbo Paulista (2019–2023)                    | página Inventário  |
| PEP da Fundação Cassiano Ricardo (2015–2016)                     | página PEP         |
| Pesquisa de memória institucional do Museu do Folclore (2020)    | página Memória     |
| 6 projetos publicados                                            | portfólio          |

> A certificação de **Tecnologia Social da Fundação Banco do Brasil** foi concedida ao **CECP**
> pelo projeto Ecomuseu, e não à Quarau. O copy novo mantém essa atribuição.

### Clientes e parceiros citados

CECP (Centro de Estudos da Cultura Popular), Petrobras (Programa Petrobras Socioambiental), IPHAN,
Fundação Cultural Cassiano Ricardo, Celeo (e Cantareira Transmissora de Energia), Espaço Crescer e
Instituto Umbuzeiro. A faixa de logos da home também exibia **Magano Design, Brand** `[CONFIRMAR]`
(pode ser a agência responsável pela marca, não um cliente).

### Publicações (links externos, Calaméo)

- Dossiê/Livro (Inventário IPHAN): <https://www.calameo.com/read/00101267291cf3c0365a8>
- _O Museu do Folclore de São José dos Campos: Uma Breve História_: <https://www.calameo.com/read/0010126728ee98dee91fd>
- _O Saber e o Fazer no Museu do Folclore_: <https://www.calameo.com/read/0010126729c18ce8ecbfb>
- _O Saber e o Fazer no Museu do Folclore II_: <https://www.calameo.com/read/001012672b53578957aa2>

### ODS por projeto (lidos das imagens oficiais publicadas)

| Projeto  | ODS                       |
| -------- | ------------------------- |
| Ecomuseu | 4, 11, 12, 13, 16, 17     |
| Ecoe     | 1, 2, 4, 5, 8, 12         |
| Quipá    | 1, 2, 4, 5, 8             |

### Contato

- **E-mail:** contato@quarau.com.br
- **Telefones/WhatsApp:** (12) 98281-3669 e (12) 98264-5960
- **Cidade:** São José dos Campos, SP (sem endereço completo publicado) `[CONFIRMAR]`
- **Instagram:** <https://www.instagram.com/quarau.consultoria/>
- **LinkedIn:** <https://www.linkedin.com/in/quarau-91196b258/> (perfil pessoal, não página de empresa) `[CONFIRMAR]`

### Tom de voz observado

Institucional, técnico e sóbrio, com vocabulário de gestão de projetos e políticas culturais (ODS,
patrimônio imaterial, biointeração, territórios). O copy novo mantém esse registro, com frases mais
curtas, verbos de ação e foco em resultado.

## 5. Lacunas (não publicadas no site atual)

Equipe, CNPJ, endereço completo, ano de fundação, depoimentos, notícias, vagas, documentos para
download, política de privacidade e créditos fotográficos. Tudo isso está na lista `[CONFIRMAR]` do
relatório final. As coleções correspondentes já existem no CMS e ficam vazias ou ocultas até serem
preenchidas.
