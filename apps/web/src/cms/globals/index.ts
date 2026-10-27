import type { GlobalConfig } from 'payload'

import { anyone, editors } from '../access'
import { linkFields, linkGroup } from '../fields/link'
import { revalidateGlobal } from '../hooks/revalidate'
import { SiteTextsGlobal } from './site-texts'

const base = (slug: string): Pick<GlobalConfig, 'access' | 'hooks' | 'admin'> => ({
  access: { read: anyone, update: editors },
  hooks: { afterChange: [revalidateGlobal(slug)] },
  admin: { group: 'Configurações do site', hideAPIURL: true },
})

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Menu principal',
  ...base('navigation'),
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Itens do menu',
      maxRows: 6,
      labels: { singular: 'Item', plural: 'Itens' },
      admin: { description: 'Até 6 itens. Cada item aponta para uma página do site.' },
      fields: linkFields(),
    },
    linkGroup('cta', { label: 'Botão de destaque no menu', optional: true }),
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Rodapé',
  ...base('footer'),
  fields: [
    { name: 'tagline', type: 'textarea', label: 'Frase institucional', maxLength: 200 },
    {
      name: 'links',
      type: 'array',
      label: 'Links do rodapé',
      maxRows: 10,
      labels: { singular: 'Link', plural: 'Links' },
      fields: linkFields(),
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Links legais (privacidade, termos)',
      maxRows: 4,
      labels: { singular: 'Link', plural: 'Links' },
      fields: linkFields(),
    },
  ],
}

/** Organization data. Anything left blank is simply not shown on the site (nothing is invented). */
export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contato e dados da empresa',
  ...base('contact'),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Canais',
          fields: [
            { name: 'email', type: 'email', label: 'E-mail de contato', required: true },
            {
              name: 'phones',
              type: 'array',
              label: 'Telefones',
              maxRows: 4,
              labels: { singular: 'Telefone', plural: 'Telefones' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'number',
                      type: 'text',
                      label: 'Número',
                      required: true,
                      admin: { width: '60%', placeholder: '(12) 98281-3669' },
                    },
                    {
                      name: 'whatsapp',
                      type: 'checkbox',
                      label: 'Atende por WhatsApp',
                      admin: { width: '40%', description: 'Marque só se confirmado.' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'notificationEmails',
              type: 'text',
              label: 'Quem recebe as mensagens do formulário',
              admin: { description: 'E-mails separados por vírgula. Vazio = e-mail de contato.' },
            },
            {
              name: 'formSubjects',
              type: 'array',
              label: 'Assuntos do formulário',
              labels: { singular: 'Assunto', plural: 'Assuntos' },
              fields: [{ name: 'label', type: 'text', label: 'Assunto', required: true }],
            },
          ],
        },
        {
          label: 'Empresa',
          description:
            'Aparece no rodapé e nos dados para o Google. Deixe vazio o que não estiver confirmado.',
          fields: [
            { name: 'name', type: 'text', label: 'Nome de exibição', required: true },
            { name: 'legalName', type: 'text', label: 'Razão social' },
            { name: 'cnpj', type: 'text', label: 'CNPJ' },
            {
              name: 'address',
              type: 'group',
              label: 'Endereço',
              fields: [
                { name: 'street', type: 'text', label: 'Logradouro e número' },
                { name: 'district', type: 'text', label: 'Bairro' },
                {
                  type: 'row',
                  fields: [
                    { name: 'city', type: 'text', label: 'Cidade', admin: { width: '50%' } },
                    {
                      name: 'state',
                      type: 'text',
                      label: 'UF',
                      maxLength: 2,
                      admin: { width: '20%' },
                    },
                    { name: 'postalCode', type: 'text', label: 'CEP', admin: { width: '30%' } },
                  ],
                },
              ],
            },
            { name: 'foundingYear', type: 'number', label: 'Ano de fundação' },
          ],
        },
      ],
    },
  ],
}

export const Social: GlobalConfig = {
  slug: 'social',
  label: 'Redes sociais',
  ...base('social'),
  fields: [
    {
      name: 'profiles',
      type: 'array',
      label: 'Perfis',
      labels: { singular: 'Perfil', plural: 'Perfis' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'network',
              type: 'select',
              label: 'Rede',
              required: true,
              admin: { width: '30%' },
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'YouTube', value: 'youtube' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              label: 'Endereço',
              required: true,
              admin: { width: '70%' },
              validate: (v: unknown) =>
                typeof v === 'string' && /^https:\/\//.test(v) ? true : 'Use um endereço https://',
            },
          ],
        },
      ],
    },
  ],
}

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'SEO e compartilhamento',
  ...base('settings'),
  fields: [
    { name: 'siteName', type: 'text', label: 'Nome do site', required: true },
    {
      name: 'titleTemplate',
      type: 'text',
      label: 'Modelo de título',
      required: true,
      admin: { description: '%s vira o título de cada página. Ex.: “%s — Quarau”.' },
      validate: (v: unknown) => (typeof v === 'string' && v.includes('%s') ? true : 'Inclua %s.'),
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Descrição padrão (Google)',
      required: true,
      maxLength: 170,
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem padrão ao compartilhar o link',
      filterOptions: { mimeType: { contains: 'image' } },
    },
  ],
}

export const globals: GlobalConfig[] = [
  Navigation,
  Footer,
  Contact,
  Social,
  Settings,
  SiteTextsGlobal,
]
