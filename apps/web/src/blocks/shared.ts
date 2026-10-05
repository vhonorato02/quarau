import type { Field } from 'payload'

export const toneField = (defaultValue: 'default' | 'alt' | 'brand' | 'dark' = 'default'): Field => ({
  name: 'tone',
  type: 'select',
  label: 'Fundo da seção',
  defaultValue,
  options: [
    { label: 'Branco', value: 'default' },
    { label: 'Cinza-claro', value: 'alt' },
    { label: 'Azul Quarau', value: 'brand' },
    { label: 'Azul-escuro', value: 'dark' },
  ],
  admin: { description: 'As cores seguem a marca. Textos e botões se ajustam automaticamente para manter o contraste.' },
})

export const sectionIntro: Field[] = [
  { name: 'eyebrow', type: 'text', label: 'Chamada curta (acima do título)', localized: true, maxLength: 60 },
  { name: 'heading', type: 'text', label: 'Título da seção', localized: true, maxLength: 140 },
]

export const anchorField: Field = {
  name: 'anchor',
  type: 'text',
  label: 'Âncora (opcional)',
  admin: { description: 'Permite linkar direto para a seção, ex.: #metodologia. Use letras minúsculas e hífens.' },
  validate: (v: unknown) => (!v || /^[a-z0-9-]+$/.test(String(v)) ? true : 'Use letras minúsculas, números e hífens.'),
}
