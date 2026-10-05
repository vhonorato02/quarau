import { getPayload, type Payload } from 'payload'
import sharp from 'sharp'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'
import { searchIndex } from '@/lib/search'
import { paragraphsToLexical } from '@/utilities/lexical'

let payload: Payload
const run = Date.now().toString(36)
const ctx = () => ({ disableRevalidate: true })
let mediaId: number
let authorId: number
/** Roles given to the very first account, when this run starts on an empty database (CI). */
let firstAccountRoles: string[] | undefined

async function tinyImage(): Promise<Buffer> {
  return sharp({ create: { width: 64, height: 40, channels: 3, background: '#0089cf' } })
    .jpeg()
    .toBuffer()
}

beforeAll(async () => {
  payload = await getPayload({ config })
  const data = await tinyImage()
  const media = await payload.create({
    collection: 'media',
    data: { alt: `Imagem de teste ${run}` },
    file: { data, mimetype: 'image/jpeg', name: `teste-${run}.jpg`, size: data.length },
    context: ctx(),
  })
  mediaId = media.id
  const { totalDocs } = await payload.count({ collection: 'users' })
  if (totalDocs === 0) {
    const first = await payload.create({
      collection: 'users',
      data: {
        email: `primeiro-${run}@test.local`,
        password: 'senha-forte-123',
        name: 'Primeiro',
        roles: ['author'],
      },
      context: ctx(),
    })
    firstAccountRoles = first.roles
  }
  const author = await payload.create({
    collection: 'users',
    data: {
      email: `autor-${run}@test.local`,
      password: 'senha-forte-123',
      name: 'Autor',
      roles: ['author'],
    },
    context: ctx(),
  })
  authorId = author.id
})

afterAll(async () => {
  await payload.delete({
    collection: 'projects',
    where: { title: { contains: run } },
    context: ctx(),
  })
  await payload.delete({ collection: 'users', id: authorId, context: ctx() })
  await payload.delete({ collection: 'media', id: mediaId, context: ctx() })
})

describe('media', () => {
  it('requires alternative text', async () => {
    const data = await tinyImage()
    await expect(
      payload.create({
        collection: 'media',
        data: {} as never,
        file: { data, mimetype: 'image/jpeg', name: `sem-alt-${run}.jpg`, size: data.length },
        context: ctx(),
      }),
    ).rejects.toThrow()
  })
  it('generates a blur placeholder and image sizes', async () => {
    const m = await payload.findByID({ collection: 'media', id: mediaId })
    expect(m.blurDataURL).toMatch(/^data:image\/webp;base64,/)
    expect(m.mimeType).toBe('image/webp')
  })
})

describe('projects', () => {
  it('generates a slug and publishedAt on publish', async () => {
    const p = await payload.create({
      collection: 'projects',
      data: {
        title: `Projeto Teste Ação ${run}`,
        coverImage: mediaId,
        _status: 'published',
      } as never,
      context: ctx(),
    })
    expect(p.slug).toBe(`projeto-teste-acao-${run}`)
    expect(p.publishedAt).toBeTruthy()
  })

  it('rejects duplicated slugs', async () => {
    await expect(
      payload.create({
        collection: 'projects',
        data: {
          title: `Projeto Teste Ação ${run}`,
          coverImage: mediaId,
          _status: 'published',
        } as never,
        context: ctx(),
      }),
    ).rejects.toThrow()
  })

  it('lets authors save drafts but not publish', async () => {
    const user = await payload.findByID({ collection: 'users', id: authorId })
    const draft = await payload.create({
      collection: 'projects',
      data: { title: `Rascunho do autor ${run}`, coverImage: mediaId, _status: 'draft' },
      user,
      overrideAccess: false,
      draft: true,
      context: ctx(),
    })
    expect(draft._status).toBe('draft')
    await expect(
      payload.create({
        collection: 'projects',
        data: {
          title: `Publicação indevida ${run}`,
          coverImage: mediaId,
          _status: 'published',
        } as never,
        user,
        overrideAccess: false,
        context: ctx(),
      }),
    ).rejects.toThrow()
  })

  it('hides drafts from anonymous readers', async () => {
    const res = await payload.find({
      collection: 'projects',
      where: { title: { contains: `Rascunho do autor ${run}` } },
      overrideAccess: false,
    })
    expect(res.docs).toHaveLength(0)
  })

  it.runIf(Boolean(process.env.MEILI_HOST))(
    'indexes published projects in Meilisearch',
    async () => {
      const p = await payload.create({
        collection: 'projects',
        data: {
          title: `Indexado ${run}`,
          coverImage: mediaId,
          _status: 'published',
          body: paragraphsToLexical([`Palavra única ${run}zz`]),
        } as never,
        context: ctx(),
      })
      const doc = await searchIndex()!.getDocument(`projects_${p.id}_pt`)
      expect(doc.title).toBe(`Indexado ${run}`)
      expect(doc.url).toBe(`/projetos/indexado-${run}`)
    },
  )
})

describe('users', () => {
  it('makes the first account an administrator and keeps later roles', async () => {
    if (firstAccountRoles) expect(firstAccountRoles).toEqual(['admin'])
    const author = await payload.findByID({ collection: 'users', id: authorId })
    expect(author.roles).toEqual(['author'])
  })
})

describe('leads', () => {
  it('cannot be created through the public API', async () => {
    await expect(
      payload.create({
        collection: 'leads',
        data: { name: 'X', email: 'x@example.org', message: 'mensagem de teste' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
