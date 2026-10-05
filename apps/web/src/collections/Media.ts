import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { anyone, editors, hasRole } from '../access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Tiny blurred WebP used as `placeholder="blur"` while the real image loads. */
const generateBlur: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file
  if (!file?.data || !file.mimetype?.startsWith('image/') || file.mimetype === 'image/svg+xml')
    return data
  try {
    const sharp = (await import('sharp')).default
    const buf = await sharp(file.data)
      .resize(16, 16, { fit: 'inside' })
      .webp({ quality: 40 })
      .toBuffer()
    data.blurDataURL = `data:image/webp;base64,${buf.toString('base64')}`
  } catch (err) {
    req.payload.logger.warn({ err }, 'could not generate blur placeholder')
  }
  return data
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mídia', plural: 'Mídias' },
  admin: {
    group: 'Biblioteca',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    description:
      'Imagens e vídeos. Todo arquivo precisa de texto alternativo (descrição para leitores de tela).',
  },
  access: {
    read: anyone,
    create: ({ req }) => hasRole(req.user as never, 'admin', 'editor', 'author'),
    update: ({ req }) => hasRole(req.user as never, 'admin', 'editor', 'author'),
    delete: editors,
  },
  hooks: { beforeChange: [generateBlur] },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
    ],
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 3200, height: 3200, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 360,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 75 } },
      },
      {
        name: 'card',
        width: 1200,
        height: 900,
        position: 'centre',
        formatOptions: { format: 'webp', options: { quality: 78 } },
      },
      {
        name: 'wide',
        width: 2400,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
        formatOptions: { format: 'jpeg', options: { quality: 82 } },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
      localized: true,
      admin: {
        description:
          'Descreva o que a imagem mostra, como se contasse para alguém que não pode vê-la (ex.: “Jovens plantam mudas na horta comunitária do Bairro Esmeralda, em Atibaia”).',
      },
    },
    { name: 'caption', type: 'text', label: 'Legenda', localized: true },
    { name: 'credit', type: 'text', label: 'Crédito (fotógrafo/autor)' },
    {
      name: 'needsReview',
      type: 'checkbox',
      label: 'Texto alternativo precisa de revisão',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Marcado pela migração quando o alt foi gerado automaticamente.',
      },
    },
    {
      name: 'legacyUrl',
      type: 'text',
      label: 'URL no site antigo',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Usada para redirecionar links antigos (/wp-content/uploads/...).',
      },
    },
    { name: 'blurDataURL', type: 'text', admin: { hidden: true } },
  ],
}
