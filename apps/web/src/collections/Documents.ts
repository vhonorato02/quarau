import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CollectionConfig } from 'payload'

import { anyone, editors } from '../access'
import { orderField } from './shared'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Documento', plural: 'Documentos e downloads' },
  admin: {
    group: 'Biblioteca',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'filename', 'updatedAt'],
  },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  upload: {
    staticDir: path.resolve(dirname, '../../media/documents'),
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
    ],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true, localized: true },
    { name: 'description', type: 'textarea', label: 'Descrição', localized: true },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      defaultValue: 'publicacao',
      options: [
        { label: 'Publicação', value: 'publicacao' },
        { label: 'Relatório', value: 'relatorio' },
        { label: 'Institucional', value: 'institucional' },
        { label: 'Edital', value: 'edital' },
      ],
    },
    orderField,
  ],
}
