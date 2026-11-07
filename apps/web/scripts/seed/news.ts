/**
 * Curadoria editorial de publicações públicas da Quarau e referências oficiais.
 *
 * Textos reescritos, sem cópia literal de posts; fonte e contexto em
 * content/social/EDITORIAL-SOURCES.md. Nenhuma foto de terceiros é baixada.
 * A capa é a do projeto só quando a foto mostra o próprio assunto; senão a matéria sai sem capa
 * (`noCover`), para nunca ilustrar um fato com a foto de outro evento ou de outro bem cultural.
 * A execução é idempotente; edições no CMS nunca são sobrescritas.
 *
 * Regra editorial: só vai ao ar (`published`) o que tem fonte conferível listada em `verifiedBy`.
 * O que depende de post não recuperável entra como rascunho, com `pendingCheck` dizendo o que o
 * dono precisa confirmar antes de publicar no painel.
 */
import { doc, p } from '../lib/lexical'

export type CuratedNewsSeed = {
  slug: string
  title: string
  summary: string
  projectSlug: string
  paragraphs: string[]
  /** Link público de origem, mostrado na matéria. Nunca um perfil pessoal. */
  sourceUrl?: string
  /** Onde cada fato do texto foi conferido (site antigo, post público, página oficial). */
  verifiedBy: string[]
  /** `draft`: fica no painel, fora do site, até alguém confirmar `pendingCheck`. */
  status?: 'published' | 'draft'
  /** Sem foto autorizada do assunto: a matéria sai sem capa em vez de usar a foto de outro bem. */
  noCover?: boolean
  pendingCheck?: string
  /** Data do fato (AAAA-MM-DD), quando conferida na fonte; sem ela vale a data de publicação no site. */
  date?: string
}

const LEGACY = 'https://quarau.com.br/portfolio-item/'

