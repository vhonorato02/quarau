/**
 * Initial content of the site, in the CMS model of docs/DESIGN.md.
 * Every fact comes from the old site (content/legacy/scrape/paginas) as listed in docs/QUARAU.md;
 * anything unconfirmed stays out (docs/CONTENT-TODO.md). Images are files of the old WordPress,
 * read from .migrate-cache/uploads or downloaded from quarau.com.br.
 */
import { doc, h, p, ul } from '../lib/lexical'

/** Ficha do Ecomuseu como Tecnologia Social na Fundação Banco do Brasil (fonte dos números do território). */
export const FBB_ECOMUSEU =
  'https://transforma.fbb.org.br/ecomuseu-patrimonio-como-instrumento-de-desenvolvimento-local/generate-pdf?id=60'

/** Path under wp-content/uploads. */
export type Img = { file: string; alt: string; caption?: string }

type LinkRef = { label: string; page: string }

export type ProjectSeed = {
  slug: string
  title: string
  summary: string
  territory: string
  territoryDetail?: string
  /** Map pin (municipality seat, IBGE). Empty = not on the map. */
  latitude?: number
  longitude?: number
  program?: string
  carriedOutBy?: string
  role?: string
  startYear?: number
  endYear?: number
  ongoing?: boolean
  partners: string[]
  services: string[]
  ods: number[]
  featured: boolean
  order: number
  lead?: string
  cover: Img
  story: Array<Record<string, unknown>>
}

const img = (file: string, alt: string, caption?: string): Img => ({ file, alt, caption })

/* ------------------------------------------------------------------ services */

export const services = [
  {
    slug: 'projetos-socioambientais',
    title: 'Projetos socioambientais e investimento social',
    order: 10,
    summary:
      'Editais, seleção e monitoramento de projetos nos territórios onde empresas e instituições atuam, do diagnóstico à prestação de contas.',
    cover: img(
      '2023/12/IMG_6121.jpg',
      'Canteiros da horta comunitária do Projeto Ecoe Verde, no Bairro Esmeralda, em Atibaia',
    ),
    deliverables: [
      'Identificação das potencialidades do território e das instituições',
      'Elaboração de editais e chamadas',
      'Prospecção, avaliação e seleção de organizações sociais',
      'Monitoramento e relatórios técnicos',
      'Encerramento e difusão dos resultados',
    ],
    body: doc(
      p(
        'A Quarau elabora projetos com empresas, instituições públicas e organizações do terceiro setor para beneficiar territórios urbanos e rurais. Cada metodologia é ajustada ao contexto, para reconhecer o que o território e as instituições já têm de potência.',
      ),
      p(
        'No Programa Celeo na Comunidade, a Quarau esteve em todas as etapas: escreveu o edital, prospectou e avaliou ONGs, selecionou os projetos, acompanhou a execução, encerrou o ciclo e cuidou da difusão audiovisual.',
      ),
    ),
  },
  {
    slug: 'patrimonio-cultural-e-pesquisa',
    title: 'Patrimônio cultural e pesquisa',
    order: 20,
    summary:
      'Inventários de referências culturais, dossiês de registro de patrimônio imaterial e pesquisas de memória institucional, com o IPHAN e instituições culturais.',
    cover: img(
      '2023/11/2.0.1B-36-Terno-de-Congo-de-Sainhas-Irmaos-Paiva-20231118-195026.jpg',
      'Integrantes do Terno de Congo de Sainhas Irmãos Paiva em apresentação, com roupas e fitas coloridas',
    ),
    deliverables: [
      'Inventário Nacional de Referências Culturais (INRC)',
      'Dossiês de registro de patrimônio cultural imaterial',
      'Pesquisa de memória institucional',
      'Livros e publicações a partir das pesquisas',
    ],
    body: doc(
      p(
        'A Quarau aplicou o Inventário Nacional de Referências Culturais do Congado Paulista e coordenou a pesquisa do Dossiê de Registro do Samba de Bumbo Paulista como Patrimônio Cultural Imaterial Brasileiro, em parceria com o IPHAN. Em 2026 entregou, com o CECP e o IPHAN, o dossiê do Cortejo da Cavalaria de São Gonçalo e São Benedito, de Guaratinguetá.',
      ),
      p(
        'Também faz pesquisa institucional, como a que reconstituiu a memória do Museu do Folclore de São José dos Campos a partir de documentos e fotografias.',
      ),
    ),
  },
  {
    slug: 'educacao-patrimonial-e-ambiental',
    title: 'Educação patrimonial e ambiental',
    order: 30,
    summary:
      'Programas educativos que aproximam comunidades do seu patrimônio cultural e ambiental.',
    cover: img(
      '2023/11/06_02_2023_Roda_de_Conversa_Nucleo_Ingrid-3-20231118-193457-scaled.jpg',
      'Pessoas debruçadas sobre um mapa impresso numa roda de conversa, marcando pontos do território',
    ),
    deliverables: [
      'Coordenação de programas de educação patrimonial',
      'Ações educativas em museus e territórios',
      'Hortas pedagógicas e agroecologia',
      'Rodas de conversa, oficinas e feiras de saberes',
    ],
    body: doc(
      p(
        'Entre 2015 e 2016, a Quarau coordenou e geriu o Programa de Educação Patrimonial da Fundação Cultural Cassiano Ricardo. Ações educativas também estão no centro do Ecomuseu dos Campos de São José e do Projeto Ecoe Verde.',
      ),
    ),
  },
  {
    slug: 'gestao-e-difusao',
    title: 'Gestão e difusão de projetos',
    order: 40,
    summary:
      'Planejamento, execução e controle de projetos, com gestão de equipes, articulação de parceiros e difusão dos resultados.',
    cover: img(
      '2023/11/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-31-1-scaled.jpg',
      'Visitantes circulam entre as barracas da Feira de Saberes e Fazeres',
    ),
    deliverables: [
      'Planejamento e gerenciamento de projetos',
      'Gestão de equipes e articulação de parceiros',
      'Relatórios técnicos e prestação de contas',
      'Publicações e audiovisual de difusão',
    ],
    body: doc(
      p(
        'A Quarau trabalha em todas as etapas de um projeto: concepção, prospecção, seleção, planejamento, execução, monitoramento, controle, encerramento, promoção e difusão.',
      ),
      p(
        'Por isso pode assumir o ciclo inteiro ou só a etapa que o parceiro precisa, na concepção, na execução ou no gerenciamento.',
      ),
    ),
  },
]

/* ------------------------------------------------------------------ partners */

