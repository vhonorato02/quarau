import type { CollectionConfig } from 'payload'

import { authorsCanCreateDrafts, editors, publishedOrAuthenticated } from '../access'
import { pageBlocks } from '../blocks'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { removeFromSearch, syncSearch } from '../hooks/search'
import { slugField } from '../fields/slug'
import { createdByField, previewConfig, publishedAtField, versionsWithDrafts } from './shared'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Páginas institucionais montadas com blocos. A página com endereço “inicio” é a home.',
    ...previewConfig('pages'),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authorsCanCreateDrafts,
    update: editors,
    delete: editors,
  },
  versions: versionsWithDrafts,
  hooks: {
    beforeChange: [setCreatedBy],
    afterChange: [revalidateCollection('pages'), syncSearch('pages')],
    afterDelete: [revalidateCollectionDelete('pages'), removeFromSearch('pages')],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true, localized: true },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Blocos da página',
      blocks: pageBlocks,
      localized: true,
      admin: { initCollapsed: true },
    },
    slugField(),
    publishedAtField,
    createdByField,
  ],
}
