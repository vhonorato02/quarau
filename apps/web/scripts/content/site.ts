/**
 * Institutional content: practice areas, partners, pages and globals.
 * Every claim comes from quarau.com.br (see docs/inventario.md).
 */
import { doc, h, p, ul } from '../lib/lexical'

const U = 'https://quarau.com.br/wp-content/uploads/'

export const services = [
  {
    slug: 'projetos-socioambientais',
    title: 'Projetos socioambientais e investimento social',
    icon: 'territory',
    order: 10,
    summary:
      'Concepção, editais, seleção e monitoramento de projetos que fortalecem comunidades nos territórios onde empresas e instituições atuam.',
    cover: `${U}2023/12/IMG_6121.jpg`,
    deliverables: [
      'Identificação das potencialidades de territórios e instituições',
      'Elaboração de editais e chamadas',
      'Prospecção, avaliação e seleção de organizações sociais',
      'Monitoramento de projetos e relatórios técnicos',
      'Encerramento e difusão de resultados',
    ],
    body: doc(
      p(
        'A Quarau elabora, junto a empresas, instituições públicas e organizações do terceiro setor, projetos que beneficiam territórios urbanos e rurais. Utiliza metodologias adequadas a cada contexto para identificar as potencialidades dos territórios e das instituições envolvidas.',
      ),
      p(
        'No Programa Celeo na Comunidade, por exemplo, a Quarau atuou em todas as etapas: elaboração de edital, prospecção de ONGs, avaliação, seleção, monitoramento, finalização e difusão audiovisual.',
      ),
    ),
  },
  {
    slug: 'patrimonio-cultural-e-pesquisa',
    title: 'Patrimônio cultural e pesquisa',
    icon: 'heritage',
    order: 20,
    summary:
      'Inventários de referências culturais, dossiês de registro de patrimônio imaterial e pesquisas de memória institucional, em diálogo com o IPHAN e instituições culturais.',
    cover: `${U}2023/11/2.0.1B-36-Terno-de-Congo-de-Sainhas-Irmaos-Paiva-20231118-195026.jpg`,
    deliverables: [
      'Inventário Nacional de Referências Culturais (INRC)',
      'Dossiês de registro de patrimônio cultural imaterial',
      'Pesquisa de memória institucional',
      'Publicações e livros a partir das pesquisas',
    ],
    body: doc(
      p(
        'A Quarau aplicou o Inventário Nacional de Referências Culturais do Congado Paulista e coordenou a pesquisa do Dossiê de Registro do Samba de Bumbo Paulista como Patrimônio Cultural Imaterial Brasileiro, em parceria com o IPHAN.',
      ),
      p(
        'Também desenvolve pesquisas institucionais, como a que reconstituiu a memória do Museu do Folclore de São José dos Campos a partir de fontes documentais e fotografias.',
      ),
    ),
  },
  {
    slug: 'educacao-patrimonial-e-ambiental',
    title: 'Educação patrimonial e ambiental',
    icon: 'education',
    order: 30,
    summary:
      'Coordenação e gestão de programas educativos que aproximam comunidades do seu patrimônio cultural e ambiental.',
    cover: `${U}2023/11/06_02_2023_Roda_de_Conversa_Nucleo_Ingrid-3-20231118-193457-scaled.jpg`,
    deliverables: [
      'Coordenação de programas de educação patrimonial',
      'Ações educativas em museus e territórios',
      'Hortas pedagógicas e agroecologia',
      'Rodas de conversa, oficinas e feiras de saberes',
    ],
    body: doc(
      p(
        'Entre 2015 e 2016, a Quarau coordenou e geriu o Programa de Educação Patrimonial da Fundação Cultural Cassiano Ricardo. Ações educativas também fazem parte de projetos como o Ecomuseu dos Campos de São José e o Projeto Ecoe Verde.',
      ),
    ),
  },
  {
    slug: 'gestao-e-difusao',
    title: 'Gestão e difusão de projetos',
    icon: 'management',
    order: 40,
    summary:
      'Planejamento, execução, monitoramento e controle de projetos, com gestão de equipes, articulação de parceiros e difusão dos resultados.',
    cover: `${U}2023/11/05_05_2023_Feira-de-Sabere-e-Fazeres_Fabio-e-Rosa-31-1-scaled.jpg`,
    deliverables: [
      'Planejamento e gerenciamento de projetos',
      'Gestão de equipes e articulação de parceiros',
      'Relatórios técnicos e prestação de contas',
      'Publicações e produção audiovisual de difusão',
    ],
    body: doc(
      p(
        'A Quarau tem experiência consolidada em todas as etapas de um projeto: concepção, prospecção, seleção, planejamento, execução, monitoramento, controle, encerramento, promoção e difusão.',
      ),
      p('Essa visão de ciclo completo permite assumir papéis de concepção, execução e gerenciamento, conforme a necessidade de cada parceiro.'),
    ),
  },
]