export const partners = [
  {
    key: 'cecp',
    name: 'CECP',
    fullName: 'Centro de Estudos da Cultura Popular',
    kind: 'client',
    order: 10,
    showOnHome: true,
  },
  {
    key: 'petrobras',
    name: 'Petrobras Socioambiental',
    fullName: 'Programa Petrobras Socioambiental',
    kind: 'partner',
    order: 20,
    showOnHome: true,
  },
  {
    key: 'iphan',
    name: 'IPHAN',
    fullName: 'Instituto do Patrimônio Histórico e Artístico Nacional',
    kind: 'partner',
    order: 30,
    showOnHome: true,
  },
  {
    key: 'fccr',
    name: 'Fundação Cultural Cassiano Ricardo',
    fullName: 'Fundação Cultural Cassiano Ricardo',
    kind: 'client',
    order: 40,
    showOnHome: true,
  },
  {
    key: 'celeo',
    name: 'Celeo',
    fullName: 'Celeo, Programa Celeo na Comunidade',
    kind: 'client',
    order: 50,
    showOnHome: true,
  },
  {
    key: 'espaco-crescer',
    name: 'Espaço Crescer',
    fullName: 'Espaço Crescer',
    kind: 'executor',
    order: 60,
    showOnHome: true,
  },
  {
    key: 'instituto-umbuzeiro',
    name: 'Instituto Umbuzeiro',
    fullName: 'Instituto Umbuzeiro',
    kind: 'executor',
    order: 70,
    showOnHome: true,
  },
] as const

/* ------------------------------------------------------------------ projects */

const gallery = (heading: string | null, files: Array<[string, string]>) => ({
  blockType: 'gallery',
  heading,
  images: files.map(([file, alt]) => img(file, alt)),
})

