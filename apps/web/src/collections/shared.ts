import type { CollectionConfig, Field } from 'payload'

import { populatePublishedAt } from '../hooks/fields'
import { docPath, type RoutableCollection } from '../lib/urls'

const siteUrl = () => process.env.SITE_URL ?? 'http://localhost:3000'

/** Live preview + preview button pointing at the Next.js draft-mode route. */
export function previewConfig(collection: RoutableCollection): NonNullable<CollectionConfig['admin']> {
  const url = (slug?: string | null, locale?: string) => {
    const params = new URLSearchParams({
      path: docPath(collection, slug ?? ''),
      secret: process.env.PREVIEW_SECRET ?? 'dev-preview-secret',
      ...(locale && locale !== 'pt' ? { locale } : {}),
    })
    return `${siteUrl()}/next/preview?${params.toString()}`
  }
  return {
    livePreview: {
      url: ({ data, locale }) => url(data?.slug as string | undefined, locale?.code),
    },
    preview: (doc, { locale }) => url(doc?.slug as string | undefined, locale),
  }
}

export const versionsWithDrafts: CollectionConfig['versions'] = {
  maxPerDoc: 50,
  drafts: {
    autosave: { interval: 800 },
    schedulePublish: true,
    validate: false,
  },
}

export const publishedAtField: Field = {
  name: 'publishedAt',
  type: 'date',
  label: 'Data de publicação',
  admin: {
    position: 'sidebar',
    date: { pickerAppearance: 'dayAndTime', displayFormat: 'dd/MM/yyyy HH:mm' },
    description: 'Preenchida automaticamente na primeira publicação.',
  },
  hooks: { beforeChange: [populatePublishedAt] },
}

export const createdByField: Field = {
  name: 'createdBy',
  type: 'relationship',
  relationTo: 'users',
  label: 'Criado por',
  admin: { position: 'sidebar', readOnly: true },
  access: { update: () => false },
}

export const coverImageField = (name = 'coverImage', required = false): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  label: 'Imagem de capa',
  required,
  filterOptions: { mimeType: { contains: 'image' } },
})

export const summaryField: Field = {
  name: 'summary',
  type: 'textarea',
  label: 'Resumo',
  localized: true,
  maxLength: 280,
  admin: { description: 'Uma ou duas frases. Aparece em listagens, na busca e como descrição padrão para o Google.' },
}

export const orderField: Field = {
  name: 'order',
  type: 'number',
  label: 'Ordem',
  defaultValue: 100,
  admin: { position: 'sidebar', description: 'Números menores aparecem primeiro.' },
}