export const curatedNews: CuratedNewsSeed[] = [
  {
    slug: 'educacao-ambiental-e-observacao-de-aves-no-ecomuseu',
    date: '2024-11-24',
    title: 'Observação de aves e educação ambiental no Ecomuseu',
    summary:
      'A atividade de observação de aves em São José dos Campos aproxima biodiversidade, território e educação ambiental no Ecomuseu dos Campos de São José.',
    projectSlug: 'ecomuseu-dos-campos-de-sao-jose',
    noCover: true,
    sourceUrl:
      'https://pt.linkedin.com/posts/quarau-91196b258_programapetrobrassocioambiental-educa%C3%A7%C3%A3oambiental-activity-7266902529056063489-Oc6B',
    verifiedBy: [
      'Post público da Quarau no LinkedIn (activity-7266902529056063489), conferido em 06/11/2026',
      `${LEGACY}ecomuseu-dos-campos-de-sao-jose-cecp-petrobras-socioambiental/`,
    ],
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
    noCover: true,
    verifiedBy: [
      'Confirmado pelo dono (via Zé) em 07/11/2026: jornada formativa, frentes da 4ª edição e papel da Quarau',
      `${LEGACY}ecomuseu-dos-campos-de-sao-jose-cecp-petrobras-socioambiental/`,
    ],
    paragraphs: [
      'O Ecomuseu dos Campos de São José realizou uma jornada formativa com os profissionais contratados para a sua quarta edição. A iniciativa é desenvolvida pelo CECP e valoriza o patrimônio cultural e ambiental das zonas leste e sudeste de São José dos Campos.',
      'A edição prevê plantio de árvores, hortas urbanas, compostagem comunitária, pesquisa sobre o sagui-da-serra-escuro (Callithrix aurita), feiras de saberes e fazeres e atividades de educação ambiental e patrimonial.',
      'A Quarau atua na gestão e na coordenação de pesquisa do Ecomuseu, em parceria com o CECP.',
    ],
  },
  {
    slug: 'ecomuseu-mutirao-rio-alambari',
    date: '2024-09-21',
    title: 'Educação ambiental e cuidado com o Rio Alambari',
    summary:
      'Um mutirão com voluntários, estudantes e equipe do Ecomuseu recolheu resíduos na área de preservação permanente do Rio Alambari.',
    projectSlug: 'ecomuseu-dos-campos-de-sao-jose',
    noCover: true,
    verifiedBy: [
      'Confirmado pelo dono (via Zé) em 07/11/2026: data, participantes e 221 kg de resíduos',
    ],
    paragraphs: [
      'No Dia Mundial da Limpeza de 2024, voluntários da Petrobras, estudantes, professores do Colégio Emak e a equipe do Ecomuseu limparam uma área de preservação permanente do Rio Alambari, em São José dos Campos.',
      'Foram recolhidos 221 kg de resíduos da vegetação ciliar, a maior parte plásticos.',
      'Além da retirada dos resíduos, o mutirão foi uma atividade de educação ambiental, baseada na participação direta e na relação das pessoas com o território.',
    ],
  },
  {
    slug: 'ecoe-verde-tecnologia-social-em-atibaia',
    title: 'Ecoe Verde: horta comunitária e cultura no Bairro Esmeralda',
    summary:
      'Em Atibaia, o Projeto Ecoe Verde transformou um terreno sem uso em horta comunitária agroecológica e ponto de cultura, com consultoria da Quarau no programa.',
    projectSlug: 'projeto-ecoe-verde',
    verifiedBy: [`${LEGACY}programa-celeo-na-comunidade-projeto-ecoe/`, 'docs/QUARAU.md §2'],
    paragraphs: [
      'O Projeto Ecoe Verde é uma iniciativa da Celeo e do Espaço Crescer, realizada desde março de 2022 no Bairro Esmeralda, também conhecido como Tanque, uma região periférica de Atibaia (SP) por onde passa a linha de transmissão da Cantareira Transmissora de Energia.',
      'Com o projeto, um terreno sem uso se tornou uma horta comunitária agroecológica e pedagógica e também um ponto de cultura para a comunidade local.',
      'Segundo os dados divulgados no portfólio da Quarau, em seu primeiro ano o projeto alcançou cerca de 7.652 pessoas, entre as quais 1.913 foram beneficiadas diretamente.',
      'A Quarau atua como consultora do Programa Celeo na Comunidade, do qual o Ecoe Verde faz parte. A execução no território é do Espaço Crescer.',
    ],
  },
  {
    slug: 'quipa-formacao-jovens-quilombolas-piaui',
    title: 'Quipá: jovens cultivando saberes nas comunidades quilombolas do Piauí',
    summary:
      'O Projeto Quipá, da Celeo e do Instituto Umbuzeiro, atua com as comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí, com consultoria da Quarau no programa.',
    projectSlug: 'projeto-quipa',
    verifiedBy: [`${LEGACY}programa-celeo-na-comunidade-projeto-quipa/`, 'docs/QUARAU.md §2'],
    paragraphs: [
      'O Projeto Quipá: jovens cultivando saberes é uma iniciativa da Celeo e do Instituto Umbuzeiro, desenvolvida nas comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí, região de abrangência da usina fotovoltaica da Celeo.',
      'O projeto se organiza em torno da Casa do Mel, da Casa de Farinha e de outras unidades de compartilhamento, colocando em prática o que o líder e escritor quilombola Antônio Bispo dos Santos, um dos idealizadores do Instituto Umbuzeiro, chamou de biointeração.',
      'A Quarau atuou como consultora em todas as etapas do programa: elaboração de edital, prospecção de organizações, avaliação, seleção, monitoramento, finalização e difusão audiovisual.',
    ],
  },
  {
    slug: 'samba-de-bumbo-paulista-patrimonio-cultural',
    date: '2024-05-09',
    title: 'Samba de Bumbo Paulista: registro e documentação de uma tradição',
    summary:
      'O reconhecimento do Samba de Bumbo Paulista pelo IPHAN destaca a importância de pesquisas, registros e iniciativas de salvaguarda do patrimônio cultural.',
    projectSlug: 'inventario-cultural-e-dossie-de-registro',
    noCover: true,
    sourceUrl:
      'https://bcr.iphan.gov.br/acoes-de-salvaguarda/registro-do-samba-de-bumbo-paulista-como-patrimonio-cultural-do-brasil/',
    verifiedBy: [
      'Página oficial do IPHAN (registro aprovado em 09/05/2024, Livro das Formas de Expressão), conferida em 06/11/2026',
      `${LEGACY}inventario-cultural-e-dossie-de-registro-cecp-iphan-instituto-do-patrimonio-historico-artistico-nacional/`,
    ],
    paragraphs: [
      'Em 9 de maio de 2024, o Conselho Consultivo do Patrimônio Cultural aprovou o registro do Samba de Bumbo Paulista como Patrimônio Cultural do Brasil, no Livro de Registro das Formas de Expressão.',
      'Contratada pelo CECP, a Quarau coordenou a pesquisa e a elaboração do Dossiê do Samba de Bumbo Paulista, trabalho ligado ao processo de registro conduzido pelo IPHAN.',
      'O reconhecimento pertence à manifestação cultural e às comunidades que mantêm sua prática. O trabalho técnico de pesquisa contribui para documentar referências, histórias e modos de fazer, sem substituir o protagonismo dos grupos detentores.',
    ],
  },
  {
    slug: 'cortejo-da-cavalaria-patrimonio-cultural',
    date: '2026-09-22',
    title: 'Cortejo da Cavalaria de Guaratinguetá é patrimônio cultural do Brasil',
    summary:
      'O IPHAN registrou o Cortejo da Cavalaria de São Gonçalo e São Benedito como patrimônio cultural do Brasil. A Quarau entregou o dossiê de registro, em parceria com o CECP e o IPHAN.',
    projectSlug: 'inventario-cultural-e-dossie-de-registro',
    noCover: true,
    sourceUrl:
      'https://www.gov.br/iphan/pt-br/assuntos/noticias/cortejo-da-cavalaria-de-sao-goncalo-e-sao-benedito-de-guaratingueta-sp-e-reconhecido-como-patrimonio-cultural',
    verifiedBy: [
      'Nota oficial do IPHAN de 22/09/2026 (114ª reunião do Conselho Consultivo, Livro de Registro das Celebrações), conferida em 07/11/2026',
      'Post público da Quarau no LinkedIn (activity-7510477602730725377): entrega do dossiê na parceria com CECP e IPHAN, conferido em 07/11/2026',
      'https://bcr.iphan.gov.br/acoes-de-salvaguarda/registro-do-cortejo-da-cavalaria-de-sao-goncalo-e-sao-benedito-de-guaratingueta-sp-como-patrimonio-cultural-do-brasil/',
    ],
    paragraphs: [
      'Em 22 de setembro de 2026, o Conselho Consultivo do Patrimônio Cultural aprovou, em sua 114ª reunião, o registro do Cortejo da Cavalaria de São Gonçalo e São Benedito, de Guaratinguetá (SP), como patrimônio cultural do Brasil. A celebração será inscrita no Livro de Registro das Celebrações.',
      'Todo Domingo de Páscoa, cerca de dois mil cavaleiros vestidos de branco percorrem aproximadamente 20 km em duas filas, com paradas nos cemitérios para homenagear os cavaleiros já falecidos. O cortejo reúne duas tradições: os saberes do caminho, ligados aos tropeiros do Vale do Paraíba, e os saberes do Rosário, de origem afro-brasileira e ligados à Irmandade de São Benedito.',
      'A Quarau entregou o dossiê de registro do Cortejo no âmbito da parceria com o Centro de Estudos da Cultura Popular (CECP) e o IPHAN. O reconhecimento pertence aos cavaleiros, à Associação Cavalaria de São Gonçalo e São Benedito e às famílias que mantêm a celebração viva.',
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
