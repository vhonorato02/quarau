import { readFileSync } from 'node:fs'
import path from 'node:path'

import { expect, test } from './fixtures'

type Map = { redirects: Array<{ from: string; to: string }> }
const map = JSON.parse(
  readFileSync(path.resolve(process.cwd(), '../../content/legacy/url-map.json'), 'utf8'),
) as Map

for (const { from, to } of map.redirects) {
  test(`legacy ${from} → ${to}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 })
    expect([301, 308]).toContain(res.status())
    let location = res.headers().location ?? ''
    // Trailing-slash normalisation may add one hop before the permanent redirect.
    if (location && new URL(location, 'http://x').pathname !== to) {
      const next = await request.get(location, { maxRedirects: 0 })
      expect([301, 308]).toContain(next.status())
      location = next.headers().location ?? ''
    }
    expect(new URL(location, 'http://x').pathname).toBe(to)
  })
}

test('old WordPress media URLs redirect to the migrated file', async ({ request }) => {
  const res = await request.get('/wp-content/uploads/2023/12/IMG_7251-1024x683.jpg', {
    maxRedirects: 0,
  })
  expect(res.status()).toBe(301)
  expect(res.headers().location).toContain('/api/media/file/')
})
