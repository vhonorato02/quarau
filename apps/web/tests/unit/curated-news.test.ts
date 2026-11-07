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

  it('só publica o que tem fonte verificável e nunca cita perfil pessoal como fonte', () => {
    for (const item of curatedNews) {
      if (item.sourceUrl) expect(new URL(item.sourceUrl).pathname.startsWith('/in/')).toBe(false)
      if (item.status !== 'draft') expect(item.verifiedBy.length).toBeGreaterThan(0)
      else expect(item.pendingCheck?.trim().length ?? 0).toBeGreaterThan(20)
    }
  })

  it('publica o mutirão e a jornada formativa com a confirmação do dono como fonte', () => {
    const bySlug = new Map(curatedNews.map((item) => [item.slug, item]))
    for (const slug of [
      'ecomuseu-mutirao-rio-alambari',
      'jornada-formativa-ecomuseu-quarta-edicao',
    ]) {
      const item = bySlug.get(slug)
      expect(item?.status ?? 'published').toBe('published')
      expect(item?.verifiedBy.some((v) => v.includes('Confirmado pelo dono'))).toBe(true)
      expect(item?.paragraphs.join(' ')).not.toMatch(
        /segundo o relato|anunciad|não como resultados/i,
      )
    }
    expect(curatedNews.filter((item) => item.status !== 'draft').length).toBe(7)
  })

  it('publica o reconhecimento do Cortejo sem capa e com a nota oficial do IPHAN como fonte', () => {
    const item = curatedNews.find((n) => n.slug === 'cortejo-da-cavalaria-patrimonio-cultural')
    expect(item?.status ?? 'published').toBe('published')
    expect(item?.noCover).toBe(true)
    expect(item?.sourceUrl).toMatch(/^https:\/\/www\.gov\.br\/iphan\//)
    expect(item?.verifiedBy.some((v) => v.includes('activity-7510477602730725377'))).toBe(true)
    expect(item?.paragraphs.join(' ')).toMatch(/22 de setembro de 2026/)
  })

  it('não usa foto de outro assunto como capa (Congo no Samba de Bumbo, feira no mutirão)', () => {
    const withoutCover = curatedNews.filter((n) => n.noCover).map((n) => n.slug)
    expect(withoutCover.sort()).toEqual(
      [
        'cortejo-da-cavalaria-patrimonio-cultural',
        'ecomuseu-mutirao-rio-alambari',
        'educacao-ambiental-e-observacao-de-aves-no-ecomuseu',
        'jornada-formativa-ecomuseu-quarta-edicao',
        'samba-de-bumbo-paulista-patrimonio-cultural',
      ].sort(),
    )
  })
})
