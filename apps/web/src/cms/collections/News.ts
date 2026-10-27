import type { CollectionConfig } from 'payload'

import {
  authorsCanCreateDrafts,
  authorsOwnDrafts,
  editors,
  publishedOrAuthenticated,
} from '../access'
import { storyBlocks } from '../blocks'
import { searchTextField } from '../fields/search'
import { slugField } from '../fields/slug'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import {
  coverImageField,
  createdByField,
  previewConfig,
  publishedAtField,
  summaryField,
  versionsWithDrafts,
} from './shared'

/** News stories. The section stays hidden on the site until the first one is published. */
export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Notícia', plural: 'Notícias' },
  defaultSort: '-publishedAt',
  admin: {
    hideAPIURL: true,
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
    description: 'Enquanto não houver notícia publicada, a seção Notícias não aparece no site.',
    ...previewConfig('news'),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authorsCanCreateDrafts,
    update: authorsOwnDrafts,
    delete: editors,
  },
  versions: versionsWithDrafts,
  hooks: {
    beforeChange: [setCreatedBy],
    afterChange: [revalidateCollection('news')],
    afterDelete: [revalidateCollectionDelete('news')],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true },
    summaryField,
    coverImageField('coverImage', true),
    {
      name: 'story',
      type: 'blocks',
      labels: { singular: 'Bloco', plural: 'Blocos' },
      label: 'Texto da notícia',
      blocks: storyBlocks,
      required: true,
      minRows: 1,
      admin: { initCollapsed: false },
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Projetos relacionados',
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'Publicação original (opcional)',
      admin: { description: 'Link do post no Instagram/LinkedIn ou da matéria original.' },
    },
    slugField(),
    publishedAtField,
    createdByField,
    searchTextField(['title', 'summary']),
  ],
}
