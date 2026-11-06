import { describe, expect, it } from 'vitest'

import { firstUserSignupBlocked } from '@/cms/access'

describe('firstUserSignupBlocked', () => {
  const base = { totalDocs: 0, payloadAPI: 'REST', env: {} }

  it('blocks the public "create first user" screen on an empty database', () => {
    expect(firstUserSignupBlocked(base)).toBe(true)
  })

  it('lets the server scripts (Local API) create the first administrator', () => {
    expect(firstUserSignupBlocked({ ...base, payloadAPI: 'local' })).toBe(false)
  })

  it('does not interfere once an account exists (normal create access applies)', () => {
    expect(firstUserSignupBlocked({ ...base, totalDocs: 1 })).toBe(false)
  })

  it('can be opened on purpose with ALLOW_FIRST_USER_SIGNUP=true', () => {
    expect(firstUserSignupBlocked({ ...base, env: { ALLOW_FIRST_USER_SIGNUP: 'true' } })).toBe(
      false,
    )
  })

  it('treats any other value of the flag as closed', () => {
    expect(firstUserSignupBlocked({ ...base, env: { ALLOW_FIRST_USER_SIGNUP: '1' } })).toBe(true)
  })
})
