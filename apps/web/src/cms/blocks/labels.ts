/** Human names of the blocks, shared by the block configs and the admin header label. */
export const BLOCK_LABELS = {
  heroLens: 'Abertura com lente (home)',
  pageIntro: 'Abertura de página',
  partnersStrip: 'Faixa de parceiros',
  projectIndex: 'Lista de projetos',
  proofNumber: 'Número em destaque',
  cycle: 'Etapas do ciclo',
  areas: 'Áreas de atuação',
  richText: 'Texto',
  mediaText: 'Texto com foto',
  quote: 'Citação',
  figure: 'Imagem',
  gallery: 'Galeria de fotos',
  video: 'Vídeo',
  publications: 'Publicações',
  ods: 'ODS',
  ctaBand: 'Chamada para contato',
  contactForm: 'Formulário de contato',
  newsList: 'Últimas notícias',
} as const

export type BlockSlug = keyof typeof BLOCK_LABELS