export const projects: ProjectSeed[] = [
  {
    slug: 'ecomuseu-dos-campos-de-sao-jose',
    title: 'Ecomuseu dos Campos de São José',
    summary:
      'Desde 2015 a Quarau elabora os projetos, gere as equipes e faz as pesquisas e os relatórios técnicos do Ecomuseu, iniciativa do CECP com o Programa Petrobras Socioambiental.',
    territory: 'São José dos Campos, SP',
    latitude: -23.1791,
    longitude: -45.8872,
    carriedOutBy: 'CECP e Petrobras Socioambiental',
    role: 'Elaboração dos projetos, gerenciamento das equipes, articulação de parceiros, pesquisas e relatórios técnicos.',
    startYear: 2015,
    ongoing: true,
    partners: ['cecp', 'petrobras'],
    services: ['projetos-socioambientais', 'educacao-patrimonial-e-ambiental', 'gestao-e-difusao'],
    ods: [4, 11, 12, 13, 16, 17],
    featured: true,
    order: 10,
    lead: 'Um museu que não fica num prédio: o patrimônio dos Campos de São José é pesquisado, mapeado e celebrado com quem vive no território.',
    cover: img(
      '2018/06/2.jpg',
      'Participantes do Ecomuseu dos Campos de São José reunidos ao ar livre',
    ),
    story: [
      {
        blockType: 'richText',
        body: doc(
          p(
            'O Centro de Estudos da Cultura Popular (CECP) contrata a Quarau desde 2015 para conduzir o Ecomuseu dos Campos de São José de ponta a ponta: elaboração dos projetos, gerenciamento das equipes, articulação de parceiros, pesquisas e relatórios técnicos.',
          ),
          p(
            'O Ecomuseu é realizado pelo CECP em parceria com a Petrobras, por meio do Programa Petrobras Socioambiental. O projeto rendeu ao CECP a certificação de instituição desenvolvedora de Tecnologia Social, concedida pela Fundação Banco do Brasil.',
          ),
          h('h2', 'Um museu feito com o bairro'),
          p(
            'Um ecomuseu não guarda o patrimônio num prédio: ele o reconhece no território, com quem vive ali. A implantação começou em março de 2015, com patrocínio da Petrobras e apoio do Instituto Embraer, nos bairros Jardim Diamante, Jardim Americano e Campos de São José, vizinhos à Refinaria Henrique Lage (Revap).',
          ),
          p(
            'O trabalho começa pela aproximação: visitas às casas e às instituições do bairro, rodas de conversa semanais e um diagnóstico sociocultural que mapeia as referências culturais dos moradores. Desses encontros nasceu o Núcleo de Ação do Ecomuseu, formado pela equipe do projeto e por moradores, que aponta os problemas do bairro e desenha as soluções em conjunto.',
          ),
          p(
            'Daí vieram feiras de saberes e fazeres, como a Trecos e Tarecos no Parque Alambari, rodas de bordado e de cantoria, oficinas de comunicação com jovens (fotografia, texto, vídeo, jornal comunitário), caminhadas de reconhecimento e mutirões. Nos dois primeiros anos, a equipe conversou pessoalmente com cerca de 3.000 moradores dos três bairros.',
          ),
        ),
      },
      {
        blockType: 'mediaText',
        heading: 'Área de abrangência',
        body: doc(
          p(
            'Os bairros em que o Ecomuseu atua, nas zonas leste e sudeste de São José dos Campos, em torno da Revap. Em 2025, segundo a Prefeitura, o projeto chegava a 28 bairros e ao município de Jambeiro.',
          ),
        ),
        image: img(
          '2023/12/A0.png',
          'Mapa de satélite com os bairros da área de abrangência do Ecomuseu delimitados em vermelho, em torno da refinaria',
          'Área de abrangência do Ecomuseu. Mapa: CECP, com dados da Prefeitura de São José dos Campos.',
        ),
        imagePosition: 'left',
      },
      {
        blockType: 'richText',
        heading: 'Agrofloresta no Rio Alambari',
        body: doc(
          p(
            'Logo nas primeiras reuniões do Núcleo de Ação, os moradores apontaram um problema: entulho descartado numa área de preservação permanente às margens do córrego Alambari. Com autorização da Secretaria de Meio Ambiente da Prefeitura, a comunidade plantou mudas nativas para recompor a mata ciliar e cultivou alimentos entre elas, numa agrofloresta urbana.',
          ),
          p(
            'Em 2018, moradores de outra parte do bairro limparam um terreno público usado como depósito de entulho e começaram ali hortas comunitárias. Segundo a ficha do projeto na Fundação Banco do Brasil, foram plantadas 500 mudas de árvores nativas, com um viveiro de 100 mudas, e cultivados cerca de 9.000 m² entre agrofloresta (0,7 ha) e hortas (0,2 ha), em cerca de 90 mutirões. 190 pessoas foram diretamente envolvidas, entre elas cerca de 50 famílias.',
          ),
        ),
      },
      {
        blockType: 'proofNumber',
        value: '16 mil',
        text: doc(p('pessoas mobilizadas na terceira edição do Ecomuseu, entre 2021 e 2023.')),
      },
      {
        blockType: 'richText',
        heading: 'Reconhecimento e memória',
        body: doc(
          p(
            'O Ecomuseu está registrado como Tecnologia Social no banco Transforma, da Fundação Banco do Brasil, com o título Ecomuseu: patrimônio como instrumento de desenvolvimento local. Em agosto de 2020, o CECP publicou o livro Ecomuseu dos Campos de São José: entre memórias e perspectivas, com as narrativas dos moradores sobre a formação dos bairros.',
          ),
          p(
            'Em setembro de 2025, os 10 anos do Ecomuseu foram celebrados no Museu Interativo de Ciências, em São José dos Campos, com estudantes, uma feira de saberes e atividades de reflorestamento.',
          ),
        ),
      },
      {
        blockType: 'publications',
        heading: 'Publicações',
        items: [
          {
            title: 'Ecomuseu dos Campos de São José: entre memórias e perspectivas (CECP, 2020)',
            url: 'https://transforma.fbb.org.br/storage/socialtecnologies/60/files/ECOMUSEU%20CSJ%202020_DIGITAL.pdf',
          },
          {
            title: 'Ficha do Ecomuseu como Tecnologia Social (Fundação Banco do Brasil)',
            url: FBB_ECOMUSEU,
          },
        ],
      },
      {
        blockType: 'video',
        video: { file: 'video/Video_Final.mp4', alt: 'Vídeo do Ecomuseu dos Campos de São José' },
        poster: img('2023/12/DSC03990.jpg', 'Atividade do Ecomuseu dos Campos de São José'),
        caption: 'Vídeo do Ecomuseu dos Campos de São José.',
      },
      gallery('Fotos do projeto', [
        [
          '2023/12/04_09_2023_Roda-de-conversa_CSJ_Maria-8-1.jpg',
          'Roda de conversa do Ecomuseu, com participantes sentados em círculo',
        ],
        [
          '2023/12/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-31.jpg',
          'Feira de Saberes e Fazeres do Ecomuseu',
        ],
        [
          '2023/12/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-145.jpg',
          'Barraca com produtos artesanais na Feira de Saberes e Fazeres',
        ],
        [
          '2023/12/06_02_2023_Roda_de_Conversa_Nucleo_Ingrid-3.jpg',
          'Roda de conversa com mapa do território sobre a mesa',
        ],
        [
          '2023/12/06_05_2023_Feira-de-Saberes-e-Fazeres_Maria-9.jpg',
          'Público na Feira de Saberes e Fazeres',
        ],
        ['2023/12/DSC03990.jpg', 'Atividade do Ecomuseu dos Campos de São José'],
        [
          '2023/12/WhatsApp-Image-2022-01-15-at-16.37.54-1.jpg',
          'Encontro de participantes do Ecomuseu',
        ],
        ['2023/12/IMG_1380_2.jpg', 'Participantes em atividade do Ecomuseu'],
      ]),
    ],
  },
  {
    slug: 'inventario-cultural-e-dossie-de-registro',
    title: 'Inventário Cultural e Dossiê de Registro',
    summary:
      'Inventário do Congado Paulista e dossiês de registro do Samba de Bumbo Paulista e do Cortejo da Cavalaria de Guaratinguetá, dois bens reconhecidos como patrimônio cultural do Brasil, com o CECP e o IPHAN.',
    territory: 'Estado de São Paulo',
    carriedOutBy: 'CECP e IPHAN',
    role: 'Aplicação do INRC do Congado Paulista (2015–2017); coordenação da pesquisa e elaboração do Dossiê de Registro do Samba de Bumbo Paulista (2019–2023); entrega do dossiê de registro do Cortejo da Cavalaria de São Gonçalo e São Benedito (2026).',
    startYear: 2015,
    endYear: 2026,
    partners: ['cecp', 'iphan'],
    services: ['patrimonio-cultural-e-pesquisa'],
    ods: [],
    featured: true,
    order: 40,
    lead: 'Pesquisas sobre o patrimônio imaterial paulista, do Congado ao Samba de Bumbo e ao Cortejo da Cavalaria, documentados para o registro nacional.',
    cover: img(
      '2023/11/2.0.1B-34-Terno-de-Congo-de-Sainhas-Irmaos-Paiva-scaled.jpg',
      'Terno de Congo de Sainhas Irmãos Paiva em apresentação',
    ),
    story: [
      {
        blockType: 'richText',
        body: doc(
          p(
            'O CECP contratou a Quarau para aplicar o Inventário Nacional de Referências Culturais (INRC) do Congado Paulista, entre 2015 e 2017, e para coordenar a pesquisa e elaborar o Dossiê de Registro do Samba de Bumbo Paulista como Patrimônio Cultural Imaterial Brasileiro, entre 2019 e 2023.',
          ),
          p(
            'As pesquisas foram feitas em parceria com o Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN), conforme o Decreto nº 3.551, de agosto de 2000, que institui o registro de bens culturais de natureza imaterial.',
          ),
          h('h2', 'Congado Paulista'),
          p(
            'O inventário do Congado foi feito em campo entre 2015 e 2017 e mapeou grupos de congada e moçambique do Vale do Paraíba Paulista e do Litoral Norte. O resultado virou o livro Congadas e Moçambiques no Vale do Paraíba Paulista, 29º volume da coleção Cadernos de Folclore, lançado em setembro de 2023 na Festa Literomusical de São José dos Campos: 87 grupos, em 39 municípios.',
          ),
          h('h2', 'Samba de Bumbo Paulista'),
          p(
            'O pedido de registro foi feito em 2013 pelo Fórum para as Culturas Populares e Tradicionais. Em 2019, o CECP foi selecionado em chamamento público do IPHAN para elaborar o dossiê, e a Quarau coordenou a pesquisa. Os grupos acompanharam o trabalho por uma comissão própria, e o nome do bem, Samba de Bumbo Paulista, foi definido em conjunto entre sambadores, pesquisadores e o IPHAN. Na pandemia, as entrevistas passaram a ser virtuais.',
          ),
          p(
            'O Samba de Bumbo Paulista é uma forma de expressão que une música, dança e poesia, mantida por grupos de base familiar e movida por festas que formam uma rede de visitas entre cidades. Nasceu nas fazendas de café do interior paulista no século XIX, com raízes afro-brasileiras. Em 9 de maio de 2024, na 104ª reunião do Conselho Consultivo do Patrimônio Cultural, foi inscrito no Livro de Registro das Formas de Expressão.',
          ),
        ),
      },
      {
        blockType: 'figure',
        image: img(
          '2023/12/M01_Presencial_Virtual2.png',
          'Mapa do estado de São Paulo com setas coloridas ligando cidades como Pirapora do Bom Jesus, Piracicaba, Campinas e Mauá, e um detalhe com ligações para Brasília e Serra Talhada',
          'Mapa das redes presenciais e virtuais de visitação do Samba Paulista, elaborado para o dossiê de registro. CECP e IPHAN.',
        ),
        size: 'wide',
      },
      {
        blockType: 'richText',
        heading: 'Cortejo da Cavalaria de São Gonçalo e São Benedito',
        body: doc(
          p(
            'Em parceria com o CECP e o IPHAN, a Quarau entregou o dossiê de registro do Cortejo da Cavalaria de São Gonçalo e São Benedito, de Guaratinguetá. O pedido de registro foi feito em 2015 pela associação da Cavalaria. Em 22 de setembro de 2026, na 114ª reunião do Conselho Consultivo, o Cortejo foi reconhecido como patrimônio cultural do Brasil, no Livro de Registro das Celebrações.',
          ),
          p(
            'Todo Domingo de Páscoa, cerca de dois mil cavaleiros vestidos de branco percorrem aproximadamente 20 km pelas ruas da cidade, em duas filas, unindo a memória dos tropeiros do Vale do Paraíba e a devoção afro-brasileira a São Benedito.',
          ),
        ),
      },
      gallery('Fotos da pesquisa', [
        ['2023/11/1.1.133-Apresentacao-20231118-195024.jpg', 'Apresentação de grupo de congado'],
        [
          '2023/11/2.0.1B-36-Terno-de-Congo-de-Sainhas-Irmaos-Paiva-20231118-195026.jpg',
          'Integrantes do Terno de Congo de Sainhas Irmãos Paiva',
        ],
        [
          '2023/11/23826251_10208072580452599_7012661833098756994_o-20231118-195027.jpg',
          'Festa de congado',
        ],
        [
          '2023/11/23845864_10208072896260494_1379668490107092426_o-20231118-195028.jpg',
          'Grupo de congado em cortejo',
        ],
        [
          '2023/11/23847257_10208072590572852_3161924133479159687_o-20231118-195030.jpg',
          'Congadeiros com instrumentos',
        ],
        ['2023/12/IMG-20210517-WA0024.jpg', 'Registro da pesquisa sobre o Samba de Bumbo Paulista'],
        ['2023/12/IMG-20211012-WA0016.jpg', 'Roda de Samba de Bumbo'],
        ['2023/12/IMG-20211012-WA0017.jpg', 'Músicos do Samba de Bumbo'],
      ]),
      {
        blockType: 'publications',
        heading: 'Publicação',
        items: [
          {
            title: 'Livro da pesquisa (leitura on-line no Calaméo)',
            url: 'https://www.calameo.com/read/00101267291cf3c0365a8',
            cover: img('2023/12/Screenshot-2023-12-13-101508.png', 'Capa do livro da pesquisa'),
          },
        ],
      },
    ],
  },
  {
    slug: 'projeto-ecoe-verde',
    title: 'Projeto Ecoe Verde',
    summary:
      'Um terreno inativo no Bairro Esmeralda, em Atibaia, virou horta comunitária agroecológica e pedagógica e ponto de cultura. Em um ano, 1.913 pessoas foram beneficiadas diretamente.',
    territory: 'Atibaia, SP',
    latitude: -23.1171,
    longitude: -46.5563,
    territoryDetail: 'Bairro Esmeralda (Tanque), Atibaia, SP',
    program: 'Programa Celeo na Comunidade',
    carriedOutBy: 'Celeo e Espaço Crescer',
    startYear: 2022,
    ongoing: true,
    partners: ['celeo', 'espaco-crescer'],
    services: ['projetos-socioambientais', 'educacao-patrimonial-e-ambiental'],
    ods: [1, 2, 4, 5, 8, 12],
    featured: true,
    order: 30,
    lead: 'Onde havia um terreno parado, hoje há horta, oficina e encontro: um ponto de cultura cultivado pela comunidade.',
    cover: img(
      '2023/12/09_02_2023_Visita_Atibaia_Tati_2.jpg',
      'Canteiros da horta comunitária do Projeto Ecoe Verde, em Atibaia',
    ),
    story: [
      {
        blockType: 'richText',
        body: doc(
          p(
            'O Projeto Ecoe Verde é uma iniciativa da Celeo e do Espaço Crescer, realizada desde março de 2022 numa região periférica de Atibaia conhecida como Bairro Esmeralda, ou Tanque.',
          ),
          p(
            'O bairro é um dos territórios atravessados pela linha de transmissão da Cantareira Transmissora de Energia. Com o projeto, um terreno inativo virou horta comunitária agroecológica e pedagógica e ponto de cultura para toda a comunidade.',
          ),
          p(
            'O Ecoe Verde faz parte do Programa Celeo na Comunidade, em que a Quarau atua como consultora. A execução no território é do Espaço Crescer.',
          ),
        ),
      },
      {
        blockType: 'mediaText',
        heading: 'Como a horta se organiza',
        body: doc(
          p(
            'O mapeamento feito para o projeto divide a Horta Comunitária Vila Esmeralda em setores: canteiro misto de hortaliças, canteiro de ervas, milho, feijão e abóbora, quiabo e mandioca, pomar e vasos de frutíferas, além de compostagem, captação de água e uma área de convivência.',
          ),
        ),
        image: img(
          '2023/12/3-Areas-produtivas-horta-Vila-Esmeralda.jpg',
          'Foto de satélite do terreno da horta com os setores produtivos delimitados em verde: canteiros, pomar, compostagem, captação de água e área de convivência',
          'Áreas produtivas da Horta Comunitária Vila Esmeralda. Mapa: Lucas Paixão, para Celeo, Ecoe Verde e Quarau.',
        ),
        imagePosition: 'right',
      },
      {
        blockType: 'mediaText',
        heading: 'Uma rede no bairro',
        body: doc(
          p(
            'O projeto se apoia em instituições públicas próximas ao terreno: as escolas E.M. Walda Paolinetti Lozasso, EMEF Prefeito Gilberto Santana Anna e Professora Maria do Carmo, e o CRAS do Tanque.',
          ),
        ),
        image: img(
          '2023/12/3-Instituicoes-parceiras.jpg',
          'Foto de satélite do Bairro Esmeralda com o terreno do projeto e as escolas e o CRAS parceiros marcados',
          'Instituições parceiras do Projeto Ecoe Verde. Mapa: Lucas Paixão, para Celeo, Ecoe Verde e Quarau.',
        ),
        imagePosition: 'left',
      },
      {
        blockType: 'proofNumber',
        value: '1.913',
        text: doc(
          p(
            'pessoas beneficiadas diretamente no primeiro ano do projeto, e cerca de 7.652 indiretamente.',
          ),
        ),
      },
      {
        blockType: 'video',
        video: { file: 'video/ECOEVERDE_5MIN_LEG_PORT.mp4', alt: 'Vídeo do Projeto Ecoe Verde' },
        poster: img('2023/12/IMG_6100-1.jpg', 'Horta comunitária do Projeto Ecoe Verde'),
        caption: 'Vídeo do Projeto Ecoe Verde, com legendas em português.',
      },
      gallery('Fotos do projeto', [
        ['2023/12/09_02_2023_Visita_Atibaia_Tati_2-1.jpg', 'Horta comunitária no Bairro Esmeralda'],
        ['2023/12/20230209_115108-1.jpg', 'Visita à horta do Projeto Ecoe Verde'],
        ['2023/12/IMG_6072-1.jpg', 'Canteiros com hortaliças'],
        ['2023/12/IMG_6100-1.jpg', 'Horta comunitária do Projeto Ecoe Verde'],
        ['2023/12/IMG_6016-1.jpg', 'Plantio na horta comunitária'],
        ['2023/12/IMG_6139-1.jpg', 'Área produtiva da horta'],
        ['2023/12/09_02_2023_Visita_Atibaia_Fabio_5-1.jpg', 'Visita ao Projeto Ecoe Verde'],
        [
          '2023/12/09_02_2023_Visita_Atibaia_Fabio_9.jpg',
          'Participantes do Projeto Ecoe Verde na horta',
        ],
        ['2023/12/IMG_6259.jpg', 'Atividade no ponto de cultura do Projeto Ecoe Verde'],
      ]),
    ],
  },
  {
    slug: 'projeto-quipa',
    title: 'Projeto Quipá: jovens cultivando saberes',
    summary:
      'Iniciativa da Celeo e do Instituto Umbuzeiro nas comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí. A Quarau foi consultora em todas as etapas do programa.',
    territory: 'São João do Piauí, PI',
    latitude: -8.3581,
    longitude: -42.2467,
    territoryDetail: 'Comunidades quilombolas de Saco Curtume e Picos, São João do Piauí, PI',
    program: 'Programa Celeo na Comunidade',
    carriedOutBy: 'Celeo e Instituto Umbuzeiro',
    role: 'Consultoria em todas as etapas do programa: elaboração do edital, prospecção de ONGs, avaliação, seleção, monitoramento, finalização e difusão audiovisual.',
    partners: ['celeo', 'instituto-umbuzeiro'],
    services: ['projetos-socioambientais', 'gestao-e-difusao'],
    ods: [1, 2, 4, 5, 8],
    featured: true,
    order: 20,
    lead: 'Casa do Mel, Casa de Farinha e outras unidades de compartilhamento: a biointeração quilombola posta em prática por jovens do sertão do Piauí.',
    cover: img(
      '2023/12/IMG_7251.jpg',
      'Jovens das comunidades quilombolas em atividade do Projeto Quipá',
    ),
    story: [
      {
        blockType: 'richText',
        body: doc(
          p(
            'O Projeto Quipá: jovens cultivando saberes é uma iniciativa da Celeo e do Instituto Umbuzeiro nas comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí, região de abrangência da usina fotovoltaica da Celeo.',
          ),
          p(
            'A Quarau atuou como consultora em todas as etapas do programa: elaboração do edital, prospecção de ONGs, avaliação, seleção, monitoramento, finalização e difusão audiovisual.',
          ),
          h('h2', 'Biointeração na prática'),
          p(
            'Com a Casa do Mel, a Casa de Farinha e outras unidades de compartilhamento, o projeto põe em prática o que o líder e escritor quilombola Antônio Bispo dos Santos, um dos idealizadores do Instituto Umbuzeiro, chamou de biointeração.',
          ),
        ),
      },
      {
        blockType: 'quote',
        text: 'Além da pescaria, também podemos apresentar uma organização própria dos quilombos e dos povos indígenas e que quase todas as pessoas que moram nessas comunidades conhecem e participam: a estrutura orgânica social de uma casa de farinha.',
        source: 'Antônio Bispo dos Santos, em Colonização, Quilombos: Modos e Significações',
      },
      {
        blockType: 'video',
        video: { file: 'video/QUIPA_LEG_PORT.mp4', alt: 'Vídeo do Projeto Quipá' },
        poster: img('2023/12/IMG_8365.jpg', 'Atividade do Projeto Quipá'),
        caption: 'Vídeo do Projeto Quipá, com legendas em português.',
      },
      {
        blockType: 'mediaText',
        heading: 'Saco Curtume e Picos',
        body: doc(
          p(
            'Mapa geral da área de atuação do Projeto Quipá, nas comunidades quilombolas de Saco Curtume e Picos, em São João do Piauí.',
          ),
        ),
        image: img(
          '2023/12/Mapa-geral-Quipa_Vs1.jpg',
          'Mapa da área do Projeto Quipá com as comunidades de Saco Curtume e Picos',
        ),
        imagePosition: 'left',
      },
      gallery('Fotos do projeto', [
        ['2023/12/20230425_192633-1-scaled.jpg', 'Encontro do Projeto Quipá'],
        ['2023/12/IMG_8365.jpg', 'Atividade do Projeto Quipá'],
        ['2023/12/IMG_8309.jpg', 'Jovens do Projeto Quipá'],
        ['2023/12/IMG_8298.jpg', 'Atividade nas comunidades quilombolas'],
        ['2023/12/IMG_8279.jpg', 'Trabalho coletivo no Projeto Quipá'],
        ['2023/12/IMG_8186.jpg', 'Registro do Projeto Quipá'],
        ['2023/12/IMG_7205.jpg', 'Participantes do Projeto Quipá'],
        ['2023/12/IMG_7037.jpg', 'Atividade nas comunidades de Saco Curtume e Picos'],
      ]),
    ],
  },
  {
    slug: 'programa-de-educacao-patrimonial',
    title: 'Programa de Educação Patrimonial',
    summary:
      'Entre 2015 e 2016, a Quarau coordenou e geriu, com o CECP, o Programa de Educação Patrimonial da Fundação Cultural Cassiano Ricardo, em São José dos Campos.',
    territory: 'São José dos Campos, SP',
    latitude: -23.1791,
    longitude: -45.8872,
    carriedOutBy: 'Fundação Cultural Cassiano Ricardo e CECP',
    role: 'Coordenação e gestão do programa.',
    startYear: 2015,
    endYear: 2016,
    partners: ['fccr', 'cecp'],
    services: ['educacao-patrimonial-e-ambiental', 'gestao-e-difusao'],
    ods: [],
    featured: false,
    order: 60,
    cover: img('2023/11/PEP-04_tratada.jpg', 'Atividade do Programa de Educação Patrimonial'),
    story: [
      {
        blockType: 'richText',
        body: doc(
          p(
            'Entre 2015 e 2016, a Quarau fez, em parceria com o CECP, a coordenação e a gestão do Programa de Educação Patrimonial (PEP) da Fundação Cultural Cassiano Ricardo, de São José dos Campos.',
          ),
        ),
      },
      gallery('Fotos do programa', [
        ['2023/11/PEP-01.jpg', 'Atividade educativa do Programa de Educação Patrimonial'],
        ['2023/11/PEP-02.jpg', 'Participantes do Programa de Educação Patrimonial'],
        ['2023/11/PEP-03.jpg', 'Visita educativa do programa'],
        ['2023/11/PEP-05_tratada.jpg', 'Oficina do Programa de Educação Patrimonial'],
        ['2023/11/PEP-06.jpg', 'Grupo em atividade do programa'],
        ['2023/11/PEP-09.jpg', 'Encontro do Programa de Educação Patrimonial'],
      ]),
    ],
  },
  {
    slug: 'memoria-institucional-museu-do-folclore',
    title: 'Memória institucional do Museu do Folclore',
    summary:
      'Pesquisa sobre a memória do Museu do Folclore de São José dos Campos e do CECP, sua gestora, que resultou no livro “O Museu do Folclore de São José dos Campos: Uma Breve História”.',
    territory: 'São José dos Campos, SP',
    latitude: -23.1791,
    longitude: -45.8872,
    carriedOutBy: 'CECP',
    role: 'Pesquisa institucional e publicação.',
    startYear: 2020,
    endYear: 2020,
    partners: ['cecp'],
    services: ['patrimonio-cultural-e-pesquisa', 'gestao-e-difusao'],
    ods: [],
    featured: false,
    order: 50,
    cover: img('2023/11/4.jpg', 'Acervo do Museu do Folclore de São José dos Campos'),
    story: [
      {
        blockType: 'richText',
        body: doc(
          p(
            'A Quarau desenvolve pesquisas institucionais para o Museu do Folclore de São José dos Campos e para o CECP, organização responsável pela gestão do museu. O CECP atua no Museu do Folclore desde 1999, com destaque para o Programa Museu Vivo, que valoriza a cultura popular e seus saberes.',
          ),
          p(
            'Em 2020, a pesquisa sobre a memória institucional do museu reuniu fontes documentais e fotografias e resultou no livro O Museu do Folclore de São José dos Campos: Uma Breve História.',
          ),
        ),
      },
      {
        blockType: 'publications',
        heading: 'Publicações',
        items: [
          {
            title: 'O Museu do Folclore de São José dos Campos: Uma Breve História',
            url: 'https://www.calameo.com/read/0010126728ee98dee91fd',
            cover: img(
              '2023/12/Capa-26o-Colecao-Cad-Folclore.jpg',
              'Capa do livro O Museu do Folclore de São José dos Campos: Uma Breve História',
            ),
          },
          {
            title: 'O Saber e o Fazer no Museu do Folclore',
            url: 'https://www.calameo.com/read/0010126729c18ce8ecbfb',
            cover: img(
              '2023/12/Screenshot-2023-12-13-101801.png',
              'Capa da publicação O Saber e o Fazer no Museu do Folclore',
            ),
          },
          {
            title: 'O Saber e o Fazer no Museu do Folclore II',
            url: 'https://www.calameo.com/read/001012672b53578957aa2',
            cover: img(
              '2023/12/Screenshot-2023-12-13-101601.png',
              'Capa da publicação O Saber e o Fazer no Museu do Folclore II',
            ),
          },
        ],
      },
      gallery('Fotos', [
        [
          '2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-8.jpg',
          'Atividade do Museu Vivo no Museu do Folclore',
        ],
        ['2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-16.jpg', 'Público no Museu do Folclore'],
        ['2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-22.jpg', 'Apresentação no Museu do Folclore'],
        ['2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-34.jpg', 'Visitantes no Museu do Folclore'],
        [
          '2023/12/Museu-Vivo_21-05-2023_Fabio-Bueno-45.jpg',
          'Atividade cultural no Museu do Folclore',
        ],
      ]),
    ],
  },
]

