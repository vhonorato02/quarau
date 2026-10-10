import type { CollectionConfig } from 'payload'

import { editors, publishedOrAuthenticated } from '../access'
import { editor } from '../fields/richText'
import { slugField } from '../fields/slug'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { previewConfig, publishedAtField, summaryField, versionsWithDrafts } from './shared'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Vaga', plural: 'Vagas' },
  defaultSort: '-publishedAt',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'opening', '_status'],
    ...previewConfig('jobs'),
  },
  access: { read: publishedOrAuthenticated, create: editors, update: editors, delete: editors },
  versions: versionsWithDrafts,
  hooks: {
    afterChange: [revalidateCollection('jobs')],
    afterDelete: [revalidateCollectionDelete('jobs')],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Título da vaga', required: true, localized: true },
    summaryField,
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          defaultValue: 'pj',
          options: [
            { label: 'CLT', value: 'clt' },
            { label: 'PJ / Consultoria', value: 'pj' },
            { label: 'Estágio', value: 'estagio' },
            { label: 'Temporário / por projeto', value: 'temporario' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Local',
          localized: true,
          admin: { width: '33%' },
        },
        {
          name: 'opening',
          type: 'select',
          label: 'Situação',
          defaultValue: 'open',
          options: [
            { label: 'Inscrições abertas', value: 'open' },
            { label: 'Encerrada', value: 'closed' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
    {
      name: 'closingDate',
      type: 'date',
      label: 'Inscrições até',
      admin: { date: { displayFormat: 'dd/MM/yyyy' } },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descrição, requisitos e benefícios',
      editor,
      required: true,
      localized: true,
    },
    {
      name: 'applyUrl',
      type: 'text',
      label: 'Como se candidatar (URL ou e-mail)',
      required: true,
      admin: {
        description:
          'Ex.: mailto:contato@quarau.com.br?subject=Vaga ou link de formulário externo.',
      },
    },
    slugField(),
    publishedAtField,
  ],
}
