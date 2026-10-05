import type { CollectionConfig } from 'payload'

import { anyone, editors } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { orderField } from './shared'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Pessoa', plural: 'Equipe' },
  defaultSort: 'order',
  admin: { group: 'Institucional', useAsTitle: 'name', defaultColumns: ['name', 'role', 'order'] },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: {
    afterChange: [revalidateCollection('team')],
    afterDelete: [revalidateCollectionDelete('team')],
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true },
    { name: 'role', type: 'text', label: 'Cargo / função', required: true, localized: true },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Foto' },
    { name: 'bio', type: 'textarea', label: 'Minibiografia', localized: true, maxLength: 600 },
    { name: 'linkedin', type: 'text', label: 'LinkedIn (URL)' },
    { name: 'lattes', type: 'text', label: 'Currículo Lattes (URL)' },
    orderField,
  ],
}
