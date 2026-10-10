import { describe, expect, it } from 'vitest'

import {
  classify,
  fixMojibake,
  hashtagsOf,
  mergePosts,
  parseCsv,
  parseInstagram,
  parseLinkedInShares,
  projectsOf,
  titleFrom,
} from '@/lib/social-export'

/** Meta exports encode UTF-8 as Latin-1, so real files look like this. */
const mojibake = (s: string) => Buffer.from(s, 'utf8').toString('latin1')

describe('fixMojibake', () => {
  it('restores accents from Meta exports', () => {
    expect(fixMojibake(mojibake('Região de São João do Piauí'))).toBe('Região de São João do Piauí')
  })
  it('leaves correct text untouched', () => {
    expect(fixMojibake('Educação patrimonial')).toBe('Educação patrimonial')
  })
})

describe('titleFrom', () => {
  it('uses the first sentence without hashtags, mentions, emojis or links', () => {
    expect(
      titleFrom(
        '🌱 Horta comunitária inaugurada em Atibaia! Veja mais em https://x.y #ecoe @celeo',
      ),
    ).toBe('Horta comunitária inaugurada em Atibaia!')
  })
  it('cuts long sentences at a word boundary', () => {
    const t = titleFrom('Palavra '.repeat(30))
    expect(t.length).toBeLessThanOrEqual(81)
    expect(t.endsWith('…')).toBe(true)
  })
})

describe('classification and hints', () => {
  it('classifies by length and media', () => {
    expect(classify('a'.repeat(450), 1)).toBe('noticia')
    expect(classify('a'.repeat(220), 3)).toBe('noticia')
    expect(classify('a'.repeat(120), 1)).toBe('nota-curta')
    expect(classify('#quarau #ods 🌱', 1)).toBe('descartar')
  })
  it('extracts hashtags and related projects', () => {
    expect(hashtagsOf('Projeto #Ecoe e #ODS #ecoe')).toEqual(['ecoe', 'ods'])
    expect(projectsOf('Visita ao Projeto Quipá e ao Ecomuseu')).toEqual([
      'projeto-quipa',
      'ecomuseu-dos-campos-de-sao-jose',
    ])
  })
})

describe('parseInstagram', () => {
  it('reads single posts, carousels and reels', () => {
    const posts = [
      {
        media: [
          {
            uri: 'media/posts/202312/1.jpg',
            creation_timestamp: 1702400000,
            title: mojibake('Oficina de meliponicultura no território.'),
          },
        ],
      },
      {
        title: mojibake('Carrossel: feira de saberes e fazeres com a comunidade.'),
        creation_timestamp: 1702500000,
        media: [
          { uri: 'media/posts/202312/2.jpg', title: '' },
          { uri: 'media/posts/202312/3.jpg', title: '' },
        ],
      },
    ]
    const reels = {
      ig_reels_media: [
        {
          media: [
            {
              uri: 'media/reels/202401/4.mp4',
              creation_timestamp: 1704100000,
              title: 'Reel do Ecoe Verde',
            },
          ],
        },
      ],
    }
    const parsed = [...parseInstagram(posts), ...parseInstagram(reels)]
    expect(parsed).toHaveLength(3)
    expect(parsed[0]?.text).toBe('Oficina de meliponicultura no território.')
    expect(parsed[1]?.media).toEqual(['media/posts/202312/2.jpg', 'media/posts/202312/3.jpg'])
    expect(parsed[1]?.text.startsWith('Carrossel')).toBe(true)
    expect(parsed[2]?.projects).toEqual(['projeto-ecoe-verde'])
    expect(parsed[2]?.date).toBe('2024-01-01T09:06:40.000Z')
  })
})

describe('LinkedIn Shares.csv', () => {
  const csv = [
    'Date,ShareLink,ShareCommentary,SharedUrl,MediaUrl,Visibility',
    '2023-12-14 15:32:10,https://www.linkedin.com/feed/update/urn:li:share:1,"Primeira linha',
    'segunda linha com ""aspas"", e vírgula",,https://media.licdn.com/a.jpg,MEMBER_NETWORK',
    '2023-11-01 10:00:00,https://www.linkedin.com/feed/update/urn:li:share:2,,https://quarau.com.br,,PUBLIC',
  ].join('\r\n')

  it('parses quoted multiline fields', () => {
    const rows = parseCsv(csv)
    expect(rows).toHaveLength(2)
    expect(rows[0]?.ShareCommentary).toBe('Primeira linha\nsegunda linha com "aspas", e vírgula')
  })
  it('keeps posts with text or media and skips empty reshares', () => {
    const posts = parseLinkedInShares(csv)
    expect(posts).toHaveLength(1)
    expect(posts[0]).toMatchObject({
      network: 'linkedin',
      date: '2023-12-14T15:32:10.000Z',
      media: ['https://media.licdn.com/a.jpg'],
      link: 'https://www.linkedin.com/feed/update/urn:li:share:1',
    })
  })
})

describe('mergePosts', () => {
  it('sorts newest first and links cross-posts', () => {
    const text =
      'Concluímos mais uma etapa do Programa de Educação Patrimonial com as escolas da rede.'
    const ig = parseInstagram([
      { media: [{ uri: 'a.jpg', creation_timestamp: 1700000000, title: text }] },
    ])
    const li = parseLinkedInShares(
      `Date,ShareLink,ShareCommentary,SharedUrl,MediaUrl,Visibility\n2023-11-15 10:00:00,l,${text},,,PUBLIC`,
    )
    const merged = mergePosts(ig, li)
    expect(merged[0]?.network).toBe('linkedin')
    expect(merged[1]?.duplicateOf).toBe(merged[0]?.id)
  })
})
