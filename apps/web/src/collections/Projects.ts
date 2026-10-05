import type { CollectionConfig } from 'payload'

import { authorsCanCreateDrafts, authorsOwnDrafts, editors, publishedOrAuthenticated } from '../access'
import { editor } from '../fields/richText'
import { slugField } from '../fields/slug'
import { setCreatedBy } from '../hooks/fields'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { removeFromSearch, syncSearch } from '../hooks/search'
import { coverImageField, createdByField, previewConfig, publishedAtField, summaryField, versionsWithDrafts } from './shared'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projeto', plural: 'Projetos (cases)' },
  defaultSort: '-startYear',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'startYear', 'featured', '_status'],
    ...previewConfig('projects'),
  },
  access: { read: publishedOrAuthenticated, create: authorsCanCreateDrafts, update: authorsOwnDrafts, delete: editors },
  versions: versionsWithDrafts,
  hooks: {
    beforeChange: [setCreatedBy],
    afterChange: [revalidateCollection('projects'), syncSearch('projects')],
    afterDelete: [revalidateCollectionDelete('projects'), removeFromSearch('projects')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Resumo',
          fields: [
            { name: 'title', type: 'text', label: 'Nome do projeto', required: true, localized: true },
            summaryField,
            coverImageField('coverImage', true),
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', label: 'Cliente / realizador', admin: { width: '50%' } },
                { name: 'location', type: 'text', label: 'Local', localized: true, admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'startYear', type: 'number', label: 'Ano de início', admin: { width: '33%' } },
                { name: 'endYear', type: 'number', label: 'Ano de término', admin: { width: '33%', description: 'Vazio = em andamento' } },
                {
                  name: 'role',
                  type: 'text',
                  label: 'Papel da Quarau',
                  localized: true,
                  admin: { width: '33%', placeholder: 'Consultoria, gestão, pesquisa…' },
                },
              ],
            },
            { name: 'partners', type: 'relationship', relationTo: 'partners', hasMany: true, label: 'Parceiros e financiadores' },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Áreas de atuação' },
            {
              name: 'ods',
              type: 'select',
              hasMany: true,
              label: 'ODS atendidos',
              options: Array.from({ length: 17 }, (_, i) => ({ label: `ODS ${i + 1}`, value: String(i + 1) })),
            },
            { name: 'featured', type: 'checkbox', label: 'Destacar na home', defaultValue: false },
          ],
        },
        {
          label: 'Conteúdo',
          fields: [
            {
              name: 'highlights',
              type: 'array',
              label: 'Resultados em números',
              maxRows: 4,
              labels: { singular: 'Resultado', plural: 'Resultados' },
              admin: { description: 'Somente números comprovados (relatórios, prestação de contas).' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', label: 'Número', required: true, admin: { width: '30%' } },
                    { name: 'label', type: 'text', label: 'Descrição', required: true, localized: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
            { name: 'body', type: 'richText', label: 'Texto do projeto', editor, localized: true },
            {
              name: 'quote',
              type: 'group',
              label: 'Citação em destaque',
              fields: [
                { name: 'text', type: 'textarea', label: 'Texto', localized: true },
                { name: 'source', type: 'text', label: 'Fonte / autor', localized: true },
              ],
            },
            {
              name: 'publications',
              type: 'array',
              label: 'Publicações e links',
              labels: { singular: 'Publicação', plural: 'Publicações' },
              fields: [
                { name: 'label', type: 'text', label: 'Título', required: true, localized: true },
                { name: 'url', type: 'text', label: 'URL', required: true },
                { name: 'cover', type: 'upload', relationTo: 'media', label: 'Capa' },
              ],
            },
          ],
        },
        {
          label: 'Mídia',
          fields: [
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              label: 'Vídeo',
              filterOptions: { mimeType: { contains: 'video' } },
            },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, label: 'Galeria de fotos' },
          ],
        },
      ],
    },
    slugField(),
    publishedAtField,
    createdByField,
  ],
}
