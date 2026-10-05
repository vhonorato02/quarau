import type { CollectionConfig } from 'payload'

import { editors, publishedOrAuthenticated } from '../access'
import { pageBlocks } from '../blocks'
import { editor } from '../fields/richText'
import { slugField } from '../fields/slug'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { removeFromSearch, syncSearch } from '../hooks/search'
import {
  coverImageField,
  createdByField,
  orderField,
  previewConfig,
  publishedAtField,
  summaryField,
  versionsWithDrafts,
} from './shared'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Área de atuação', plural: 'Áreas de atuação' },
  defaultSort: 'order',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', '_status', 'updatedAt'],
    ...previewConfig('services'),
  },
  access: { read: publishedOrAuthenticated, create: editors, update: editors, delete: editors },
  versions: versionsWithDrafts,
  hooks: {
    beforeChange: [setCreatedBy],
    afterChange: [revalidateCollection('services'), syncSearch('services')],
    afterDelete: [revalidateCollectionDelete('services'), removeFromSearch('services')],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Nome da área', required: true, localized: true },
    summaryField,
    {
      name: 'icon',
      type: 'select',
      label: 'Ícone',
      defaultValue: 'territory',
      options: [
        { label: 'Território / socioambiental', value: 'territory' },
        { label: 'Patrimônio e pesquisa', value: 'heritage' },
        { label: 'Educação', value: 'education' },
        { label: 'Gestão de projetos', value: 'management' },
        { label: 'Difusão e comunicação', value: 'diffusion' },
      ],
    },
    coverImageField(),
    {
      name: 'deliverables',
      type: 'array',
      label: 'O que entregamos',
      labels: { singular: 'Entrega', plural: 'Entregas' },
      fields: [{ name: 'item', type: 'text', label: 'Entrega', required: true, localized: true }],
    },
    { name: 'body', type: 'richText', label: 'Descrição completa', editor, localized: true },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Blocos adicionais',
      blocks: pageBlocks,
      localized: true,
      admin: { initCollapsed: true },
    },
    slugField(),
    orderField,
    publishedAtField,
    createdByField,
  ],
}
