import type { CollectionConfig } from 'payload'

import { admins, editors, nobody } from '../access'

/**
 * Contact form submissions. Created only by the server action (overrideAccess),
 * never through the public API. Personal data: see docs/cms.md (LGPD).
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Contato recebido', plural: 'Contatos recebidos' },
  defaultSort: '-createdAt',
  admin: {
    group: 'Relacionamento',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    description: 'Mensagens enviadas pelo formulário do site. Dados pessoais: trate conforme a LGPD.',
  },
  access: { read: editors, create: nobody, update: editors, delete: admins },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Nome', required: true, admin: { width: '50%', readOnly: true } },
        { name: 'email', type: 'email', label: 'E-mail', required: true, admin: { width: '50%', readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', label: 'Telefone', admin: { width: '50%', readOnly: true } },
        { name: 'organization', type: 'text', label: 'Organização', admin: { width: '50%', readOnly: true } },
      ],
    },
    { name: 'subject', type: 'text', label: 'Assunto', admin: { readOnly: true } },
    { name: 'message', type: 'textarea', label: 'Mensagem', required: true, admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      label: 'Situação',
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Em atendimento', value: 'in_progress' },
        { label: 'Respondido', value: 'answered' },
        { label: 'Arquivado', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', label: 'Anotações internas', admin: { position: 'sidebar' } },
    {
      name: 'meta',
      type: 'group',
      label: 'Dados técnicos',
      admin: { readOnly: true },
      fields: [
        { name: 'consent', type: 'checkbox', label: 'Consentiu com a política de privacidade' },
        { name: 'sourcePath', type: 'text', label: 'Página de origem' },
        { name: 'locale', type: 'text', label: 'Idioma' },
        { name: 'ipHash', type: 'text', label: 'IP (hash)' },
        { name: 'userAgent', type: 'text', label: 'Navegador' },
        { name: 'emailDelivered', type: 'checkbox', label: 'Notificação por e-mail enviada' },
      ],
    },
  ],
}
