/**
 * Curadoria editorial de publicações públicas da Quarau e referências oficiais.
 *
 * Textos reescritos, sem cópia literal de posts; fonte e contexto em
 * content/social/EDITORIAL-SOURCES.md. Nenhuma foto de terceiros é baixada.
 * Cada notícia reutiliza a capa já cadastrada do projeto correspondente.
 * A execução é idempotente; edições no CMS nunca são sobrescritas.
 */
import { doc, p } from '../lib/lexical'

export type CuratedNewsSeed = {
  slug: string
  title: string
  summary: string
  projectSlug: string
  paragraphs: string[]
  sourceUrl?: string
}

export const curatedNews: CuratedNewsSeed[] = [
  {
    slug: 'educacao-ambiental-e-observacao-de-aves-no-ecomuseu',
    title: 'Observação de aves e educação ambiental no Ecomuseu',
    summary:
      'A atividade de observação de aves em São José dos Campos aproxima biodiversidade, território e educação ambiental no Ecomuseu dos Campos de São José.',
    projectSlug: 'ecomuseu-dos-campos-de-sao-jose',
    sourceUrl:
      'https://pt.linkedin.com/posts/quarau-91196b258_programapetrobrassocioambiental-educa%C3%A7%C3%A3oambiental-activity-7266902529056063489-Oc6B',
    paragraphs: [
      'Em 24 de novembro de 2024, o Centro Comunitário Alto da Ponte, em São José dos Campos, recebeu uma atividade de observação de aves vinculada ao Ecomuseu dos Campos de São José. A ação contou com a parceria do ICMBio e da APA Vale do Paraíba.',
      'A atividade integrou a programação de lançamento do livro APA Mananciais do Rio Paraíba do Sul: Biodiversidade e Recursos Hídricos do Vale do Paraíba Paulista.',
      'A Quarau destacou essa experiência ao apresentar o uso de metodologias ativas na consultoria e na gestão do Ecomuseu, projeto do Centro de Estudos da Cultura Popular (CECP) em parceria com o Programa Petrobras Socioambiental.',
    ],
  },
  {
    slug: 'jornada-formativa-ecomuseu-quarta-edicao',
    title: 'Ecomuseu prepara equipes para sua quarta edição',
    summary:
      'Jornada formativa reúne profissionais do Ecomuseu dos Campos de São José para ações culturais e socioambientais no território.',
    projectSlug: 'ecomuseu-dos-campos-de-sao-jose',
    paragraphs: [
      'O Ecomuseu dos Campos de São José realizou uma jornada formativa com profissionais contratados para sua quarta edição. A iniciativa é desenvolvida pelo CECP e atua na valorização do patrimônio cultural e ambiental das zonas leste e sudeste de São José dos Campos.',
      'Entre as frentes previstas na edição anunciada estavam plantio de árvores, hortas urbanas, compostagem comunitária, pesquisa sobre o sagui-da-serra-escuro (Callithrix aurita), feiras de saberes e fazeres e atividades de educação ambiental e patrimonial.',
      'Essas ações foram anunciadas como programação prevista, não como resultados já executados. A Quarau relatou atuação em gestão e coordenação de pesquisa na iniciativa, em parceria com o CECP.',
    ],
  },
  {
    slug: 'ecomuseu-mutirao-rio-alambari',
    title: 'Educação ambiental e cuidado com o Rio Alambari',
    summary:
      'Um mutirão com voluntários, estudantes e equipe do Ecomuseu recolheu resíduos na área de preservação permanente do Rio Alambari.',
    projectSlug: 'ecomuseu-dos-campos-de-sao-jose',
    paragraphs: [
      'Em uma ação divulgada pela Quarau durante o Dia Mundial da Limpeza de 2024, voluntários da Petrobras, estudantes, professores do Colégio Emak e integrantes da equipe do Ecomuseu participaram da limpeza de uma área de preservação permanente do Rio Alambari, em São José dos Campos.',
      'Segundo o relato publicado pela Quarau, foram recolhidos 221 kg de resíduos, em sua maior parte plásticos, da vegetação ciliar.',
      'Além da retirada dos materiais, o encontro foi tratado como uma atividade de educação ambiental baseada na participação direta e na relação das pessoas com o território.',
    ],
  },
  {
    slug: 'ecoe-verde-tecnologia-social-em-atibaia',
    title: 'Ecoe Verde: tecnologia social construída com a comunidade',
    summary:
      'A experiência do Ecoe Verde em Atibaia articula horta comunitária, educação e participação social na gestão de projetos socioambientais.',
    projectSlug: 'projeto-ecoe-verde',
    paragraphs: [
      'O projeto socioambiental Ecoe Verde foi realizado no bairro Esmeralda, em Atibaia, em uma parceria da Celeo com a organização da sociedade civil Espaço Crescer.',
      'A iniciativa transformou um terreno sem uso em uma horta comunitária agroecológica e pedagógica, articulada às atividades educativas e culturais do território.',
      'Em publicação no LinkedIn, a Quarau descreveu sua participação como consultora, em diálogo com as equipes de sustentabilidade e meio ambiente da Celeo e com a equipe técnica do Espaço Crescer.',
      'A experiência exemplifica uma característica das tecnologias sociais: construir soluções junto às comunidades, considerando conhecimento local e participação coletiva.',
    ],
  },
  {
    slug: 'quipa-formacao-jovens-quilombolas-piaui',
    title: 'Quipá: formação de jovens nas comunidades quilombolas do Piauí',
    summary:
      'Projeto Quipá articula formação, trabalho e saberes comunitários em Saco Curtume e Picos, no município de São João do Piauí.',
    projectSlug: 'projeto-quipa',
    paragraphs: [
      'O Projeto Quipá: jovens cultivando saberes, realizado pelo Instituto Umbuzeiro em parceria com a Celeo, desenvolve atividades com as comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí.',
      'Em janeiro de 2023, uma das atividades foi a oficina Trabalho, Igualdade de Gênero e Raça, voltada à formação de jovens para o mundo do trabalho.',
      'A Quarau divulgou a atividade em seu LinkedIn e registrou a participação na consultoria do programa, da seleção e acompanhamento de organizações à difusão de resultados.',
    ],
  },
  {
    slug: 'samba-de-bumbo-paulista-patrimonio-cultural',
    title: 'Samba de Bumbo Paulista: registro e documentação de uma tradição',
    summary:
      'O reconhecimento do Samba de Bumbo Paulista pelo IPHAN destaca a importância de pesquisas, registros e iniciativas de salvaguarda do patrimônio cultural.',
    projectSlug: 'inventario-cultural-e-dossie-de-registro',
    sourceUrl:
      'https://bcr.iphan.gov.br/acoes-de-salvaguarda/registro-do-samba-de-bumbo-paulista-como-patrimonio-cultural-do-brasil/',
    paragraphs: [
      'Em 9 de maio de 2024, o Conselho Consultivo do Patrimônio Cultural aprovou o registro do Samba de Bumbo Paulista como Patrimônio Cultural do Brasil, no Livro de Registro das Formas de Expressão.',
      'A Quarau participou, em parceria com o CECP e o IPHAN, do trabalho de pesquisa e elaboração de documentação vinculada ao processo de registro. A equipe também divulgou a produção audiovisual associada ao dossiê.',
      'O reconhecimento pertence à manifestação cultural e às comunidades que mantêm sua prática. O trabalho técnico de pesquisa contribui para documentar referências, histórias e modos de fazer, sem substituir o protagonismo dos grupos detentores.',
    ],
  },
]

/** Mantém a apresentação dos textos integralmente editável pelo Payload. */
export const curatedNewsStory = (item: CuratedNewsSeed) => [
  {
    blockType: 'richText',
    layout: 'narrow',
    body: doc(...item.paragraphs.map((paragraph) => p(paragraph))),
  },
]