/* ------------------------------------------------------------------ pages */

const link = (l: LinkRef) => ({ type: 'internal', ref: l.page, label: l.label })

const ABOUT_LEAD =
  'A Quarau é uma consultoria em projetos educativos, culturais e socioambientais. Trabalha em todas as etapas de um projeto, da concepção à difusão dos resultados.'

export const pages: Array<{
  slug: string
  title: string
  status: 'published' | 'draft'
  meta?: { title?: string; description?: string }
  layout: Array<Record<string, unknown>>
}> = [
  {
    slug: 'inicio',
    title: 'Início',
    status: 'published',
    meta: {
      title: 'Quarau — Projetos Socioambientais, Educativos e Culturais',
      description:
        'Consultoria que concebe, gerencia e difunde projetos socioambientais, educativos e culturais com empresas, instituições públicas e organizações sociais.',
    },
    layout: [
      {
        blockType: 'heroLens',
        heading: 'Projetos que começam no território.',
        lead: 'A Quarau concebe, gerencia e difunde projetos socioambientais, educativos e culturais com empresas, instituições públicas e organizações sociais.',
        image: img(
          '2023/11/06_02_2023_Roda_de_Conversa_Nucleo_Ingrid-3-20231118-193457-scaled.jpg',
          'Pessoas debruçadas sobre um mapa impresso numa roda de conversa, marcando pontos do território',
          'Roda de conversa do Ecomuseu dos Campos de São José, 2023.',
        ),
        primary: link({ label: 'Conversar sobre um projeto', page: 'contato' }),
        secondary: link({ label: 'Ver os projetos', page: 'projetos' }),
      },
      { blockType: 'partnersStrip', heading: 'Com quem já trabalhamos' },
      {
        blockType: 'projectIndex',
        heading: 'Projetos',
        intro:
          'Seis projetos em que a Quarau esteve na concepção, na gestão ou na pesquisa, de São José dos Campos ao sertão do Piauí.',
        mode: 'all',
        display: 'index',
      },
      {
        blockType: 'territories',
        heading: 'Onde atuamos',
        intro:
          'Do Vale do Paraíba ao sertão do Piauí. Cada ponto é um município onde a Quarau tem projeto; o estudo do patrimônio imaterial percorreu o estado de São Paulo.',
      },
      {
        blockType: 'proofNumber',
        value: '16 mil',
        text: doc(
          p(
            'pessoas mobilizadas na terceira edição do Ecomuseu dos Campos de São José, entre 2021 e 2023. A Quarau está no projeto desde 2015.',
          ),
        ),
      },
      {
        blockType: 'cycle',
        heading: 'Presença em todas as etapas de um projeto',
        steps: [
          'concepção',
          'prospecção',
          'seleção',
          'planejamento',
          'execução',
          'monitoramento',
          'controle',
          'encerramento',
          'promoção',
          'difusão',
        ].map((label) => ({ label })),
        text: 'Assumimos o ciclo inteiro ou só a etapa de que o seu projeto precisa: escrever o edital, selecionar organizações, gerir equipes, medir e prestar contas.',
      },
      {
        blockType: 'areas',
        heading: 'Áreas de atuação',
        intro:
          'Metodologias ajustadas a cada contexto, para reconhecer as potencialidades dos territórios e das instituições.',
      },
      { blockType: 'newsList', heading: 'Notícias e publicações', limit: 3 },
      {
        blockType: 'ctaBand',
        heading: 'Tem um projeto para um território? Vamos conversar.',
        text: 'Conte o que você precisa, da escrita de um projeto à gestão de um programa de investimento social.',
        link: link({ label: 'Escrever para a Quarau', page: 'contato' }),
        showContacts: true,
      },
    ],
  },
  {
    slug: 'projetos',
    title: 'Projetos',
    status: 'published',
    meta: {
      description:
        'Projetos socioambientais, educativos e culturais concebidos, geridos ou pesquisados pela Quarau.',
    },
    layout: [
      {
        blockType: 'pageIntro',
        heading: 'Projetos',
        lead: 'Do Vale do Paraíba ao sertão do Piauí: projetos em que a Quarau esteve na concepção, na gestão, na pesquisa ou na difusão.',
      },
      { blockType: 'projectIndex', mode: 'all' },
      {
        blockType: 'ctaBand',
        heading: 'O próximo projeto pode ser o seu.',
        text: 'Conte o território, o público e o prazo. A gente responde por e-mail.',
        link: link({ label: 'Conversar sobre um projeto', page: 'contato' }),
        showContacts: false,
      },
    ],
  },
  {
    slug: 'atuacao',
    title: 'Atuação',
    status: 'published',
    meta: {
      description:
        'Áreas de atuação da Quarau: projetos socioambientais, patrimônio cultural, educação patrimonial e ambiental, gestão e difusão.',
    },
    layout: [
      {
        blockType: 'pageIntro',
        heading: 'Atuação',
        lead: 'Quatro frentes de trabalho, com o mesmo método: começar pelo território e pelas instituições que já estão nele.',
      },
      { blockType: 'areas' },
      {
        blockType: 'cycle',
        heading: 'Do primeiro rascunho à prestação de contas',
        steps: [
          'concepção',
          'prospecção',
          'seleção',
          'planejamento',
          'execução',
          'monitoramento',
          'controle',
          'encerramento',
          'promoção',
          'difusão',
        ].map((label) => ({ label })),
        text: 'Cada etapa pode ser contratada separadamente.',
      },
      {
        blockType: 'ctaBand',
        heading: 'Qual etapa o seu projeto precisa?',
        link: link({ label: 'Conversar sobre um projeto', page: 'contato' }),
        showContacts: true,
      },
    ],
  },
  {
    slug: 'sobre',
    title: 'Sobre',
    status: 'published',
    meta: { title: 'Sobre a Quarau', description: ABOUT_LEAD },
    layout: [
      {
        blockType: 'pageIntro',
        heading: 'Consultoria para projetos que nascem no território.',
        lead: ABOUT_LEAD,
        image: img(
          '2023/11/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-31-1-scaled.jpg',
          'Visitantes circulam entre as barracas da Feira de Saberes e Fazeres',
          'Feira de Saberes e Fazeres do Ecomuseu dos Campos de São José, 2023.',
        ),
      },
      {
        blockType: 'richText',
        layout: 'split',
        heading: 'O que fazemos',
        body: doc(
          p(
            'A Quarau elabora projetos com empresas, instituições públicas e organizações do terceiro setor. Os projetos beneficiam territórios urbanos e rurais e instituições locais, regionais e nacionais.',
          ),
          p(
            'As metodologias são ajustadas a cada contexto, para identificar as potencialidades dos territórios e das instituições. Assim a Quarau ocupa papéis de concepção, execução e gerenciamento, conforme o que cada projeto pede.',
          ),
        ),
      },
      {
        blockType: 'richText',
        layout: 'split',
        heading: 'Missão',
        body: doc(
          ul([
            [
              'Promover o desenvolvimento sustentável em todas as suas dimensões: social, ambiental, cultural e econômica.',
            ],
            [
              'Articular instituições públicas e privadas, comunidades e territórios para contribuir com os Objetivos de Desenvolvimento Sustentável.',
            ],
            [
              'Potencializar o patrimônio cultural e ambiental por meio da pesquisa, da educação e da difusão de resultados.',
            ],
          ]),
        ),
      },
      {
        blockType: 'richText',
        layout: 'split',
        heading: 'Visão',
        body: doc(
          p(
            'Ser referência em consultoria a instituições públicas e privadas, no gerenciamento de projetos educativos, culturais e socioambientais e na articulação de atores sociais para o desenvolvimento sustentável.',
          ),
        ),
      },
      {
        blockType: 'richText',
        layout: 'split',
        heading: 'Valores',
        body: doc(
          ul([
            ['Compromisso com o meio ambiente.'],
            ['Respeito à diversidade de públicos.'],
            ['Zelo pela ética profissional.'],
            ['Gestão transparente e participativa.'],
            ['Valorização da equipe de trabalho.'],
          ]),
        ),
      },
      {
        blockType: 'richText',
        layout: 'split',
        heading: 'Trajetória',
        body: doc(
          ul([
            [
              { text: '2015', bold: true },
              ': começa o Ecomuseu dos Campos de São José, com a Quarau na elaboração dos projetos e na gestão das equipes. No mesmo ano, o inventário do Congado Paulista (até 2017) e o Programa de Educação Patrimonial da Fundação Cultural Cassiano Ricardo (até 2016).',
            ],
            [
              { text: '2019', bold: true },
              ': começa a pesquisa do Dossiê de Registro do Samba de Bumbo Paulista, em parceria com o CECP e o IPHAN.',
            ],
            [
              { text: '2020', bold: true },
              ': pesquisa da memória institucional do Museu do Folclore de São José dos Campos, que vira livro.',
            ],
            [
              { text: '2021 a 2023', bold: true },
              ': terceira edição do Ecomuseu, com cerca de 16 mil pessoas mobilizadas.',
            ],
            [
              { text: '2022', bold: true },
              ': Projeto Ecoe Verde, em Atibaia, dentro do Programa Celeo na Comunidade, em que a Quarau é consultora.',
            ],
            [
              { text: '2024', bold: true },
              ': o Samba de Bumbo Paulista é registrado como patrimônio cultural do Brasil.',
            ],
            [
              { text: '2026', bold: true },
              ': o Cortejo da Cavalaria de São Gonçalo e São Benedito, de Guaratinguetá, é registrado como patrimônio cultural do Brasil, com dossiê entregue pela Quarau.',
            ],
          ]),
        ),
      },
      {
        blockType: 'richText',
        layout: 'split',
        heading: 'Onde atuamos',
        body: doc(
          p(
            'A base é São José dos Campos, no Vale do Paraíba. Os projetos já levaram a Quarau a bairros das zonas leste e sudeste da cidade, a dezenas de municípios do Vale do Paraíba e do Litoral Norte, ao centro-oeste paulista do Samba de Bumbo, a Guaratinguetá, a Atibaia e às comunidades quilombolas de São João do Piauí.',
          ),
        ),
      },
      { blockType: 'partnersStrip', heading: 'Com quem já trabalhamos' },
      {
        blockType: 'ctaBand',
        heading: 'Vamos conversar sobre o seu projeto.',
        link: link({ label: 'Escrever para a Quarau', page: 'contato' }),
        showContacts: true,
      },
    ],
  },
  {
    slug: 'contato',
    title: 'Contato',
    status: 'published',
    meta: {
      title: 'Contato',
      description:
        'Fale com a Quarau sobre projetos socioambientais, educativos e culturais: contato@quarau.com.br.',
    },
    layout: [
      {
        blockType: 'pageIntro',
        heading: 'Vamos conversar sobre o seu projeto.',
        lead: 'Conte o que você precisa, da escrita de um projeto à gestão de um programa de investimento social. Respondemos no e-mail informado.',
      },
      { blockType: 'contactForm' },
    ],
  },
  {
    slug: 'noticias',
    title: 'Notícias',
    status: 'published',
    meta: { description: 'Notícias dos projetos da Quarau.' },
    layout: [
      { blockType: 'pageIntro', heading: 'Notícias', lead: 'O que está acontecendo nos projetos.' },
      { blockType: 'newsList', limit: 24 },
    ],
  },
  {
    slug: 'privacidade',
    title: 'Política de privacidade',
    status: 'published',
    meta: {
      description: 'Como a Quarau trata os dados pessoais coletados neste site, conforme a LGPD.',
    },
    layout: [
      {
        blockType: 'pageIntro',
        heading: 'Política de privacidade',
        lead: 'Como tratamos os dados pessoais coletados neste site, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
      },
      {
        blockType: 'richText',
        layout: 'narrow',
        body: doc(
          h('h2', 'Quem é o controlador'),
          p(
            'Quarau Projetos Socioambientais, Educativos e Culturais, de São José dos Campos (SP). Canal do titular e do encarregado: contato@quarau.com.br.',
          ),
          h('h2', 'Quais dados coletamos'),
          ul([
            [
              'Formulário de contato: nome, e-mail, assunto e mensagem; telefone e organização, se você quiser informar.',
            ],
            [
              'Segurança: o endereço IP é guardado só como código irreversível (hash), junto com o tipo de navegador, para evitar abuso do formulário.',
            ],
            [
              'Medição de audiência: só com a sua permissão, de forma anônima, sem identificar você nem acompanhar a sua navegação em outros sites.',
            ],
          ]),
          h('h2', 'Para que usamos e com que base legal'),
          p(
            'Para responder ao seu contato e manter o histórico do atendimento (consentimento, art. 7º, I) e para proteger o site contra spam (legítimo interesse, art. 7º, IX). Não vendemos nem compartilhamos dados para fins de marketing.',
          ),
          h('h2', 'Quem mais acessa os dados'),
          p(
            'Os serviços que mantêm o site funcionando: hospedagem, banco de dados, envio de e-mail e proteção contra robôs. Eles tratam os dados só para prestar esse serviço.',
          ),
          h('h2', 'Por quanto tempo guardamos'),
          p('Pelo tempo necessário ao atendimento. Você pode pedir a exclusão a qualquer momento.'),
          h('h2', 'Seus direitos'),
          p(
            'Você pode pedir acesso, correção, portabilidade ou exclusão dos seus dados e revogar o consentimento quando quiser, pelo e-mail contato@quarau.com.br.',
          ),
          h('h2', 'Cookies e armazenamento'),
          p(
            'Guardamos no seu navegador apenas a sua escolha de privacidade. A medição de audiência só é ativada se você aceitar, e a escolha pode ser mudada em “Preferências de cookies”, no rodapé.',
          ),
          h('h2', 'Segurança'),
          p(
            'Os dados trafegam com criptografia (HTTPS) e ficam em servidores com acesso restrito e cópias de segurança.',
          ),
        ),
      },
    ],
  },
  {
    slug: 'termos',
    title: 'Termos de uso',
    status: 'published',
    meta: { description: 'Condições de uso do site da Quarau.' },
    layout: [
      {
        blockType: 'pageIntro',
        heading: 'Termos de uso',
        lead: 'Condições para usar este site e o seu conteúdo.',
      },
      {
        blockType: 'richText',
        layout: 'narrow',
        body: doc(
          h('h2', 'Conteúdo'),
          p(
            'Textos, fotografias e vídeos deste site pertencem à Quarau ou aos parceiros dos projetos e são publicados para divulgar o trabalho realizado. Para reproduzir qualquer material, peça autorização pelo e-mail contato@quarau.com.br.',
          ),
          h('h2', 'Publicações externas'),
          p(
            'Os livros e publicações estão hospedados em serviços de terceiros, com regras próprias de uso.',
          ),
          h('h2', 'Dados pessoais'),
          p('O tratamento de dados pessoais segue a Política de privacidade.'),
          h('h2', 'Contato'),
          p('Dúvidas sobre estes termos: contato@quarau.com.br.'),
        ),
      },
    ],
  },
]