export const partners = [
  { key: 'cecp', name: 'CECP', fullName: 'Centro de Estudos da Cultura Popular', kind: 'client', logo: `${U}2023/11/Untitled-1-1.jpg`, order: 10 },
  { key: 'petrobras', name: 'Petrobras', fullName: 'Petrobras — Programa Petrobras Socioambiental', kind: 'partner', logo: `${U}2023/11/Logo_petrobras.gif`, order: 20 },
  { key: 'iphan', name: 'IPHAN', fullName: 'Instituto do Patrimônio Histórico e Artístico Nacional', kind: 'partner', logo: `${U}2023/11/iphan-instituto-do-patrimonio-historico-e-artistico-nacional.jpg`, order: 30 },
  { key: 'fccr', name: 'Fundação Cultural Cassiano Ricardo', fullName: 'Fundação Cultural Cassiano Ricardo', kind: 'client', logo: `${U}2023/12/logofccr.gif`, order: 40 },
  { key: 'celeo', name: 'Celeo', fullName: 'Celeo — Programa Celeo na Comunidade', kind: 'client', logo: `${U}2023/11/celeo_grupo_cmyk_03-150X150-150x80-1.png`, order: 50 },
  { key: 'espaco-crescer', name: 'Espaço Crescer', fullName: 'Espaço Crescer', kind: 'executor', order: 60, showOnHome: false },
  { key: 'instituto-umbuzeiro', name: 'Instituto Umbuzeiro', fullName: 'Instituto Umbuzeiro', kind: 'executor', order: 70, showOnHome: false },
] as const

const LEAD_ABOUT =
  'Quarau é uma empresa de consultoria em projetos educativos, culturais e socioambientais, com experiência consolidada em todas as etapas que compõem um projeto — da concepção à difusão de resultados.'

