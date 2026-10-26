import type { CollectionConfig } from 'payload'

import { authorsCanCreateDrafts, editors, publishedOrAuthenticated } from '../access'
import { pageBlocks } from '../blocks'
import { searchTextField } from '../fields/search'
import { slugField } from '../fields/slug'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { createdByField, previewConfig, publishedAtField, versionsWithDrafts } from './shared'

/**
 * Institutional pages assembled from blocks. Includes the listing pages
 * (Projetos, Atuação, Notícias) so that every menu item is a page of the CMS.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Monte cada página com blocos. A página com endereço “inicio” é a página inicial do site.',
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
    afterChange: [revalidateCollection('pages')],
    afterDelete: [revalidateCollectionDelete('pages')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título (no menu e na aba do navegador)',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Blocos da página',
      blocks: pageBlocks,
      minRows: 1,
      admin: { initCollapsed: true },
    },
    slugField(),
    publishedAtField,
    createdByField,
    searchTextField(['title']),
  ],
}
