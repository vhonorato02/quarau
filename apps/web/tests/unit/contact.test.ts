import { beforeEach, describe, expect, it } from 'vitest'

import { contactSchema } from '@/lib/contact-schema'
import { _resetMemoryLimiter, rateLimit } from '@/lib/rate-limit'

const valid = {
  name: 'Maria Souza',
  email: 'maria@example.org',
  message: 'Gostaria de conversar sobre um projeto.',
  consent: 'on',
}

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })
  it('requires consent (LGPD)', () => {
    const r = contactSchema.safeParse({ ...valid, consent: undefined })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0]?.path).toEqual(['consent'])
  })
  it('rejects invalid e-mail and short messages', () => {
    const r = contactSchema.safeParse({ ...valid, email: 'nope', message: 'oi' })
    expect(r.success).toBe(false)
    const paths = r.error!.issues.map((i) => i.path[0])
    expect(paths).toContain('email')
    expect(paths).toContain('message')
  })
  it('flags a filled honeypot', () => {
    const r = contactSchema.safeParse({ ...valid, website: 'http://spam' })
    expect(r.success).toBe(false)
    expect(r.error!.issues[0]!.path).toEqual(['website'])
  })
})

describe('rateLimit (memory fallback)', () => {
  beforeEach(() => {
    delete process.env.REDIS_URL
    _resetMemoryLimiter()
  })
  it('allows up to the limit then blocks', async () => {
    const results = []
    for (let i = 0; i < 4; i++) results.push((await rateLimit('t:1', 3, 60)).ok)
    expect(results).toEqual([true, true, true, false])
  })
  it('keeps keys independent', async () => {
    await rateLimit('t:a', 1, 60)
    expect((await rateLimit('t:a', 1, 60)).ok).toBe(false)
    expect((await rateLimit('t:b', 1, 60)).ok).toBe(true)
  })
})
