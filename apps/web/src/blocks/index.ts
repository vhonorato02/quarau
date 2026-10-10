import type { Block } from 'payload'

import { editor, simpleEditor } from '../fields/richText'
import { linkFields } from '../fields/link'
import { anchorField, sectionIntro, toneField } from './shared'

const links = (max = 2): Block['fields'][number] => ({
  name: 'links',
  type: 'array',
  label: 'Botões',
  maxRows: max,
  labels: { singular: 'Botão', plural: 'Botões' },
  fields: linkFields({ withAppearance: true }),
})

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Destaque (Hero)', plural: 'Destaques (Hero)' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Estilo',
      defaultValue: 'immersive',
      options: [
        { label: 'Imersivo (símbolo 3D + foto)', value: 'immersive' },
        { label: 'Foto em tela cheia', value: 'image' },
        { label: 'Somente texto', value: 'simple' },
      ],
    },
    ...sectionIntro.slice(0, 1),
    {
      name: 'heading',
      type: 'textarea',
      label: 'Título',
      required: true,
      localized: true,
      maxLength: 120,
    },
    { name: 'lead', type: 'textarea', label: 'Texto de apoio', localized: true, maxLength: 320 },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem de fundo',
      admin: { condition: (_, s) => s?.variant !== 'simple' },
    },
    links(2),
  ],
}

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: { singular: 'Texto', plural: 'Textos' },
  fields: [
    ...sectionIntro,
    { name: 'body', type: 'richText', label: 'Conteúdo', editor, required: true, localized: true },
    {
      name: 'layout',
      type: 'select',
      label: 'Disposição',
      defaultValue: 'split',
      options: [
        { label: 'Título à esquerda, texto à direita', value: 'split' },
        { label: 'Coluna de leitura centralizada', value: 'narrow' },
      ],
    },
    toneField(),
    anchorField,
  ],
}

export const MediaTextBlock: Block = {
  slug: 'mediaText',
  interfaceName: 'MediaTextBlock',
  labels: { singular: 'Imagem + texto', plural: 'Imagem + texto' },
  fields: [
    ...sectionIntro,
    { name: 'body', type: 'richText', label: 'Texto', editor: simpleEditor, localized: true },
    { name: 'media', type: 'upload', relationTo: 'media', label: 'Imagem', required: true },
    {
      name: 'mediaPosition',
      type: 'radio',
      label: 'Posição da imagem',
      defaultValue: 'right',
      options: [
        { label: 'Direita', value: 'right' },
        { label: 'Esquerda', value: 'left' },
      ],
      admin: { layout: 'horizontal' },
    },
    links(2),
    toneField(),
    anchorField,
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Números', plural: 'Números' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      label: 'Indicadores',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Indicador', plural: 'Indicadores' },
      admin: {
        description: 'Use apenas números comprovados e informe a fonte/período no contexto.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Número',
              required: true,
              admin: { width: '30%', placeholder: '16 mil' },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Descrição',
              required: true,
              localized: true,
              admin: { width: '70%' },
            },
          ],
        },
        { name: 'context', type: 'text', label: 'Contexto / fonte', localized: true },
      ],
    },
    toneField('brand'),
    anchorField,
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: { singular: 'Linha do tempo', plural: 'Linhas do tempo' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      label: 'Marcos',
      minRows: 1,
      labels: { singular: 'Marco', plural: 'Marcos' },
      fields: [
        {
          name: 'period',
          type: 'text',
          label: 'Ano ou período',
          required: true,
          admin: { placeholder: '2015–2017' },
        },
        { name: 'title', type: 'text', label: 'Título', required: true, localized: true },
        { name: 'description', type: 'textarea', label: 'Descrição', localized: true },
      ],
    },
    toneField(),
    anchorField,
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Galeria', plural: 'Galerias' },
  fields: [
    ...sectionIntro,
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Imagens',
      required: true,
      minRows: 1,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Disposição',
      defaultValue: 'mosaic',
      options: [
        { label: 'Mosaico', value: 'mosaic' },
        { label: 'Carrossel horizontal', value: 'carousel' },
      ],
    },
    toneField(),
    anchorField,
  ],
}

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: { singular: 'Vídeo', plural: 'Vídeos' },
  fields: [
    ...sectionIntro,
    {
      name: 'source',
      type: 'radio',
      label: 'Origem',
      defaultValue: 'upload',
      options: [
        { label: 'Arquivo enviado', value: 'upload' },
        { label: 'YouTube / Vimeo', value: 'embed' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Arquivo de vídeo (MP4)',
      filterOptions: { mimeType: { contains: 'video' } },
      admin: { condition: (_, s) => s?.source !== 'embed' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL do YouTube ou Vimeo',
      admin: { condition: (_, s) => s?.source === 'embed' },
    },
    { name: 'poster', type: 'upload', relationTo: 'media', label: 'Imagem de capa' },
    { name: 'caption', type: 'text', label: 'Legenda', localized: true },
    toneField('dark'),
    anchorField,
  ],
}

export const ProjectsBlock: Block = {
  slug: 'projects',
  interfaceName: 'ProjectsBlock',
  labels: { singular: 'Projetos (cases)', plural: 'Projetos (cases)' },
  fields: [
    ...sectionIntro,
    { name: 'intro', type: 'textarea', label: 'Introdução', localized: true },
    {
      name: 'mode',
      type: 'radio',
      label: 'Quais projetos exibir',
      defaultValue: 'featured',
      options: [
        { label: 'Destaques', value: 'featured' },
        { label: 'Mais recentes', value: 'latest' },
        { label: 'Escolher manualmente', value: 'selected' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'selected',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Projetos',
      admin: { condition: (_, s) => s?.mode === 'selected' },
    },
    { name: 'limit', type: 'number', label: 'Quantidade', defaultValue: 6, min: 1, max: 12 },
    {
      name: 'showAllLink',
      type: 'checkbox',
      label: 'Mostrar link “Ver todos os projetos”',
      defaultValue: true,
    },
    toneField(),
    anchorField,
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Depoimentos', plural: 'Depoimentos' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      label: 'Depoimentos',
      minRows: 1,
      labels: { singular: 'Depoimento', plural: 'Depoimentos' },
      admin: { description: 'Publique apenas depoimentos autorizados por escrito.' },
      fields: [
        { name: 'quote', type: 'textarea', label: 'Depoimento', required: true, localized: true },
        { name: 'author', type: 'text', label: 'Nome' },
        { name: 'role', type: 'text', label: 'Cargo / organização', localized: true },
      ],
    },
    toneField('alt'),
    anchorField,
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'Chamada para ação', plural: 'Chamadas para ação' },
  fields: [
    { name: 'heading', type: 'text', label: 'Título', required: true, localized: true },
    { name: 'text', type: 'textarea', label: 'Texto', localized: true },
    links(2),
    toneField('brand'),
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'Perguntas frequentes', plural: 'Perguntas frequentes' },
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      label: 'Perguntas',
      minRows: 1,
      labels: { singular: 'Pergunta', plural: 'Perguntas' },
      fields: [
        { name: 'question', type: 'text', label: 'Pergunta', required: true, localized: true },
        {
          name: 'answer',
          type: 'richText',
          label: 'Resposta',
          editor: simpleEditor,
          required: true,
          localized: true,
        },
      ],
    },
    toneField(),
    anchorField,
  ],
}

export const MapBlock: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  labels: { singular: 'Mapa', plural: 'Mapas' },
  fields: [
    ...sectionIntro,
    { name: 'address', type: 'textarea', label: 'Endereço exibido', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'lat', type: 'number', label: 'Latitude', required: true, admin: { width: '33%' } },
        {
          name: 'lng',
          type: 'number',
          label: 'Longitude',
          required: true,
          admin: { width: '33%' },
        },
        {
          name: 'zoom',
          type: 'number',
          label: 'Zoom',
          defaultValue: 13,
          min: 3,
          max: 18,
          admin: { width: '33%' },
        },
      ],
    },
    toneField('alt'),
    anchorField,
  ],
}

