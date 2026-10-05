import type { CollectionConfig } from 'payload'

import { authorsCanCreateDrafts, authorsOwnDrafts, editors, publishedOrAuthenticated } from '../access'
import { editor } from '../fields/richText'
import { slugField } from '../fields/slug'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { removeFromSearch, syncSearch } from '../hooks/search'
import { coverImageField, createdByField, previewConfig, publishedAtField, summaryField, versionsWithDrafts } from './shared'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Notícia', plural: 'Notícias' },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    ...previewConfig('news'),
  },
  access: { read: publishedOrAuthenticated, create: authorsCanCreateDrafts, update: authorsOwnDrafts, delete: editors },
  versions: versionsWithDrafts,
  hooks: {
    beforeChange: [setCreatedBy],
    afterChange: [revalidateCollection('news'), syncSearch('news')],
    afterDelete: [revalidateCollectionDelete('news'), removeFromSearch('news')],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true, localized: true },
    summaryField,
    coverImageField('coverImage', true),
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      defaultValue: 'noticia',
      options: [
        { label: 'Notícia', value: 'noticia' },
        { label: 'Artigo', value: 'artigo' },
        { label: 'Evento', value: 'evento' },
        { label: 'Publicação', value: 'publicacao' },
      ],
    },
    { name: 'body', type: 'richText', label: 'Texto', editor, required: true, localized: true },
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true, label: 'Projetos relacionados' },
    slugField(),
    publishedAtField,
    createdByField,
  ],
}
