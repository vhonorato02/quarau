import type { CollectionConfig, Field } from 'payload'

import { siteUrl } from '../../lib/platform-env'
import { docPath, type RoutableCollection } from '../../lib/urls'
import { populatePublishedAt } from '../hooks/fields'

/**
 * Live preview and the "Visualizar" button open the page in Next.js draft mode.
 * The preview route checks the editor's Payload session; no secret travels in the URL.
 */
export function previewConfig(
  collection: RoutableCollection,
): NonNullable<CollectionConfig['admin']> {
  const url = (slug?: string | null) =>
    `${siteUrl()}/next/preview?${new URLSearchParams({ path: docPath(collection, slug ?? '') })}`
  return {
    livePreview: { url: ({ data }) => url(data?.slug as string | undefined) },
    preview: (doc) => url(doc?.slug as string | undefined),
  }
}

export const versionsWithDrafts: CollectionConfig['versions'] = {
  maxPerDoc: 30,
  drafts: {
    // Autosave only after the first manual save: "Criar novo" no longer leaves empty drafts behind.
    // No autosave: in production builds an autosave racing the form-state request left new blocks blank.
    // Editors save with "Salvar rascunho" and publish with "Publicar alterações" (clearer for non-technical staff).
    autosave: false,
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
  admin: { position: 'sidebar', readOnly: true, condition: (data) => Boolean(data?.createdBy) },
  access: { update: () => false },
}

export const coverImageField = (name = 'coverImage', required = false): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  label: 'Imagem de capa',
  required,
  filterOptions: { mimeType: { contains: 'image' } },
  admin: { description: 'Foto real do projeto. Aparece nas listas e ao compartilhar o link.' },
})

export const summaryField: Field = {
  name: 'summary',
  type: 'textarea',
  label: 'Resumo',
  required: true,
  maxLength: 300,
  admin: {
    description:
      'Uma ou duas frases. Aparece nas listas, na busca e como descrição no Google se o SEO ficar vazio.',
  },
}

export const orderField: Field = {
  name: 'order',
  type: 'number',
  label: 'Ordem',
  defaultValue: 100,
  admin: { position: 'sidebar', description: 'Números menores aparecem primeiro.' },
}
