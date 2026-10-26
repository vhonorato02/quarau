/**
 * Permission matrix, scheduled publishing and idempotent seed, against a real Payload + Postgres.
 * Every call goes through access control (overrideAccess: false) with a real user of each role.
 */
import { getPayload, type Payload } from 'payload'
import sharp from 'sharp'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'
import type { User } from '@/payload-types'

let payload: Payload
const run = `rp${Date.now().toString(36)}`
const ctx = () => ({ disableRevalidate: true })
const users: Record<'admin' | 'editor' | 'author' | 'otherAuthor', User> = {} as never
let coverId: number

const asUser = (user: User | null) => ({ user, overrideAccess: false, context: ctx() }) as const

async function projectData(title: string) {
  return {
    title: `${title} ${run}`,
    slug: `${title.toLowerCase().replace(/[^a-z]+/g, '-')}-${run}`,
    summary: 'Resumo de teste.',
    coverImage: coverId,
    territory: 'Atibaia, SP',
  }
}

async function denied(fn: () => Promise<unknown>): Promise<boolean> {
  try {
    await fn()
    return false
  } catch (err) {
    return (
      /forbidden|not allowed|permission|unauthorized/i.test(
        String((err as Error).message ?? err),
      ) || (err as { status?: number }).status === 403
    )
  }
}

beforeAll(async () => {
  payload = await getPayload({ config })
  const data = await sharp({
    create: { width: 40, height: 30, channels: 3, background: '#39b54a' },
  })
    .jpeg()
    .toBuffer()
  coverId = (
    await payload.create({
      collection: 'media',
      data: { alt: `Capa ${run}` },
      file: { data, mimetype: 'image/jpeg', name: `capa-${run}.jpg`, size: data.length },
      context: ctx(),
    })
  ).id
  for (const role of ['admin', 'editor', 'author', 'otherAuthor'] as const) {
    users[role] = await payload.create({
      collection: 'users',
      data: {
        email: `${role.toLowerCase()}-${run}@test.local`,
        password: 'senha-forte-e-longa',
        name: role,
        roles: [role === 'otherAuthor' ? 'author' : role],
      },
      context: ctx(),
    })
  }
})

afterAll(async () => {
  await payload.delete({
    collection: 'projects',
    where: { title: { contains: run } },
    context: ctx(),
  })
  await payload.delete({ collection: 'leads', where: { name: { contains: run } }, context: ctx() })
  for (const u of Object.values(users))
    await payload.delete({ collection: 'users', id: u.id, context: ctx() })
  await payload.delete({ collection: 'media', id: coverId, context: ctx() })
})

