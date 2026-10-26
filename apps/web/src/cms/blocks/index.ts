import type { Block, Field } from 'payload'

import { linkGroup } from '../fields/link'
import { editor, simpleEditor } from '../fields/richText'
import { BLOCK_LABELS, type BlockSlug } from './labels'

/**
 * Page and project building blocks. Each one maps to one component in
 * src/components/blocks and to one pattern of the design system (docs/DESIGN.md).
 * Field labels and help texts are written for a non-technical editor.
 */

const label = (slug: BlockSlug) => ({ singular: BLOCK_LABELS[slug], plural: BLOCK_LABELS[slug] })

/** Header shows "Bloco — <título>" instead of "Sem título" (see admin/BlockLabel). */
const admin = { components: { Label: '/cms/admin/BlockLabel#BlockLabel' }, disableBlockName: true }

const heading = (opts: { required?: boolean; description?: string } = {}): Field => ({
  name: 'heading',
  type: 'text',
  label: 'Título',
  required: opts.required ?? false,
  maxLength: 160,
  admin: opts.description ? { description: opts.description } : undefined,
})

const intro: Field = {
  name: 'intro',
  type: 'textarea',
  label: 'Texto de apoio (opcional)',
  maxLength: 400,
}

const image = (name: string, labelText: string, required = false): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  label: labelText,
  required,
  filterOptions: { mimeType: { contains: 'image' } },
})

export const HeroLens: Block = {
  slug: 'heroLens',
  labels: label('heroLens'),
  admin,
  fields: [
    heading({ required: true, description: 'Frase principal da página. Curta: até 6 palavras.' }),
    {
      name: 'lead',
      type: 'textarea',
      label: 'Texto de apresentação',
      required: true,
      maxLength: 300,
    },
    image('image', 'Foto dentro da lente (círculo)', true),
    {
      name: 'caption',
      type: 'text',
      label: 'Legenda da foto',
      admin: { description: 'O que a foto mostra, onde e quando. Ex.: “Roda de conversa, 2023”.' },
    },
    linkGroup('primary', { label: 'Botão principal' }),
    linkGroup('secondary', { label: 'Botão secundário', optional: true }),
  ],
}

export const PageIntro: Block = {
  slug: 'pageIntro',
  labels: label('pageIntro'),
  admin,
  fields: [
    heading({ required: true }),
    { name: 'lead', type: 'textarea', label: 'Texto de apresentação', maxLength: 400 },
    image('image', 'Foto larga abaixo do título (opcional)'),
    { name: 'caption', type: 'text', label: 'Legenda da foto' },
  ],
}

export const PartnersStrip: Block = {
  slug: 'partnersStrip',
  labels: label('partnersStrip'),
  admin,
  fields: [
    heading({
      description:
        'Os nomes vêm de “Parceiros e clientes” (os marcados para aparecer na faixa), na ordem definida lá.',
    }),
  ],
}

