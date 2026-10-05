import type { Field, GroupField } from 'payload'

export const LINKABLE = ['pages', 'projects', 'services', 'news'] as const

export const linkFields = ({
  withAppearance = false,
  optional = false,
}: { withAppearance?: boolean; optional?: boolean } = {}): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'type',
        type: 'radio',
        label: 'Tipo de link',
        defaultValue: 'internal',
        options: [
          { label: 'Página do site', value: 'internal' },
          { label: 'Endereço externo', value: 'external' },
        ],
        admin: { layout: 'horizontal', width: '50%' },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Abrir em nova aba',
        admin: { width: '50%', style: { alignSelf: 'flex-end' } },
      },
    ],
  },
  {
    name: 'reference',
    type: 'relationship',
    label: 'Conteúdo',
    relationTo: [...LINKABLE],
    maxDepth: 1,
    admin: { condition: (_, s) => s?.type !== 'external' },
    validate: (val: unknown, { siblingData }: { siblingData: { type?: string; label?: string } }) =>
      siblingData?.type === 'external' || val || (optional && !siblingData?.label)
        ? true
        : 'Escolha o conteúdo de destino.',
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    admin: { condition: (_, s) => s?.type === 'external' },
    validate: (val: unknown, { siblingData }: { siblingData: { type?: string; label?: string } }) => {
      if (siblingData?.type !== 'external') return true
      if (optional && !siblingData?.label) return true
      return typeof val === 'string' && /^(https?:\/\/|mailto:|tel:|\/)/.test(val)
        ? true
        : 'Informe uma URL começando com https://, mailto:, tel: ou /'
    },
  },
  { name: 'label', type: 'text', label: 'Texto do link', required: !optional, localized: true },
  ...(withAppearance
    ? [
        {
          name: 'appearance',
          type: 'select',
          label: 'Aparência',
          defaultValue: 'primary',
          options: [
            { label: 'Botão principal', value: 'primary' },
            { label: 'Botão secundário', value: 'secondary' },
            { label: 'Link de texto', value: 'link' },
          ],
        } satisfies Field,
      ]
    : []),
]

export const linkGroup = (
  name = 'link',
  opts: { withAppearance?: boolean; optional?: boolean; label?: string } = {},
): GroupField => ({
  name,
  type: 'group',
  label: opts.label ?? 'Link',
  admin: { hideGutter: true },
  fields: linkFields(opts),
})