export const pages = [
  {
    slug: 'inicio',
    title: 'Início',
    meta: {
      title: 'Quarau — Projetos Socioambientais, Educativos e Culturais',
      description:
        'Consultoria em projetos educativos, culturais e socioambientais: da concepção à difusão de resultados, com presença no território e impacto mensurável.',
    },
    layout: [
      {
        blockType: 'hero',
        variant: 'immersive',
        eyebrow: 'Consultoria em projetos socioambientais, educativos e culturais',
        heading: 'Projetos que fortalecem territórios, pessoas e patrimônios.',
        lead: 'Da concepção à difusão de resultados, a Quarau articula empresas, instituições públicas e organizações sociais em projetos com método e presença no território.',
        media: `${U}2023/11/22_11_2022_Plantio_Florestinha_GABI-55-20231118-194530-scaled.jpg`,
        links: [
          { type: 'external', url: '/projetos', label: 'Conheça os projetos', appearance: 'primary' },
          { type: 'internal', ref: { collection: 'pages', slug: 'contato' }, label: 'Fale com a Quarau', appearance: 'secondary' },
        ],
      },
      {
        blockType: 'statement',
        eyebrow: 'Quem somos',
        text: 'A Quarau é uma consultoria em projetos educativos, culturais e socioambientais com experiência em todas as etapas de um projeto: concepção, prospecção, seleção, planejamento, execução, monitoramento, controle, encerramento, promoção e difusão.',
        links: [{ type: 'internal', ref: { collection: 'pages', slug: 'sobre' }, label: 'Sobre a Quarau', appearance: 'secondary' }],
        tone: 'default',
      },
      {
        blockType: 'stats',
        eyebrow: 'Resultados',
        heading: 'Impacto que se mede no território',
        tone: 'brand',
        items: [
          { value: '16 mil', label: 'pessoas mobilizadas na 3ª edição do Ecomuseu dos Campos de São José', context: '2021–2023' },
          { value: '1.913', label: 'pessoas beneficiadas diretamente pelo Projeto Ecoe Verde em um ano', context: 'Atibaia (SP)' },
          { value: '7.652', label: 'pessoas impactadas indiretamente pelo Projeto Ecoe Verde', context: 'Atibaia (SP)' },
        ],
      },
      {
        blockType: 'projects',
        eyebrow: 'Portfólio',
        heading: 'Projetos em destaque',
        intro: 'Iniciativas concebidas, geridas ou apoiadas pela Quarau em parceria com instituições culturais, órgãos públicos e empresas.',
        mode: 'featured',
        limit: 4,
        showAllLink: true,
        tone: 'default',
      },
      {
        blockType: 'services',
        eyebrow: 'Atuação',
        heading: 'Do diagnóstico à difusão dos resultados',
        intro: 'Metodologias adequadas a cada contexto, para identificar as potencialidades dos territórios e das instituições.',
        tone: 'alt',
      },
      {
        blockType: 'timeline',
        eyebrow: 'Como trabalhamos',
        heading: 'Presença em todas as etapas do projeto',
        tone: 'dark',
        items: [
          { period: '01', title: 'Concepção', description: 'Diagnóstico do território e desenho do projeto com o parceiro.' },
          { period: '02', title: 'Prospecção e seleção', description: 'Editais, prospecção, avaliação e seleção de organizações e propostas.' },
          { period: '03', title: 'Planejamento', description: 'Metas, equipe, cronograma e articulação de parceiros.' },
          { period: '04', title: 'Execução e monitoramento', description: 'Gestão de equipes, acompanhamento, controle e relatórios técnicos.' },
          { period: '05', title: 'Encerramento', description: 'Consolidação de resultados e prestação de contas.' },
          { period: '06', title: 'Promoção e difusão', description: 'Publicações, audiovisual e comunicação dos resultados.' },
        ],
      },
      {
        blockType: 'partners',
        eyebrow: 'Com quem trabalhamos',
        heading: 'Instituições parceiras e contratantes',
        tone: 'default',
      },
    ],
  },
  {
    slug: 'sobre',
    title: 'Sobre a Quarau',
    meta: { title: 'Sobre a Quarau', description: LEAD_ABOUT },
    layout: [
      {
        blockType: 'hero',
        variant: 'simple',
        eyebrow: 'Sobre a Quarau',
        heading: 'Consultoria para projetos que transformam territórios.',
        lead: LEAD_ABOUT,
      },
      {
        blockType: 'mediaText',
        eyebrow: 'O que fazemos',
        heading: 'Do território à instituição, com método',
        media: `${U}2023/11/06_02_2023_Roda_de_Conversa_Nucleo_Ingrid-3-20231118-193457-scaled.jpg`,
        mediaPosition: 'right',
        tone: 'default',
        body: doc(
          p(
            'A Quarau elabora, junto aos seus parceiros — empresas, instituições públicas ou do terceiro setor —, projetos que beneficiam territórios urbanos e rurais, bem como instituições locais, regionais e nacionais.',
          ),
          p(
            'Utilizamos metodologias adequadas a cada contexto, garantindo a identificação das potencialidades dos territórios e das instituições. Com essa perspectiva, acumulamos bons resultados em todas as etapas de produção dos projetos, com papéis de destaque na concepção, na execução e no gerenciamento.',
          ),
        ),
      },
      {
        blockType: 'content',
        eyebrow: 'Propósito',
        heading: 'Missão, visão e valores',
        layout: 'split',
        tone: 'alt',
        body: doc(
          h('h3', 'Missão'),
          ul([
            ['Promover o desenvolvimento sustentável em todas as suas dimensões: social, ambiental, cultural e econômica.'],
            ['Articular instituições públicas e privadas, comunidades e territórios para contribuir com os Objetivos de Desenvolvimento Sustentável (ODS).'],
            ['Potencializar o patrimônio cultural e ambiental por meio da pesquisa, da educação e da difusão de resultados.'],
          ]),
          h('h3', 'Visão'),
          ul([
            ['Ser referência em consultoria a instituições públicas e privadas em projetos educativos, culturais e socioambientais.'],
            ['Ser referência no gerenciamento de projetos educativos, culturais e socioambientais.'],
            ['Ser referência na articulação de atores sociais para a promoção do desenvolvimento sustentável.'],
          ]),
          h('h3', 'Valores'),
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
        blockType: 'ods',
        eyebrow: 'Agenda 2030',
        heading: 'Projetos alinhados aos Objetivos de Desenvolvimento Sustentável',
        text: 'Os projetos do portfólio da Quarau dialogam com estes ODS.',
        goals: ['1', '2', '4', '5', '8', '11', '12', '13', '16', '17'],
        tone: 'default',
      },
      {
        blockType: 'projects',
        eyebrow: 'Portfólio',
        heading: 'Veja nossos projetos',
        mode: 'latest',
        limit: 6,
        showAllLink: true,
        tone: 'default',
      },
      { blockType: 'partners', eyebrow: 'Parceiros', heading: 'Com quem trabalhamos', tone: 'alt' },
    ],
  },
  {
    slug: 'contato',
    title: 'Fale com a Quarau',
    meta: {
      title: 'Contato — Fale com a Quarau',
      description: 'Fale com a Quarau sobre projetos educativos, culturais e socioambientais. E-mail contato@quarau.com.br.',
    },
    layout: [
      {
        blockType: 'hero',
        variant: 'simple',
        eyebrow: 'Contato',
        heading: 'Vamos conversar sobre o seu projeto.',
        lead: 'Conte o que você precisa — da elaboração de um projeto à gestão de um programa de investimento social. Respondemos pelo e-mail informado.',
      },
      {
        blockType: 'contactForm',
        eyebrow: 'Formulário',
        heading: 'Envie sua mensagem',
        intro: 'Ou fale diretamente pelos canais abaixo.',
        tone: 'default',
      },
    ],
  },
  {
    slug: 'privacidade',
    title: 'Política de privacidade',
    meta: { title: 'Política de privacidade', description: 'Como a Quarau trata os dados pessoais coletados neste site, conforme a LGPD.' },
    layout: [
      { blockType: 'hero', variant: 'simple', eyebrow: 'LGPD', heading: 'Política de privacidade', lead: 'Como tratamos os dados pessoais coletados neste site, em conformidade com a Lei nº 13.709/2018 (LGPD).' },
      {
        blockType: 'content',
        layout: 'narrow',
        tone: 'default',
        body: doc(
          h('h2', '1. Quem é o controlador'),
          p('Quarau Projetos Socioambientais, Educativos e Culturais, com sede em São José dos Campos (SP). Contato do encarregado: contato@quarau.com.br.'),
          h('h2', '2. Quais dados coletamos'),
          ul([
            ['Formulário de contato: nome, e-mail, telefone e organização (opcionais), assunto e mensagem.'],
            ['Dados técnicos de segurança: endereço IP convertido em código irreversível (hash) e navegador, usados apenas para prevenir abuso.'],
            ['Medição de audiência: somente com o seu consentimento, por meio do Umami, ferramenta sem cookies que não identifica pessoas nem rastreia entre sites.'],
          ]),
          h('h2', '3. Para que usamos'),
          p('Para responder ao seu contato, manter o histórico do atendimento e proteger o site contra spam. Não vendemos nem compartilhamos dados com terceiros para fins de marketing.'),
          h('h2', '4. Base legal e retenção'),
          p('O tratamento se baseia no seu consentimento e no legítimo interesse de responder às solicitações. As mensagens são mantidas pelo tempo necessário ao atendimento e excluídas mediante solicitação.'),
          h('h2', '5. Seus direitos'),
          p('Você pode solicitar acesso, correção, portabilidade ou exclusão dos seus dados, além de revogar o consentimento a qualquer momento, pelo e-mail contato@quarau.com.br.'),
          h('h2', '6. Cookies'),
          p('Usamos apenas armazenamento local essencial para lembrar suas preferências de privacidade. Você pode alterá-las a qualquer momento pelo link “Preferências de cookies” no rodapé.'),
          h('h2', '7. Segurança'),
          p('Os dados trafegam com criptografia (HTTPS) e ficam em servidor com acesso restrito, cópias de segurança e controle de acesso por perfil.'),
        ),
      },
    ],
  },
]

export const globals = {
  navigation: {
    items: [
      { type: 'internal', ref: { collection: 'pages', slug: 'sobre' }, label: 'Sobre' },
      { type: 'external', url: '/atuacao', label: 'Atuação' },
      { type: 'external', url: '/projetos', label: 'Projetos' },
      { type: 'internal', ref: { collection: 'pages', slug: 'contato' }, label: 'Contato' },
    ],
    cta: { type: 'internal', ref: { collection: 'pages', slug: 'contato' }, label: 'Fale com a Quarau' },
  },
  footer: {
    tagline: 'Projetos socioambientais, educativos e culturais — da concepção à difusão de resultados.',
    columns: [
      {
        title: 'Site',
        links: [
          { type: 'internal', ref: { collection: 'pages', slug: 'sobre' }, label: 'Sobre a Quarau' },
          { type: 'external', url: '/atuacao', label: 'Áreas de atuação' },
          { type: 'external', url: '/projetos', label: 'Projetos' },
          { type: 'external', url: '/noticias', label: 'Notícias' },
          { type: 'external', url: '/trabalhe-conosco', label: 'Trabalhe conosco' },
          { type: 'internal', ref: { collection: 'pages', slug: 'contato' }, label: 'Contato' },
        ],
      },
    ],
  },
  contact: {
    companyName: 'Quarau Projetos Socioambientais, Educativos e Culturais',
    email: 'contato@quarau.com.br',
    phones: [
      { number: '(12) 98281-3669', whatsapp: false },
      { number: '(12) 98264-5960', whatsapp: false },
    ],
    address: { city: 'São José dos Campos', state: 'SP' },
    formSubjects: [
      { label: 'Elaboração de projeto' },
      { label: 'Editais e seleção de projetos' },
      { label: 'Patrimônio cultural e pesquisa' },
      { label: 'Educação patrimonial e ambiental' },
      { label: 'Gestão de projetos' },
      { label: 'Outro assunto' },
    ],
  },
  social: {
    profiles: [
      { network: 'instagram', url: 'https://www.instagram.com/quarau.consultoria/', handle: '@quarau.consultoria' },
      { network: 'linkedin', url: 'https://www.linkedin.com/in/quarau-91196b258/' },
    ],
  },
  'site-settings': {
    siteName: 'Quarau',
    titleTemplate: '%s — Quarau',
    defaultDescription:
      'Consultoria em projetos educativos, culturais e socioambientais, com atuação em todas as etapas: da concepção à difusão de resultados.',
    defaultOgImage: `${U}2023/12/Untitled-design-3.png`,
    organization: { legalName: 'Quarau Projetos Socioambientais, Educativos e Culturais', areaServed: 'Brasil' },
  },
}