export const ProjectIndex: Block = {
  slug: 'projectIndex',
  labels: label('projectIndex'),
  admin,
  fields: [
    heading(),
    intro,
    {
      name: 'mode',
      type: 'radio',
      label: 'Quais projetos mostrar',
      defaultValue: 'all',
      options: [
        { label: 'Todos os publicados', value: 'all' },
        { label: 'Só os marcados como destaque', value: 'featured' },
        { label: 'Escolher à mão', value: 'manual' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Projetos (na ordem desejada)',
      admin: { condition: (_, s) => s?.mode === 'manual' },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Quantidade máxima',
      min: 1,
      max: 50,
      admin: { condition: (_, s) => s?.mode !== 'manual', description: 'Vazio = sem limite.' },
    },
    linkGroup('link', { label: 'Link no fim da lista (opcional)', optional: true }),
  ],
}

export const ProofNumber: Block = {
  slug: 'proofNumber',
  labels: label('proofNumber'),
  admin,
  fields: [
    {
      name: 'value',
      type: 'text',
      label: 'Número',
      required: true,
      maxLength: 12,
      admin: { description: 'Só números publicados e verificáveis. Ex.: “16 mil”.' },
    },
    {
      name: 'text',
      type: 'richText',
      label: 'O que o número significa',
      editor: simpleEditor,
      required: true,
    },
  ],
}

export const Cycle: Block = {
  slug: 'cycle',
  labels: label('cycle'),
  admin,
  fields: [
    heading({ required: true }),
    {
      name: 'steps',
      type: 'array',
      label: 'Etapas (na ordem)',
      minRows: 2,
      maxRows: 12,
      labels: { singular: 'Etapa', plural: 'Etapas' },
      fields: [{ name: 'label', type: 'text', label: 'Etapa', required: true, maxLength: 40 }],
    },
    { name: 'text', type: 'textarea', label: 'Texto depois das etapas', maxLength: 400 },
  ],
}

export const Areas: Block = {
  slug: 'areas',
  labels: label('areas'),
  admin,
  fields: [
    heading(),
    intro,
    {
      name: 'note',
      type: 'ui',
      admin: {
        components: { Field: '/cms/admin/Note#Note' },
        custom: { text: 'As áreas vêm da coleção “Áreas de atuação”, na ordem definida lá.' },
      },
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: label('richText'),
  admin,
  fields: [
    heading(),
    {
      name: 'layout',
      type: 'radio',
      label: 'Arranjo',
      defaultValue: 'narrow',
      options: [
        { label: 'Coluna de leitura', value: 'narrow' },
        { label: 'Título à esquerda, texto à direita', value: 'split' },
      ],
      admin: { layout: 'horizontal' },
    },
    { name: 'body', type: 'richText', label: 'Texto', editor, required: true },
  ],
}

export const MediaText: Block = {
  slug: 'mediaText',
  labels: label('mediaText'),
  admin,
  fields: [
    heading(),
    { name: 'body', type: 'richText', label: 'Texto', editor, required: true },
    image('image', 'Foto', true),
    {
      name: 'imagePosition',
      type: 'radio',
      label: 'Foto do lado',
      defaultValue: 'right',
      options: [
        { label: 'Direito', value: 'right' },
        { label: 'Esquerdo', value: 'left' },
      ],
      admin: { layout: 'horizontal' },
    },
  ],
}

export const Quote: Block = {
  slug: 'quote',
  labels: label('quote'),
  admin,
  fields: [
    { name: 'text', type: 'textarea', label: 'Citação', required: true, maxLength: 600 },
    {
      name: 'source',
      type: 'text',
      label: 'Quem disse / onde',
      required: true,
      admin: { description: 'Toda citação precisa de fonte.' },
    },
  ],
}

export const Figure: Block = {
  slug: 'figure',
  labels: label('figure'),
  admin,
  fields: [
    image('image', 'Imagem', true),
    {
      name: 'caption',
      type: 'text',
      label: 'Legenda (opcional; se vazia, usa a legenda da mídia)',
    },
    {
      name: 'size',
      type: 'radio',
      label: 'Tamanho',
      defaultValue: 'wide',
      options: [
        { label: 'Largura do texto', value: 'text' },
        { label: 'Larga', value: 'wide' },
        { label: 'Tela inteira', value: 'full' },
      ],
      admin: { layout: 'horizontal' },
    },
  ],
}

export const Gallery: Block = {
  slug: 'gallery',
  labels: label('gallery'),
  admin,
  fields: [
    heading(),
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Fotos',
      required: true,
      minRows: 1,
      filterOptions: { mimeType: { contains: 'image' } },
      admin: { description: 'As 5 primeiras aparecem no mosaico; as demais abrem em “Ver todas”.' },
    },
  ],
}

export const Video: Block = {
  slug: 'video',
  labels: label('video'),
  admin,
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Arquivo de vídeo (MP4)',
      required: true,
      filterOptions: { mimeType: { contains: 'video' } },
    },
    image('poster', 'Imagem de capa do vídeo', true),
    { name: 'caption', type: 'text', label: 'Legenda' },
  ],
}

export const Publications: Block = {
  slug: 'publications',
  labels: label('publications'),
  admin,
  fields: [
    heading(),
    {
      name: 'items',
      type: 'array',
      label: 'Publicações',
      minRows: 1,
      labels: { singular: 'Publicação', plural: 'Publicações' },
      fields: [
        { name: 'title', type: 'text', label: 'Título', required: true },
        {
          name: 'url',
          type: 'text',
          label: 'Endereço para ler',
          required: true,
          validate: (v: unknown) =>
            typeof v === 'string' && /^https:\/\//.test(v) ? true : 'Use um endereço https://',
        },
        image('cover', 'Capa (opcional)'),
      ],
    },
  ],
}

export const Ods: Block = {
  slug: 'ods',
  labels: label('ods'),
  admin,
  fields: [
    heading(),
    {
      name: 'goals',
      type: 'select',
      hasMany: true,
      label: 'ODS',
      required: true,
      options: Array.from({ length: 17 }, (_, i) => ({
        label: `ODS ${i + 1}`,
        value: String(i + 1),
      })),
    },
  ],
}

export const CtaBand: Block = {
  slug: 'ctaBand',
  labels: label('ctaBand'),
  admin,
  fields: [
    heading({ required: true }),
    { name: 'text', type: 'textarea', label: 'Texto', maxLength: 300 },
    linkGroup('link', { label: 'Botão' }),
    {
      name: 'showContacts',
      type: 'checkbox',
      label: 'Mostrar e-mail e telefones (vêm de Contato)',
      defaultValue: true,
    },
  ],
}

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: label('contactForm'),
  admin,
  fields: [
    heading(),
    intro,
    {
      name: 'note',
      type: 'ui',
      admin: {
        components: { Field: '/cms/admin/Note#Note' },
        custom: {
          text: 'Os assuntos do formulário, os e-mails que recebem as mensagens e os textos dos campos ficam em Configurações → Contato e Textos do site.',
        },
      },
    },
  ],
}

export const NewsList: Block = {
  slug: 'newsList',
  labels: label('newsList'),
  admin,
  fields: [
    heading(),
    { name: 'limit', type: 'number', label: 'Quantidade', defaultValue: 6, min: 1, max: 24 },
  ],
}

export const pageBlocks: Block[] = [
  HeroLens,
  PageIntro,
  PartnersStrip,
  ProjectIndex,
  ProofNumber,
  Cycle,
  Areas,
  RichTextBlock,
  MediaText,
  Quote,
  Figure,
  Gallery,
  Video,
  Publications,
  Ods,
  CtaBand,
  ContactForm,
  NewsList,
]

/** Blocks available in the body of a project, an area or a news story. */
export const storyBlocks: Block[] = [
  RichTextBlock,
  MediaText,
  Quote,
  Figure,
  Gallery,
  Video,
  Publications,
  ProofNumber,
]
