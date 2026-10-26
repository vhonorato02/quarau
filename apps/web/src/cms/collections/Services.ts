import type { CollectionConfig } from 'payload'

import { editors, publishedOrAuthenticated } from '../access'
import { storyBlocks } from '../blocks'
import { searchTextField } from '../fields/search'
import { slugField } from '../fields/slug'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
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
    description:
      'Cada área vira uma página em /atuacao/<endereço> e aparece no bloco “Áreas de atuação”.',
    ...previewConfig('services'),
  },
  access: { read: publishedOrAuthenticated, create: editors, update: editors, delete: editors },
  versions: versionsWithDrafts,
  hooks: {
    beforeChange: [setCreatedBy],
    afterChange: [revalidateCollection('services')],
    afterDelete: [revalidateCollectionDelete('services')],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Nome da área', required: true },
    summaryField,
    coverImageField(),
    {
      name: 'deliverables',
      type: 'array',
      label: 'O que entregamos',
      labels: { singular: 'Entrega', plural: 'Entregas' },
      fields: [{ name: 'item', type: 'text', label: 'Entrega', required: true }],
    },
    {
      name: 'story',
      type: 'blocks',
      label: 'Texto da página',
      blocks: storyBlocks,
      admin: { initCollapsed: true },
    },
    slugField(),
    orderField,
    publishedAtField,
    createdByField,
    searchTextField(['title', 'summary']),
  ],
}