export const PartnersBlock: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
  labels: { singular: 'Parceiros e clientes', plural: 'Parceiros e clientes' },
  fields: [
    ...sectionIntro,
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Parceiros (vazio = todos)',
    },
    toneField(),
    anchorField,
  ],
}

export const ServicesBlock: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  labels: { singular: 'Áreas de atuação', plural: 'Áreas de atuação' },
  fields: [
    ...sectionIntro,
    { name: 'intro', type: 'textarea', label: 'Introdução', localized: true },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Áreas (vazio = todas)',
    },
    toneField('alt'),
    anchorField,
  ],
}

export const OdsBlock: Block = {
  slug: 'ods',
  interfaceName: 'OdsBlock',
  labels: { singular: 'ODS', plural: 'ODS' },
  fields: [
    ...sectionIntro,
    { name: 'text', type: 'textarea', label: 'Texto', localized: true },
    {
      name: 'goals',
      type: 'select',
      hasMany: true,
      label: 'Objetivos de Desenvolvimento Sustentável',
      options: Array.from({ length: 17 }, (_, i) => ({
        label: `ODS ${i + 1}`,
        value: String(i + 1),
      })),
    },
    toneField(),
    anchorField,
  ],
}

export const DownloadsBlock: Block = {
  slug: 'downloads',
  interfaceName: 'DownloadsBlock',
  labels: { singular: 'Documentos', plural: 'Documentos' },
  fields: [
    ...sectionIntro,
    {
      name: 'documents',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
      label: 'Documentos (vazio = todos)',
    },
    toneField(),
    anchorField,
  ],
}

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Equipe', plural: 'Equipe' },
  fields: [
    ...sectionIntro,
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      label: 'Pessoas (vazio = todas)',
    },
    toneField(),
    anchorField,
  ],
}

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  labels: { singular: 'Formulário de contato', plural: 'Formulários de contato' },
  fields: [
    ...sectionIntro,
    { name: 'intro', type: 'textarea', label: 'Texto de apoio', localized: true },
    toneField('alt'),
    anchorField,
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  ContentBlock,
  MediaTextBlock,
  StatsBlock,
  TimelineBlock,
  GalleryBlock,
  VideoBlock,
  ProjectsBlock,
  ServicesBlock,
  TestimonialsBlock,
  PartnersBlock,
  OdsBlock,
  TeamBlock,
  DownloadsBlock,
  FaqBlock,
  MapBlock,
  ContactFormBlock,
  CtaBlock,
]

export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Frase de impacto', plural: 'Frases de impacto' },
  fields: [
    sectionIntro[0]!,
    {
      name: 'text',
      type: 'textarea',
      label: 'Frase',
      required: true,
      localized: true,
      maxLength: 400,
      admin: {
        description:
          'Texto grande que se revela conforme a rolagem. Ideal para manifestos e missão.',
      },
    },
    links(1),
    toneField(),
    anchorField,
  ],
}

pageBlocks.splice(1, 0, StatementBlock)

/** Blocks available inside a project case study narrative. */
export const caseBlocks: Block[] = [
  ContentBlock,
  MediaTextBlock,
  StatementBlock,
  StatsBlock,
  GalleryBlock,
  VideoBlock,
  TimelineBlock,
  TestimonialsBlock,
  OdsBlock,
]
