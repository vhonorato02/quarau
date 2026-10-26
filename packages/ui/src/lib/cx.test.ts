import { describe, expect, it } from 'vitest'

import { ODS, isOdsNumber } from './ods'
import { cx } from './cx'

describe('cx', () => {
  it('joins truthy class names', () => {
    expect(cx('a', false, null, undefined, 'b')).toBe('a b')
  })
})

describe('ODS', () => {
  it('has the 17 goals with official colours', () => {
    expect(Object.keys(ODS)).toHaveLength(17)
    for (const goal of Object.values(ODS)) expect(goal.color).toMatch(/^#[0-9A-F]{6}$/i)
    expect(isOdsNumber(4)).toBe(true)
    expect(isOdsNumber(18)).toBe(false)
  })
})
