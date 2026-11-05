import { describe, expect, it } from 'vitest'

import { projects } from '../../scripts/seed/content'
import { curatedNews, curatedNewsStory } from '../../scripts/seed/news'

describe('arquivo editorial de publicações públicas', () => {
  it('não contém slugs duplicados nem matérias sem projeto e capa existentes', () => {
    const slugs = curatedNews.map((item) => item.slug)
    const projectSlugs = new Set(projects.map((project) => project.slug))

    expect(new Set(slugs).size).toBe(slugs.length)
    expect(curatedNews.length).toBeGreaterThan(0)
    for (const item of curatedNews) {
      expect(projectSlugs.has(item.projectSlug)).toBe(true)
      expect(item.title.trim().length).toBeGreaterThan(10)
      expect(item.summary.trim().length).toBeLessThanOrEqual(300)
      expect(item.paragraphs.length).toBeGreaterThanOrEqual(2)
      expect(item.paragraphs.every((paragraph) => paragraph.trim().length > 40)).toBe(true)
      if (item.sourceUrl) expect(new URL(item.sourceUrl).protocol).toBe('https:')
    }
  })

  it('gera um bloco Lexical por notícia, com parágrafos realmente persistíveis', () => {
    for (const item of curatedNews) {
      const [block] = curatedNewsStory(item)
      expect(block?.blockType).toBe('richText')
      expect(block?.body.root.children).toHaveLength(item.paragraphs.length)
      expect(block?.body.root.children[0]).toMatchObject({ type: 'paragraph' })
    }
  })
})
