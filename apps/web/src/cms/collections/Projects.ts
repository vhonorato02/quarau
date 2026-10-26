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
  orderField,
  previewConfig,
  publishedAtField,
  summaryField,
  versionsWithDrafts,
} from './shared'

const year = (name: string, label: string, description?: string) =>
  ({
    name,
    type: 'number',
    label,
    min: 1990,
    max: 2100,
    admin: { width: '33%', description },
  }) as const

/**
 * A project ("case"). The top of the page is a record card ("ficha"): territory,
 * who carries it out, the role of Quarau and the period. Empty fields are not shown.
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projeto', plural: 'Projetos' },
  defaultSort: 'order',
  admin: {
    group: 'Conteúdo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'territory', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'territory', 'summary'],
    description:
      'Cada projeto vira uma página em /projetos/<endereço> e aparece nas listas de projetos.',
    ...previewConfig('projects'),
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
    afterChange: [revalidateCollection('projects')],
    afterDelete: [revalidateCollectionDelete('projects')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ficha',
          fields: [
            { name: 'title', type: 'text', label: 'Nome do projeto', required: true },
            summaryField,
            coverImageField('coverImage', true),
            {
              type: 'row',
              fields: [
                {
                  name: 'territory',
                  type: 'text',
                  label: 'Território (curto)',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Município e UF, como aparece nas listas. Ex.: “Atibaia, SP”.',
                  },
                },
                {
                  name: 'territoryDetail',
                  type: 'text',
                  label: 'Território (completo)',
                  admin: {
                    width: '50%',
                    description: 'Opcional. Ex.: “Bairro Esmeralda (Tanque), Atibaia, SP”.',
                  },
                },
              ],
            },
            {
              name: 'program',
              type: 'text',
              label: 'Programa (opcional)',
              admin: { description: 'Ex.: “Programa Celeo na Comunidade”.' },
            },
            {
              name: 'carriedOutBy',
              type: 'text',
              label: 'Quem realiza',
              admin: { description: 'Ex.: “CECP e Petrobras Socioambiental”.' },
            },
            {
              name: 'role',
              type: 'textarea',
              label: 'Papel da Quarau',
              maxLength: 300,
            },
            {
              type: 'row',
              fields: [
                year('startYear', 'Ano de início', 'Vazio = não exibido.'),
                year('endYear', 'Ano de término', 'Vazio = não exibido.'),
                {
                  name: 'ongoing',
                  type: 'checkbox',
                  label: 'Em andamento',
                  admin: { width: '33%', description: 'Mostra “desde <ano de início>”.' },
                },
              ],
            },
            {
              name: 'partners',
              type: 'relationship',
              relationTo: 'partners',
              hasMany: true,
              label: 'Parceiros e contratantes',
            },
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              label: 'Áreas de atuação',
            },
            {
              name: 'ods',
              type: 'select',
              hasMany: true,
              label: 'ODS do projeto',
              admin: { description: 'Só os ODS publicados pelo projeto.' },
              options: Array.from({ length: 17 }, (_, i) => ({
                label: `ODS ${i + 1}`,
                value: String(i + 1),
              })),
            },
          ],
        },
        {
          label: 'História',
          description:
            'O texto da página do projeto, montado com blocos (texto, citação, foto, galeria, vídeo…).',
          fields: [
            {
              name: 'lead',
              type: 'textarea',
              label: 'Frase de abertura',
              maxLength: 400,
              admin: {
                description: 'Aparece em destaque, ao lado do texto. A ideia central do projeto.',
              },
            },
            {
              name: 'story',
              type: 'blocks',
              label: 'Blocos da história',
              blocks: storyBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
      ],
    },
    slugField(),
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destaque',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Usado pelas listas “só destaques”.' },
    },
    orderField,
    publishedAtField,
    createdByField,
    searchTextField([
      'title',
      'summary',
      'territory',
      'territoryDetail',
      'carriedOutBy',
      'role',
      'lead',
    ]),
  ],
}
