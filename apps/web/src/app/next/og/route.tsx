import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

const BLUE = '#0089CF'
const GREEN = '#39B54A'
const DARK = '#04263A'

async function font(weight: 400 | 600) {
  const file = path.join(process.cwd(), 'src/fonts', `barlow-latin-${weight}-normal.woff2`)
  // Satori needs TTF/OTF/WOFF (not WOFF2); fall back to the bundled WOFF when available.
  const woff = file.replace('.woff2', '.woff')
  try {
    return await readFile(woff)
  } catch {
    return null
  }
}

/** Dynamic, on-brand Open Graph image: /next/og?title=...&eyebrow=... */
export async function GET(req: NextRequest) {
  const title = (req.nextUrl.searchParams.get('title') ?? 'Quarau').slice(0, 140)
  const eyebrow = (
    req.nextUrl.searchParams.get('eyebrow') ?? 'Projetos Socioambientais, Educativos e Culturais'
  ).slice(0, 80)
  const [regular, semibold] = await Promise.all([font(400), font(600)])
  const fonts = [
    ...(regular
      ? [{ name: 'Barlow', data: regular, weight: 400 as const, style: 'normal' as const }]
      : []),
    ...(semibold
      ? [{ name: 'Barlow', data: semibold, weight: 600 as const, style: 'normal' as const }]
      : []),
  ]
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: DARK,
        color: '#fff',
        padding: 72,
        fontFamily: 'Barlow',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="74" height="62" viewBox="0 0 100 84">
          <ellipse cx="38" cy="36" rx="30" ry="27" fill="none" stroke={BLUE} strokeWidth="9" />
          <path d="M58 56 78 76" stroke={BLUE} strokeWidth="9" />
          <circle cx="92" cy="62" r="7" fill={GREEN} />
        </svg>
        <span style={{ fontSize: 30, letterSpacing: 6, fontWeight: 600 }}>QUARAU</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span
          style={{ fontSize: 26, color: '#a9d6ef', display: 'flex', alignItems: 'center', gap: 14 }}
        >
          <span
            style={{ width: 14, height: 14, borderRadius: 14, background: GREEN, display: 'flex' }}
          />
          {eyebrow}
        </span>
        <span
          style={{
            fontSize: title.length > 70 ? 56 : 72,
            lineHeight: 1.02,
            fontWeight: 600,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ display: 'flex', height: 8, width: '100%' }}>
        <div style={{ flex: 5, background: BLUE, display: 'flex' }} />
        <div style={{ flex: 1, background: GREEN, display: 'flex' }} />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: fonts.length ? fonts : undefined,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800' },
    },
  )
}
