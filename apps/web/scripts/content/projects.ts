/**
 * Projetos migrados de quarau.com.br/portfolio-item/*.
 * Copy reescrito a partir exclusivamente do texto publicado no site antigo.
 * Itens marcados com [CONFIRMAR] estão listados em docs/relatorio-final.md.
 */
import { doc, h, p, quote } from '../lib/lexical'

const U = 'https://quarau.com.br/wp-content/uploads/'

export type ProjectSeed = {
  legacySlug: string
  slug: string
  title: string
  summary: string
  client: string
  location: string
  startYear?: number
  endYear?: number
  role: string
  partners: string[] // partner keys (see partners.ts)
  services: string[] // service slugs
  ods: number[]
  featured: boolean
  accent: 'blue' | 'green' | 'dark'
  coordinates?: { lat: number; lng: number }
  highlights?: Array<{ value: string; label: string }>
  quote?: { text: string; source: string }
  body: ReturnType<typeof doc>
  cover: string
  video?: string
  gallery: string[]
  publications?: Array<{ label: string; url: string; cover?: string }>
  chapters?: Array<Record<string, unknown>>
}

export const projects: ProjectSeed[] = [
  {
    legacySlug: 'ecomuseu-dos-campos-de-sao-jose-cecp-petrobras-socioambiental',
    slug: 'ecomuseu-dos-campos-de-sao-jose',
    title: 'Ecomuseu dos Campos de São José',
    summary:
      'Desde 2015, a Quarau elabora os projetos, gerencia as equipes e conduz pesquisas e relatórios técnicos do Ecomuseu, iniciativa do CECP com o Programa Petrobras Socioambiental. A terceira edição mobilizou cerca de 16 mil pessoas.',
    client: 'CECP — Centro de Estudos da Cultura Popular',
    location: 'São José dos Campos (SP)',
    startYear: 2015,
    endYear: 2023,
    role: 'Elaboração de projetos, gestão de equipes, articulação de parceiros, pesquisa e relatórios técnicos',
    partners: ['cecp', 'petrobras'],
    services: ['projetos-socioambientais', 'educacao-patrimonial-e-ambiental', 'gestao-e-difusao'],
    ods: [4, 11, 12, 13, 16, 17],
    featured: true,
    accent: 'blue',
    coordinates: { lat: -23.1896, lng: -45.8841 },
    highlights: [{ value: '16 mil', label: 'pessoas mobilizadas na 3ª edição (2021–2023)' }],
    body: doc(
      p(
        'A Quarau é contratada pelo ',
        { text: 'Centro de Estudos da Cultura Popular (CECP)', bold: true },
        ' desde 2015 para conduzir o Ecomuseu dos Campos de São José de ponta a ponta: elaboração dos projetos, gerenciamento das equipes, articulação de parceiros, realização de pesquisas e produção de relatórios técnicos.',
      ),
      p(
        'O Ecomuseu é realizado pelo CECP em parceria com a Petrobras, por meio do Programa Petrobras Socioambiental. Na terceira edição, entre 2021 e 2023, o projeto mobilizou cerca de 16 mil pessoas.',
      ),
      p(
        'A iniciativa rendeu ao CECP a certificação de instituição desenvolvedora de ',
        { text: 'Tecnologia Social', bold: true },
        ', concedida pela Fundação Banco do Brasil (FBB).',
      ),
    ),
    cover: `${U}2018/06/2.jpg`,
    video: `${U}2023/12/Video_Final.mp4`,
    gallery: [
      `${U}2023/12/04_09_2023_Roda-de-conversa_CSJ_Maria-8-1.jpg`,
      `${U}2023/12/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-31.jpg`,
      `${U}2023/12/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-145.jpg`,
      `${U}2023/12/06_02_2023_Roda_de_Conversa_Nucleo_Ingrid-3.jpg`,
      `${U}2023/12/06_05_2023_Feira-de-Saberes-e-Fazeres_Maria-9.jpg`,
      `${U}2023/12/DSC03990.jpg`,
      `${U}2023/12/WhatsApp-Image-2022-01-15-at-16.37.54-1.jpg`,
      `${U}2023/12/IMG_1380_2.jpg`,
      `${U}2023/12/WhatsApp-Image-2023-11-23-at-15.32.163.jpeg`,
      `${U}2023/12/Screenshot-2023-12-02-164440-1.png`,
      `${U}2023/12/A0.png`,
    ],
  },
  {
    legacySlug:
      'inventario-cultural-e-dossie-de-registro-cecp-iphan-instituto-do-patrimonio-historico-artistico-nacional',
    slug: 'inventario-cultural-e-dossie-de-registro',
    title: 'Inventário Cultural e Dossiê de Registro',
    summary:
      'Aplicação do Inventário Nacional de Referências Culturais (INRC) do Congado Paulista e coordenação da pesquisa do Dossiê de Registro do Samba de Bumbo Paulista como Patrimônio Cultural Imaterial Brasileiro, em parceria com o IPHAN.',
    client: 'CECP — Centro de Estudos da Cultura Popular',
    location: 'Estado de São Paulo',
    startYear: 2015,
    endYear: 2023,
    role: 'Aplicação do INRC, coordenação de pesquisa e elaboração do dossiê de registro',
    partners: ['cecp', 'iphan'],
    services: ['patrimonio-cultural-e-pesquisa'],
    ods: [],
    featured: true,
    accent: 'dark',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    body: doc(
      p(
        'A Quarau foi contratada pelo CECP para aplicar o ',
        {
          text: 'Inventário Nacional de Referências Culturais (INRC) do Congado Paulista',
          bold: true,
        },
        ' (2015–2017) e para coordenar a pesquisa e elaborar o ',
        { text: 'Dossiê de Registro do Samba de Bumbo Paulista', bold: true },
        ' como Patrimônio Cultural Imaterial Brasileiro (2019–2023).',
      ),
      p(
        'As duas pesquisas foram realizadas em parceria com o Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN), de acordo com o Decreto nº 3.551, de agosto de 2000, que institui o registro de bens culturais de natureza imaterial.',
      ),
    ),
    chapters: [
      {
        blockType: 'timeline',
        eyebrow: 'Linha do tempo',
        heading: 'Duas pesquisas, um mesmo compromisso com o patrimônio imaterial',
        tone: 'alt',
        items: [
          {
            period: '2015–2017',
            title: 'INRC do Congado Paulista',
            description: 'Aplicação do Inventário Nacional de Referências Culturais.',
          },
          {
            period: '2019–2023',
            title: 'Dossiê do Samba de Bumbo Paulista',
            description:
              'Coordenação da pesquisa e elaboração do dossiê de registro como Patrimônio Cultural Imaterial Brasileiro.',
          },
        ],
      },
    ],
    cover: `${U}2023/12/IMG-20211010-WA0003-scaled.jpeg`,
    gallery: [
      `${U}2023/11/1.1.133-Apresentacao-20231118-195024.jpg`,
      `${U}2023/11/2.0.1B-36-Terno-de-Congo-de-Sainhas-Irmaos-Paiva-20231118-195026.jpg`,
      `${U}2023/11/23826251_10208072580452599_7012661833098756994_o-20231118-195027.jpg`,
      `${U}2023/11/23845864_10208072896260494_1379668490107092426_o-20231118-195028.jpg`,
      `${U}2023/11/23847257_10208072590572852_3161924133479159687_o-20231118-195030.jpg`,
      `${U}2023/11/23916463_10208072890700355_7288444022268777658_o-20231118-195031.jpg`,
      `${U}2023/11/23926264_10208072576852509_5947567710325815158_o-20231118-195034.jpg`,
      `${U}2023/11/24059404_10208072574372447_291366456064669096_o-20231118-195035.jpg`,
      `${U}2023/12/20211010_172948-scaled-e1702478816508.jpg`,
      `${U}2023/12/IMG-20210517-WA0024.jpg`,
      `${U}2023/12/IMG-20211012-WA0016.jpg`,
      `${U}2023/12/IMG-20211012-WA0017.jpg`,
    ],
    publications: [
      {
        label: 'Livro da pesquisa — leitura on-line (Calaméo)',
        url: 'https://www.calameo.com/read/00101267291cf3c0365a8',
        cover: `${U}2023/12/Screenshot-2023-12-13-101508.png`,
      },
    ],
  },
  {
    legacySlug: 'programa-celeo-na-comunidade-projeto-ecoe',
    slug: 'projeto-ecoe-verde',
    title: 'Projeto Ecoe Verde',
    summary:
      'Um terreno inativo no Bairro Esmeralda, em Atibaia (SP), virou horta comunitária agroecológica e pedagógica e ponto de cultura. Em um ano, 1.913 pessoas foram beneficiadas diretamente e cerca de 7.652 indiretamente.',
    client: 'Celeo — Programa Celeo na Comunidade',
    location: 'Bairro Esmeralda (Tanque), Atibaia (SP)',
    startYear: 2022,
    role: 'Consultoria no Programa Celeo na Comunidade',
    partners: ['celeo', 'espaco-crescer'],
    services: ['projetos-socioambientais', 'educacao-patrimonial-e-ambiental'],
    ods: [1, 2, 4, 5, 8, 12],
    featured: true,
    accent: 'green',
    coordinates: { lat: -23.1171, lng: -46.5563 },
    highlights: [
      { value: '1.913', label: 'pessoas beneficiadas diretamente em um ano' },
      { value: '7.652', label: 'pessoas impactadas indiretamente' },
    ],
    body: doc(
      p(
        'O ',
        { text: 'Projeto Ecoe Verde', bold: true },
        ' é uma iniciativa da Celeo e do Espaço Crescer, realizada desde março de 2022 em uma região periférica de Atibaia conhecida como Bairro Esmeralda, ou Tanque.',
      ),
      p(
        'O território é um dos atravessados pela linha de transmissão da Cantareira Transmissora de Energia. Com o projeto, um terreno inativo se tornou uma horta comunitária agroecológica e pedagógica e um ponto de cultura para toda a comunidade.',
      ),
      p(
        'Em apenas um ano, o projeto beneficiou diretamente 1.913 pessoas e impactou indiretamente cerca de 7.652.',
      ),
    ),
    cover: `${U}2023/12/09_02_2023_Visita_Atibaia_Tati_2.jpg`,
    video: `${U}2023/12/ECOEVERDE_5MIN_LEG_PORT.mp4`,
    gallery: [
      `${U}2023/12/09_02_2023_Visita_Atibaia_Tati_2-1.jpg`,
      `${U}2023/12/20230209_115108-1.jpg`,
      `${U}2023/12/IMG_6072-1.jpg`,
      `${U}2023/12/IMG_6100-1.jpg`,
      `${U}2023/12/IMG_6016-1.jpg`,
      `${U}2023/12/IMG_6139-1.jpg`,
      `${U}2023/12/IMG_6121.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_5-1.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_7-1.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_8-1.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_9.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_10.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_12.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_13-1.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_16.jpg`,
      `${U}2023/12/09_02_2023_Visita_Atibaia_Fabio_17.jpg`,
      `${U}2023/12/20230209_114736-1.jpg`,
      `${U}2023/12/20230209_115058.jpg`,
      `${U}2023/12/IMG_6065-e1702422858774.jpg`,
      `${U}2023/12/IMG_6075.jpg`,
      `${U}2023/12/IMG_6164-e1702422836724.jpg`,
      `${U}2023/12/IMG_6259.jpg`,
      `${U}2023/12/IMG_6209.jpg`,
    ],
    chapters: [
      {
        blockType: 'gallery',
        eyebrow: 'Território',
        heading: 'Da área inativa à horta comunitária',
        layout: 'carousel',
        tone: 'default',
        images: [
          `${U}2023/12/Projeto-Ecoe-Localizacao.jpg`,
          `${U}2023/12/3-Horta-Vila-Esmeralda.jpg`,
          `${U}2023/12/3-Areas-produtivas-horta-Vila-Esmeralda.jpg`,
          `${U}2023/12/3-Instituicoes-parceiras.jpg`,
        ],
      },
    ],
  },
  {
    legacySlug: 'programa-celeo-na-comunidade-projeto-quipa',
    slug: 'projeto-quipa',
    title: 'Projeto Quipá: jovens cultivando saberes',
    summary:
      'Iniciativa da Celeo e do Instituto Umbuzeiro nas comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí (PI). A Quarau atuou como consultora em todas as etapas do programa, do edital à difusão audiovisual.',
    client: 'Celeo — Programa Celeo na Comunidade',
    location: 'Saco Curtume e Picos, São João do Piauí (PI)',
    role: 'Consultoria em todas as etapas: edital, prospecção de ONGs, avaliação, seleção, monitoramento, finalização e difusão audiovisual',
    partners: ['celeo', 'instituto-umbuzeiro'],
    services: ['projetos-socioambientais', 'gestao-e-difusao'],
    ods: [1, 2, 4, 5, 8],
    featured: true,
    accent: 'dark',
    coordinates: { lat: -8.3581, lng: -42.2467 },
    quote: {
      text: '[…] a partir da confluência e da interlocução entre a perspectiva desenvolvimentista e as experiências da biointeração.',
      source: 'Projeto Quipá',
    },
    body: doc(
      p(
        'O ',
        { text: 'Projeto Quipá: jovens cultivando saberes', italic: true },
        ' é uma iniciativa da Celeo e do Instituto Umbuzeiro desenvolvida nas comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí, região de abrangência da usina fotovoltaica empreendida pela Celeo.',
      ),
      p(
        'A Quarau atuou como empresa consultora em todas as etapas do Programa: elaboração do edital, prospecção de ONGs, avaliação, seleção, monitoramento, finalização e difusão audiovisual.',
      ),
      h('h3', 'Biointeração na prática'),
      p(
        'Com a Casa do Mel, a Casa de Farinha e outras Unidades de Compartilhamento, o projeto coloca em prática o que o líder e escritor quilombola Antônio Bispo dos Santos, um dos idealizadores do Instituto Umbuzeiro, chamou de biointeração.',
      ),
      p(
        'Em seu livro ',
        { text: 'Colonização, Quilombos, Modos e Significações', italic: true },
        ', ele descreve a farinhada como exemplo dessa prática:',
      ),
      quote(
        '“Além da pescaria, também podemos apresentar uma organização própria dos quilombos e dos povos indígenas e que quase todas as pessoas que moram nessas comunidades conhecem e participam: a estrutura orgânica social de uma casa de farinha.”',
      ),
    ),
    cover: `${U}2023/12/IMG_7251.jpg`,
    video: `${U}2023/12/QUIPA_LEG_PORT.mp4`,
    gallery: [
      `${U}2023/12/20230425_192633-1-scaled.jpg`,
      `${U}2023/12/MVI_6620.00_35_42_10.Quadro002.jpg`,
      `${U}2023/12/IMG_8365.jpg`,
      `${U}2023/12/IMG_8309.jpg`,
      `${U}2023/12/IMG_8298.jpg`,
      `${U}2023/12/IMG_8279.jpg`,
      `${U}2023/12/Image16-scaled.jpg`,
      `${U}2023/12/IMG_8186.jpg`,
      `${U}2023/12/IMG_8180.jpg`,
      `${U}2023/12/IMG_8093.jpg`,
      `${U}2023/12/IMG_8088.jpg`,
      `${U}2023/12/IMG_8044.jpg`,
      `${U}2023/12/IMG_7205.jpg`,
      `${U}2023/12/IMG_7037.jpg`,
      `${U}2023/12/IMG_7002.jpg`,
      `${U}2023/12/IMG_6949.jpg`,
      `${U}2023/12/IMG_6827.jpg`,
      `${U}2023/12/Image1-1-scaled.jpg`,
      `${U}2023/12/Image3-scaled.jpg`,
      `${U}2023/12/Image6-scaled.jpg`,
      `${U}2023/12/Image7-scaled.jpg`,
    ],
    chapters: [
      {
        blockType: 'mediaText',
        eyebrow: 'Território',
        heading: 'Comunidades quilombolas de Saco Curtume e Picos',
        media: `${U}2023/12/Mapa-geral-Quipa_Vs1.jpg`,
        mediaPosition: 'left',
        tone: 'alt',
        body: doc(p('Mapa geral da área de atuação do Projeto Quipá, em São João do Piauí (PI).')),
      },
    ],
  },
  {
    legacySlug: 'programa-de-educacao-patrimonial-da-fundacao-cassiano-ricardo',
    slug: 'programa-de-educacao-patrimonial',
    title: 'Programa de Educação Patrimonial da Fundação Cassiano Ricardo',
    summary:
      'Entre 2015 e 2016, a Quarau coordenou e geriu, em parceria com o CECP, o Programa de Educação Patrimonial (PEP) da Fundação Cultural Cassiano Ricardo, em São José dos Campos.',
    client: 'Fundação Cultural Cassiano Ricardo',
    location: 'São José dos Campos (SP)',
    startYear: 2015,
    endYear: 2016,
    role: 'Coordenação e gestão do programa',
    partners: ['fccr', 'cecp'],
    services: ['educacao-patrimonial-e-ambiental', 'gestao-e-difusao'],
    ods: [],
    featured: false,
    accent: 'blue',
    coordinates: { lat: -23.1794, lng: -45.8869 },
    body: doc(
      p(
        'Entre 2015 e 2016, a Quarau realizou, em parceria com o CECP, a coordenação e a gestão do ',
        { text: 'Programa de Educação Patrimonial (PEP)', bold: true },
        ' da Fundação Cultural Cassiano Ricardo, de São José dos Campos.',
      ),
    ),
    cover: `${U}2023/11/5.jpg`,
    gallery: [
      `${U}2023/11/PEP-01.jpg`,
      `${U}2023/11/PEP-02.jpg`,
      `${U}2023/11/PEP-03.jpg`,
      `${U}2023/11/PEP-04.jpg`,
      `${U}2023/11/PEP-05_tratada.jpg`,
      `${U}2023/11/PEP-06.jpg`,
      `${U}2023/11/PEP-07-1.jpg`,
      `${U}2023/11/PEP-081.jpg`,
      `${U}2023/11/PEP-09.jpg`,
      `${U}2023/11/PEP-10.jpg`,
    ],
  },
  {
    legacySlug:
      'projeto-de-memoria-institucional-do-museu-do-folclore-de-sao-jose-dos-campos-cecp-fundacao-cultural-cassiano-ricardo',
    slug: 'memoria-institucional-museu-do-folclore',
    title: 'Memória Institucional do Museu do Folclore de São José dos Campos',
    summary:
      'Pesquisas institucionais para o Museu do Folclore e o CECP, sua organização gestora. Em 2020, a pesquisa sobre a memória do museu resultou no livro “O Museu do Folclore de São José dos Campos: Uma Breve História”.',
    client: 'CECP — Centro de Estudos da Cultura Popular',
    location: 'São José dos Campos (SP)',
    startYear: 2020,
    endYear: 2020,
    role: 'Pesquisa institucional e publicação',
    partners: ['cecp', 'fccr'],
    services: ['patrimonio-cultural-e-pesquisa', 'gestao-e-difusao'],
    ods: [],
    featured: false,
    accent: 'green',
    coordinates: { lat: -23.1794, lng: -45.8869 },
    body: doc(
      p(
        'A Quarau desenvolveu pesquisas institucionais para o Museu do Folclore de São José dos Campos e para sua organização gestora, o CECP.',
      ),
      p(
        'Em 2020, realizou a pesquisa sobre a memória institucional do museu, reunindo uma série diversificada de fontes documentais e fotografias. O trabalho resultou no livro ',
        { text: 'O Museu do Folclore de São José dos Campos: Uma Breve História', italic: true },
        '.',
      ),
    ),
    cover: `${U}2023/11/4.jpg`,
    gallery: [
      `${U}2023/12/IMG_9310-Copia.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-8.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-16.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-22.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-34.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-45.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-49.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-61.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-63.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-65.jpg`,
      `${U}2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-66.jpg`,
    ],
    publications: [
      {
        label: 'O Museu do Folclore de São José dos Campos: Uma Breve História',
        url: 'https://www.calameo.com/read/0010126728ee98dee91fd',
        cover: `${U}2023/12/Capa-26o-Colecao-Cad-Folclore.jpg`,
      },
      {
        label: 'O Saber e o Fazer no Museu do Folclore',
        url: 'https://www.calameo.com/read/0010126729c18ce8ecbfb',
        cover: `${U}2023/12/Screenshot-2023-12-13-101801.png`,
      },
      {
        label: 'O Saber e o Fazer no Museu do Folclore II',
        url: 'https://www.calameo.com/read/001012672b53578957aa2',
        cover: `${U}2023/12/Screenshot-2023-12-13-101601.png`,
      },
    ],
  },
]

/** Legacy WP ODS badge images per project (kept in the media library for reference). */
export const odsImages = [
  `${U}2023/12/Untitled-design.png`,
  `${U}2023/12/Untitled-design-1.png`,
  `${U}2023/12/Untitled-design-2.png`,
]
