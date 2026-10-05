import type { CollectionConfig } from 'payload'

import { adminsFieldLevel, adminsOrSelf, admins, ROLES } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles'],
    group: 'Configurações',
  },
  access: {
    read: adminsOrSelf,
    create: admins,
    update: adminsOrSelf,
    delete: admins,
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true },
    {
      name: 'roles',
      type: 'select',
      label: 'Papéis',
      hasMany: true,
      required: true,
      defaultValue: ['author'],
      saveToJWT: true,
      access: { update: adminsFieldLevel, create: adminsFieldLevel },
      options: ROLES.map((r) => ({
        value: r,
        label: { admin: 'Administrador', editor: 'Editor', author: 'Autor' }[r],
      })),
      admin: {
        description:
          'Administrador: tudo, inclusive usuários e configurações. Editor: cria, edita e publica conteúdo. Autor: cria rascunhos de notícias e projetos para revisão.',
      },
    },
  ],
}
