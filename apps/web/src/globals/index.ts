import type { GlobalConfig } from 'payload'

import { anyone, editors } from '../access'
import { linkFields } from '../fields/link'
import { revalidateGlobal } from '../hooks/revalidate'

const base = (slug: string): Pick<GlobalConfig, 'access' | 'hooks' | 'admin'> => ({
  access: { read: anyone, update: editors },
  hooks: { afterChange: [revalidateGlobal(slug)] },
  admin: { group: 'Configurações do site' },
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
      maxRows: 7,
      labels: { singular: 'Item', plural: 'Itens' },
      admin: { description: 'Até 7 itens para manter o menu legível.' },
      fields: linkFields(),
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Botão de destaque no menu',
      admin: { description: 'Deixe o texto vazio para não exibir o botão.' },
      fields: linkFields({ optional: true }),
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Rodapé',
  ...base('footer'),
  fields: [
    { name: 'tagline', type: 'textarea', label: 'Frase institucional', localized: true },
    {
      name: 'columns',
      type: 'array',
      label: 'Colunas de links',
      maxRows: 3,
      labels: { singular: 'Coluna', plural: 'Colunas' },
      fields: [
        { name: 'title', type: 'text', label: 'Título da coluna', required: true, localized: true },
        { name: 'links', type: 'array', label: 'Links', fields: linkFields() },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Links legais (privacidade, cookies…)',
      fields: linkFields(),
    },
  ],
}

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contato',
  ...base('contact'),
  fields: [
    { name: 'companyName', type: 'text', label: 'Razão social / nome', defaultValue: 'Quarau Projetos Socioambientais, Educativos e Culturais' },
    { name: 'cnpj', type: 'text', label: 'CNPJ' },
    { name: 'email', type: 'email', label: 'E-mail principal', required: true },
    {
      name: 'phones',
      type: 'array',
      label: 'Telefones',
      fields: [
        { name: 'number', type: 'text', label: 'Número', required: true, admin: { placeholder: '(12) 98281-3669' } },
        { name: 'whatsapp', type: 'checkbox', label: 'Atende por WhatsApp' },
      ],
    },
    {
      name: 'address',
      type: 'group',
      label: 'Endereço',
      fields: [
        { name: 'street', type: 'text', label: 'Logradouro e número' },
        { name: 'district', type: 'text', label: 'Bairro' },
        { name: 'city', type: 'text', label: 'Cidade', defaultValue: 'São José dos Campos' },
        { name: 'state', type: 'text', label: 'UF', defaultValue: 'SP' },
        { name: 'postalCode', type: 'text', label: 'CEP' },
        { name: 'lat', type: 'number', label: 'Latitude' },
        { name: 'lng', type: 'number', label: 'Longitude' },
      ],
    },
    { name: 'hours', type: 'text', label: 'Horário de atendimento', localized: true },
    {
      name: 'formSubjects',
      type: 'array',
      label: 'Assuntos do formulário',
      labels: { singular: 'Assunto', plural: 'Assuntos' },
      fields: [{ name: 'label', type: 'text', label: 'Assunto', required: true, localized: true }],
    },
    {
      name: 'notificationEmails',
      type: 'text',
      label: 'Quem recebe as mensagens do formulário',
      admin: { description: 'E-mails separados por vírgula. Vazio = e-mail principal.' },
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
      fields: [
        {
          name: 'network',
          type: 'select',
          label: 'Rede',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        { name: 'url', type: 'text', label: 'URL', required: true },
        { name: 'handle', type: 'text', label: 'Nome de usuário (ex.: @quarau.consultoria)' },
      ],
    },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'SEO e configurações gerais',
  ...base('site-settings'),
  fields: [
    { name: 'siteName', type: 'text', label: 'Nome do site', defaultValue: 'Quarau', required: true },
    {
      name: 'titleTemplate',
      type: 'text',
      label: 'Modelo de título',
      defaultValue: '%s — Quarau',
      admin: { description: '%s é substituído pelo título de cada página.' },
    },
    { name: 'defaultDescription', type: 'textarea', label: 'Descrição padrão', localized: true, maxLength: 170 },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media', label: 'Imagem padrão de compartilhamento' },
    {
      name: 'organization',
      type: 'group',
      label: 'Dados para o Google (JSON-LD)',
      fields: [
        { name: 'legalName', type: 'text', label: 'Nome jurídico' },
        { name: 'foundingYear', type: 'number', label: 'Ano de fundação' },
        { name: 'areaServed', type: 'text', label: 'Área de atuação geográfica', defaultValue: 'Brasil' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics (Umami)',
      fields: [
        { name: 'umamiWebsiteId', type: 'text', label: 'ID do site no Umami' },
        { name: 'umamiScriptUrl', type: 'text', label: 'URL do script', defaultValue: '/stats/script.js' },
      ],
    },
    {
      name: 'announcement',
      type: 'group',
      label: 'Aviso no topo do site',
      fields: [
        { name: 'enabled', type: 'checkbox', label: 'Exibir aviso' },
        { name: 'text', type: 'text', label: 'Texto', localized: true },
        { name: 'link', type: 'group', label: 'Link', fields: linkFields({ optional: true }) },
      ],
    },
  ],
}

export const globals: GlobalConfig[] = [Navigation, Footer, Contact, Social, SiteSettings]