/* ------------------------------------------------------------------ globals */

export const globals = {
  navigation: {
    items: [
      link({ label: 'Projetos', page: 'projetos' }),
      link({ label: 'Atuação', page: 'atuacao' }),
      link({ label: 'Sobre', page: 'sobre' }),
      link({ label: 'Notícias', page: 'noticias' }),
      link({ label: 'Contato', page: 'contato' }),
    ],
    cta: link({ label: 'Conversar sobre um projeto', page: 'contato' }),
  },
  footer: {
    tagline:
      'Projetos socioambientais, educativos e culturais, da concepção à difusão dos resultados.',
    links: [
      link({ label: 'Projetos', page: 'projetos' }),
      link({ label: 'Atuação', page: 'atuacao' }),
      link({ label: 'Sobre', page: 'sobre' }),
      link({ label: 'Notícias', page: 'noticias' }),
      link({ label: 'Contato', page: 'contato' }),
    ],
    legalLinks: [
      link({ label: 'Política de privacidade', page: 'privacidade' }),
      link({ label: 'Termos de uso', page: 'termos' }),
    ],
  },
  contact: {
    email: 'contato@quarau.com.br',
    phones: [
      { number: '(12) 98281-3669', whatsapp: false },
      { number: '(12) 98264-5960', whatsapp: false },
    ],
    formSubjects: [
      { label: 'Elaborar ou gerir um projeto' },
      { label: 'Programa de investimento social' },
      { label: 'Patrimônio cultural e pesquisa' },
      { label: 'Educação patrimonial e ambiental' },
      { label: 'Outro assunto' },
    ],
    name: 'Quarau',
    address: { city: 'São José dos Campos', state: 'SP' },
  },
  social: {
    profiles: [
      { network: 'instagram', url: 'https://www.instagram.com/quarau.consultoria/' },
      { network: 'linkedin', url: 'https://www.linkedin.com/in/quarau-91196b258/' },
    ],
  },
  settings: {
    siteName: 'Quarau',
    titleTemplate: '%s — Quarau',
    defaultDescription:
      'Consultoria em projetos socioambientais, educativos e culturais, da concepção à difusão dos resultados. São José dos Campos, SP.',
  },
}
