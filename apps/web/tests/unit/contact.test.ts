import { beforeEach, describe, expect, it, vi } from 'vitest'

import { contactSchema } from '@/lib/contact-schema'
import { handleContact, type ContactDeps } from '@/server/contact/service'
import { createMemoryRateLimiter } from '@/server/rate-limit'

const valid = {
  name: 'Maria Souza',
  email: 'maria@example.org',
  message: 'Gostaria de conversar sobre um projeto socioambiental.',
  consent: 'on',
  subject: 'Elaboração de projeto',
  sourcePath: '/contato',
}

function deps(overrides: Partial<ContactDeps> = {}): ContactDeps {
  return {
    rateLimiter: createMemoryRateLimiter(),
    verifyHuman: vi.fn(async () => true),
    storeLead: vi.fn(async () => ({ id: 42 })),
    markDelivered: vi.fn(async () => {}),
    notify: vi.fn(async () => {}),
    hashIp: (ip) => `h${ip.length}`,
    onError: vi.fn(),
    ...overrides,
  }
}
const ctx = { ip: '203.0.113.9', userAgent: 'Vitest', turnstileToken: 'tok' }

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })
  it('requires consent (LGPD)', () => {
    const r = contactSchema.safeParse({ ...valid, consent: undefined })
    expect(r.error?.issues.map((i) => i.path[0])).toContain('consent')
  })
  it('rejects an invalid e-mail and a short message', () => {
    const paths = contactSchema
      .safeParse({ ...valid, email: 'nope', message: 'oi' })
      .error!.issues.map((i) => i.path[0])
    expect(paths).toEqual(expect.arrayContaining(['email', 'message']))
  })
  it('trims and limits sizes', () => {
    const r = contactSchema.safeParse({ ...valid, name: '  Ana  ', message: 'x'.repeat(5001) })
    expect(r.success).toBe(false)
    expect(contactSchema.parse({ ...valid, name: '  Ana  ' }).name).toBe('Ana')
  })
})

describe('handleContact', () => {
  let d: ContactDeps
  beforeEach(() => {
    d = deps()
  })

  it('stores the lead, notifies the team and reports success', async () => {
    const res = await handleContact(valid, ctx, d)
    expect(res).toEqual({ status: 'success' })
    expect(d.storeLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Maria Souza',
        email: 'maria@example.org',
        subject: 'Elaboração de projeto',
        status: 'new',
        meta: expect.objectContaining({ consent: true, ipHash: 'h11', sourcePath: '/contato' }),
      }),
    )
    expect(d.notify).toHaveBeenCalledWith(
      expect.objectContaining({ id: 42, email: 'maria@example.org' }),
    )
    expect(d.markDelivered).toHaveBeenCalledWith(42)
  })

  it('never stores the raw IP address', async () => {
    await handleContact(valid, ctx, d)
    expect(JSON.stringify(vi.mocked(d.storeLead).mock.calls)).not.toContain('203.0.113.9')
  })

  it('returns field errors for invalid input and stores nothing', async () => {
    const res = await handleContact({ ...valid, email: 'x', consent: undefined }, ctx, d)
    expect(res).toMatchObject({ status: 'error', code: 'invalid' })
    if (res.status === 'error')
      expect(Object.keys(res.fieldErrors ?? {})).toEqual(
        expect.arrayContaining(['email', 'consent']),
      )
    expect(d.storeLead).not.toHaveBeenCalled()
  })

  it('pretends success to bots that fill the honeypot, storing nothing', async () => {
    const res = await handleContact({ ...valid, website: 'http://spam.example' }, ctx, d)
    expect(res).toEqual({ status: 'success' })
    expect(d.storeLead).not.toHaveBeenCalled()
  })

  it('limits repeated submissions from the same address', async () => {
    for (let i = 0; i < 3; i++) expect((await handleContact(valid, ctx, d)).status).toBe('success')
    expect(await handleContact(valid, ctx, d)).toEqual({ status: 'error', code: 'rateLimited' })
    expect(d.storeLead).toHaveBeenCalledTimes(3)
  })

  it('rejects when the anti-spam check fails', async () => {
    d = deps({ verifyHuman: vi.fn(async () => false) })
    expect(await handleContact(valid, ctx, d)).toEqual({ status: 'error', code: 'captcha' })
    expect(d.storeLead).not.toHaveBeenCalled()
  })

  it('keeps the lead and reports success when the e-mail fails', async () => {
    d = deps({ notify: vi.fn(async () => Promise.reject(new Error('smtp down'))) })
    expect(await handleContact(valid, ctx, d)).toEqual({ status: 'success' })
    expect(d.storeLead).toHaveBeenCalledOnce()
    expect(d.markDelivered).not.toHaveBeenCalled()
    expect(d.onError).toHaveBeenCalled()
  })

  it('reports a server error when the lead cannot be stored', async () => {
    d = deps({ storeLead: vi.fn(async () => Promise.reject(new Error('db down'))) })
    expect(await handleContact(valid, ctx, d)).toEqual({ status: 'error', code: 'server' })
    expect(d.notify).not.toHaveBeenCalled()
  })
})

describe('memory rate limiter', () => {
  it('opens a new window after it expires', async () => {
    let now = 0
    const rl = createMemoryRateLimiter(() => now)
    expect((await rl.hit('k', 1, 60)).ok).toBe(true)
    expect((await rl.hit('k', 1, 60)).ok).toBe(false)
    now = 61_000
    expect((await rl.hit('k', 1, 60)).ok).toBe(true)
  })
})
