import type { CollectionConfig } from 'payload'

import { anyone, editors } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { orderField } from './shared'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Parceiro / cliente', plural: 'Parceiros e clientes' },
  defaultSort: 'order',
  admin: { group: 'Institucional', useAsTitle: 'name', defaultColumns: ['name', 'kind', 'order'] },
  access: { read: anyone, create: editors, update: editors, delete: editors },
  hooks: { afterChange: [revalidateCollection('partners')], afterDelete: [revalidateCollectionDelete('partners')] },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true },
    { name: 'fullName', type: 'text', label: 'Nome completo / descrição' },
    {
      name: 'kind',
      type: 'select',
      label: 'Relação',
      defaultValue: 'client',
      options: [
        { label: 'Cliente / contratante', value: 'client' },
        { label: 'Parceiro / financiador', value: 'partner' },
        { label: 'Instituição executora', value: 'executor' },
      ],
    },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
    { name: 'url', type: 'text', label: 'Site' },
    { name: 'showOnHome', type: 'checkbox', label: 'Exibir na faixa de logos', defaultValue: true },
    orderField,
  ],
}
