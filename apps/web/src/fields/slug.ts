import type { Field, FieldHook } from 'payload'

export const slugify = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' e ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/g, '')

const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data, originalDoc, operation }) => {
    if (typeof value === 'string' && value.trim().length > 0) return slugify(value)
    if (operation === 'create' || !originalDoc?.slug) {
      const fallback = data?.[fallbackField] ?? originalDoc?.[fallbackField]
      if (typeof fallback === 'string') return slugify(fallback)
    }
    return value
  }

export const slugField = (fallbackField = 'title'): Field => ({
  name: 'slug',
  label: 'Endereço (slug)',
  type: 'text',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description:
      'Parte final do endereço da página. Gerado a partir do título; use apenas letras, números e hífens.',
  },
  hooks: { beforeValidate: [formatSlug(fallbackField)] },
  validate: (val: unknown) =>
    typeof val === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val)
      ? true
      : 'Use apenas letras minúsculas, números e hífens.',
})
