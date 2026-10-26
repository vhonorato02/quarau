import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { anyone, editors, hasRole } from '../access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Tiny blurred WebP used as a placeholder while the real image loads. */
const generateBlur: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file
  if (!file?.data || !file.mimetype?.startsWith('image/')) return data
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

const canUpload = ({ req }: { req: { user?: unknown } }) =>
  hasRole(req.user as never, 'admin', 'editor', 'author')

/**
 * Photos, videos and PDFs. On upload, Payload creates WebP sizes; the site serves them through
 * `srcset` straight from storage (R2 in production), with no image processing per request.
 * SVG is not accepted: it can carry scripts.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Mídia', plural: 'Mídias' },
  admin: {
    group: 'Biblioteca',
    defaultColumns: ['filename', 'alt', 'needsReview', 'updatedAt'],
    listSearchableFields: ['filename', 'alt', 'caption'],
    description:
      'Fotos, vídeos e PDFs. Ao enviar uma foto, o site cria versões otimizadas sozinho. Toda imagem precisa de texto alternativo.',
  },
  access: { read: anyone, create: canUpload, update: canUpload, delete: editors },
  hooks: { beforeChange: [generateBlur] },
  upload: {
    // Local disk only when no S3/R2 is configured (dev, or the VPS volume /app/media).
    staticDir: process.env.MEDIA_DIR ?? path.resolve(dirname, '../../../media'),
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'video/mp4',
      'video/webm',
      'application/pdf',
    ],
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        formatOptions: { format: 'webp', options: { quality: 72 } },
      },
      {
        name: 'square',
        width: 800,
        height: 800,
        formatOptions: { format: 'webp', options: { quality: 76 } },
      },
      {
        name: 'sm',
        width: 640,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 76 } },
      },
      {
        name: 'md',
        width: 1024,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 78 } },
      },
      {
        name: 'lg',
        width: 1600,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 78 } },
      },
      {
        name: 'xl',
        width: 2400,
        withoutEnlargement: true,
        formatOptions: { format: 'webp', options: { quality: 78 } },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
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
      admin: {
        description:
          'Descreva o que a imagem mostra para quem não pode vê-la. Ex.: “Jovens plantam mudas na horta comunitária do Bairro Esmeralda, em Atibaia”.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Legenda',
      admin: { description: 'O que, onde e quando.' },
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Crédito (fotógrafo/autor)',
      admin: { description: 'Só com autoria confirmada.' },
    },
    {
      name: 'needsReview',
      type: 'checkbox',
      label: 'Texto alternativo precisa de revisão',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Marcado na importação quando o texto foi gerado automaticamente.',
      },
    },
    {
      name: 'legacyUrl',
      type: 'text',
      label: 'Endereço no site antigo',
      index: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'blurDataURL', type: 'text', admin: { hidden: true } },
  ],
}
