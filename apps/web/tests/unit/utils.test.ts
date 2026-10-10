import { describe, expect, it } from 'vitest'

import { slugify } from '@/fields/slug'
import { docPath, isRoutable } from '@/lib/urls'
import { lexicalToText, paragraphsToLexical, truncate } from '@/utilities/lexical'

describe('slugify', () => {
  it('removes accents and punctuation', () => {
    expect(slugify('Educação Patrimonial & Ambiental!')).toBe('educacao-patrimonial-e-ambiental')
  })
  it('collapses separators and trims', () => {
    expect(slugify('  --Projeto   Quipá -- ')).toBe('projeto-quipa')
  })
  it('limits length without trailing dash', () => {
    const s = slugify('a '.repeat(80))
    expect(s.length).toBeLessThanOrEqual(96)
    expect(s.endsWith('-')).toBe(false)
  })
})

describe('docPath', () => {
  it('maps collections to public routes', () => {
    expect(docPath('pages', 'inicio')).toBe('/')
    expect(docPath('pages', 'sobre')).toBe('/sobre')
    expect(docPath('projects', 'projeto-quipa')).toBe('/projetos/projeto-quipa')
    expect(docPath('services', 'gestao-e-difusao')).toBe('/atuacao/gestao-e-difusao')
    expect(docPath('news', 'x')).toBe('/noticias/x')
    expect(docPath('jobs', 'y')).toBe('/trabalhe-conosco/y')
  })
  it('knows routable collections', () => {
    expect(isRoutable('projects')).toBe(true)
    expect(isRoutable('leads')).toBe(false)
  })
})

describe('lexical helpers', () => {
  it('round-trips paragraphs to plain text', () => {
    const doc = paragraphsToLexical([
      'Primeiro parágrafo.',
      [{ text: 'Negrito', bold: true }, { text: ' e normal.' }],
    ])
    expect(lexicalToText(doc)).toBe('Primeiro parágrafo.\nNegrito e normal.')
  })
  it('handles empty values', () => {
    expect(lexicalToText(null)).toBe('')
    expect(lexicalToText({})).toBe('')
  })
  it('truncates on word boundary with ellipsis', () => {
    const t = truncate(
      'Projetos educativos, culturais e socioambientais com resultados mensuráveis.',
      40,
    )
    expect(t.length).toBeLessThanOrEqual(40)
    expect(t.endsWith('…')).toBe(true)
    expect(truncate('curto', 40)).toBe('curto')
  })
})