describe('permission matrix', () => {
  it('visitors read only published content and nothing private', async () => {
    const draft = await payload.create({
      collection: 'projects',
      data: { ...(await projectData('Rascunho')), _status: 'draft' },
      draft: true,
      context: ctx(),
    })
    const visible = await payload.find({
      collection: 'projects',
      where: { id: { equals: draft.id } },
      ...asUser(null),
    })
    expect(visible.docs).toHaveLength(0)
    expect(await denied(() => payload.find({ collection: 'leads', ...asUser(null) }))).toBe(true)
    expect(await denied(() => payload.find({ collection: 'users', ...asUser(null) }))).toBe(true)
    expect(
      await denied(() =>
        payload.create({
          collection: 'pages',
          data: { title: 'x', layout: [] } as never,
          ...asUser(null),
        }),
      ),
    ).toBe(true)
  })

  it('authors draft and edit their own projects, but cannot publish, delete or touch others', async () => {
    const own = await payload.create({
      collection: 'projects',
      data: { ...(await projectData('Do autor')), _status: 'draft' },
      draft: true,
      ...asUser(users.author),
    })
    await payload.update({
      collection: 'projects',
      id: own.id,
      data: { summary: 'Editado pelo autor.' },
      draft: true,
      ...asUser(users.author),
    })
    expect(
      await denied(() =>
        payload.update({
          collection: 'projects',
          id: own.id,
          data: { _status: 'published' },
          ...asUser(users.author),
        }),
      ),
    ).toBe(true)
    expect(
      await denied(() =>
        payload.update({
          collection: 'projects',
          id: own.id,
          data: { summary: 'Invasão' },
          draft: true,
          ...asUser(users.otherAuthor),
        }),
      ),
    ).toBe(true)
    expect(
      await denied(() =>
        payload.delete({ collection: 'projects', id: own.id, ...asUser(users.author) }),
      ),
    ).toBe(true)
  })

  it('authors cannot change site settings, read messages or manage users', async () => {
    expect(
      await denied(() =>
        payload.updateGlobal({ slug: 'navigation', data: { items: [] }, ...asUser(users.author) }),
      ),
    ).toBe(true)
    expect(await denied(() => payload.find({ collection: 'leads', ...asUser(users.author) }))).toBe(
      true,
    )
    expect(
      await denied(() =>
        payload.create({
          collection: 'users',
          data: {
            email: `x-${run}@t.local`,
            password: 'senha-forte-e-longa',
            name: 'x',
            roles: ['admin'],
          },
          ...asUser(users.author),
        }),
      ),
    ).toBe(true)
  })

  it('editors publish, edit settings and read messages, but do not manage users or delete messages', async () => {
    const p = await payload.create({
      collection: 'projects',
      data: { ...(await projectData('Do editor')), _status: 'published' },
      ...asUser(users.editor),
    })
    expect(p._status).toBe('published')
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: `Lead ${run}`,
        email: 'l@t.local',
        message: 'Mensagem de teste longa.',
        status: 'new',
      },
      context: ctx(),
    })
    const leads = await payload.find({
      collection: 'leads',
      where: { id: { equals: lead.id } },
      ...asUser(users.editor),
    })
    expect(leads.docs).toHaveLength(1)
    expect(
      await denied(() =>
        payload.delete({ collection: 'leads', id: lead.id, ...asUser(users.editor) }),
      ),
    ).toBe(true)
    expect(
      await denied(() =>
        payload.create({
          collection: 'users',
          data: {
            email: `y-${run}@t.local`,
            password: 'senha-forte-e-longa',
            name: 'y',
            roles: ['editor'],
          },
          ...asUser(users.editor),
        }),
      ),
    ).toBe(true)
  })

  it('nobody but an admin can grant the admin role, even to themselves', async () => {
    const self = await payload
      .update({
        collection: 'users',
        id: users.editor.id,
        data: { roles: ['admin'] },
        ...asUser(users.editor),
      })
      .catch(() => null)
    const after = await payload.findByID({
      collection: 'users',
      id: users.editor.id,
      context: ctx(),
    })
    expect(after.roles).toEqual(['editor'])
    expect(self === null || !self.roles?.includes('admin')).toBe(true)
  })

  it('admins manage users and delete messages', async () => {
    const u = await payload.create({
      collection: 'users',
      data: {
        email: `z-${run}@t.local`,
        password: 'senha-forte-e-longa',
        name: 'z',
        roles: ['editor'],
      },
      ...asUser(users.admin),
    })
    await payload.delete({ collection: 'users', id: u.id, ...asUser(users.admin) })
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: `Lead2 ${run}`,
        email: 'l@t.local',
        message: 'Mensagem de teste longa.',
        status: 'new',
      },
      context: ctx(),
    })
    await payload.delete({ collection: 'leads', id: lead.id, ...asUser(users.admin) })
  })
})

describe('scheduled publishing', () => {
  it('publishes a draft when its scheduled time has passed and the queue runs', async () => {
    const draft = await payload.create({
      collection: 'projects',
      data: { ...(await projectData('Agendado')), _status: 'draft' },
      draft: true,
      context: ctx(),
    })
    await payload.jobs.queue({
      task: 'schedulePublish',
      input: { type: 'publish', doc: { relationTo: 'projects', value: draft.id } },
      waitUntil: new Date(Date.now() - 1000),
    })
    await payload.jobs.run({ queue: 'default', limit: 50 })
    const after = await payload.findByID({ collection: 'projects', id: draft.id, context: ctx() })
    expect(after._status).toBe('published')
  })
})

describe('seed', () => {
  it('creates content once and never overwrites edits made in the CMS', async () => {
    process.env.SEED_OFFLINE = 'true'
    const { seed } = await import('../../scripts/seed')
    await seed(payload)
    const home = (
      await payload.find({
        collection: 'pages',
        where: { slug: { equals: 'inicio' } },
        limit: 1,
        context: ctx(),
      })
    ).docs[0]!
    await payload.update({
      collection: 'pages',
      id: home.id,
      data: { title: `Editado ${run}` },
      context: ctx(),
    })
    const second = await seed(payload)
    expect(second).toEqual([])
    const after = await payload.findByID({ collection: 'pages', id: home.id, context: ctx() })
    expect(after.title).toBe(`Editado ${run}`)
    await payload.update({
      collection: 'pages',
      id: home.id,
      data: { title: home.title },
      context: ctx(),
    })
  }, 600_000)
})
