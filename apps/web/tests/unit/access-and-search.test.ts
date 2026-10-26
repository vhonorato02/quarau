import type { PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'

import {
  authorsCanCreateDrafts,
  authorsOwnDrafts,
  hasRole,
  publishedOrAuthenticated,
} from '@/access'
import { toEmbedUrl } from '@/components/blocks/Video'
import { extractText, toSearchDoc } from '@/hooks/search'

const req = (roles?: string[]) =>
  ({ user: roles ? { id: 7, roles } : null }) as unknown as PayloadRequest
type AccessArgs = Parameters<typeof publishedOrAuthenticated>[0]
const args = (roles?: string[], data?: unknown) =>
  ({ req: req(roles), data }) as unknown as AccessArgs

describe('access control', () => {
  it('detects roles', () => {
    expect(hasRole({ id: 1, roles: ['editor'] }, 'admin', 'editor')).toBe(true)
    expect(hasRole(null, 'admin')).toBe(false)
  })
  it('public sees only published content', () => {
    expect(publishedOrAuthenticated(args())).toEqual({ _status: { equals: 'published' } })
    expect(publishedOrAuthenticated(args(['author']))).toBe(true)
  })
  it('authors create drafts but cannot publish', () => {
    expect(authorsCanCreateDrafts(args(['author'], { _status: 'draft' }))).toBe(true)
    expect(authorsCanCreateDrafts(args(['author'], { _status: 'published' }))).toBe(false)
    expect(authorsCanCreateDrafts(args(['editor'], { _status: 'published' }))).toBe(true)
    expect(authorsCanCreateDrafts(args())).toBe(false)
  })
  it('authors only edit their own drafts', () => {
    expect(authorsOwnDrafts(args(['author'], { _status: 'draft' }))).toEqual({
      createdBy: { equals: 7 },
    })
    expect(authorsOwnDrafts(args(['author'], { _status: 'published' }))).toBe(false)
    expect(authorsOwnDrafts(args(['admin']))).toBe(true)
  })
})

describe('search indexing', () => {
  const doc = {
    id: 3,
    slug: 'projeto-quipa',
    title: 'Projeto Quipá',
    summary: 'Comunidades quilombolas em São João do Piauí.',
    _status: 'published',
    blockType: 'ignored',
    body: {
      root: {
        type: 'root',
        children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Casa de Farinha' }] }],
      },
    },
    coverImage: { url: '/x.webp', filename: 'x.webp', mimeType: 'image/webp' },
  }
  it('extracts text from rich text and skips technical fields', () => {
    const text = extractText(doc)
    expect(text).toContain('Casa de Farinha')
    expect(text).not.toContain('ignored')
    expect(text).not.toContain('x.webp')
  })
  it('builds a localized search document with public URL', () => {
    const s = toSearchDoc('projects', doc)
    expect(s.id).toBe('projects_3_pt')
    expect(s.url).toBe('/projetos/projeto-quipa')
    expect(s.excerpt).toBe('Comunidades quilombolas em São João do Piauí.')
    expect(s.image).toBe('/x.webp')
  })
})

describe('video embeds', () => {
  it('uses privacy-friendly embed URLs', () => {
    expect(toEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toContain(
      'youtube-nocookie.com/embed/dQw4w9WgXcQ',
    )
    expect(toEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toContain('youtube-nocookie.com')
    expect(toEmbedUrl('https://vimeo.com/123456')).toContain('player.vimeo.com/video/123456')
    expect(toEmbedUrl('https://example.com/video')).toBeNull()
  })
})
