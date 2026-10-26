import type { Media } from '@/payload-types'

type SizeName = 'thumbnail' | 'square' | 'sm' | 'md' | 'lg' | 'xl'
const WIDTH_SIZES: SizeName[] = ['sm', 'md', 'lg', 'xl']

export function isMedia(m: unknown): m is Media {
  return typeof m === 'object' && m !== null && 'url' in m
}

/** Payload returns absolute URLs on local disk (serverURL); keep same-origin paths relative. */
function rel(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('/')) return url
  try {
    const u = new URL(url)
    const site = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : ''
    return u.origin === site || u.hostname === 'localhost' ? `${u.pathname}${u.search}` : url
  } catch {
    return url
  }
}

export function mediaSrc(m: unknown, size?: SizeName | 'og'): string | null {
  if (!isMedia(m)) return null
  return rel((size && m.sizes?.[size]?.url) || m.url)
}

/**
 * Responsive image from the WebP sizes Payload created on upload: plain <img srcset>, served from
 * storage/CDN, with no image processing per request on any host (Vercel or VPS).
 * `square` crops to 1:1 using the editor's focal point.
 */
export function Img({
  media,
  sizes = '100vw',
  priority = false,
  crop,
  className,
  alt,
}: {
  media: unknown
  sizes?: string
  priority?: boolean
  crop?: 'square' | 'thumbnail'
  className?: string
  alt?: string
}) {
  if (!isMedia(media) || !media.url || !media.mimeType?.startsWith('image/')) return null
  const objectPosition = `${media.focalX ?? 50}% ${media.focalY ?? 50}%`
  const altText = alt ?? media.alt ?? ''
  const common = {
    className,
    decoding: 'async' as const,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    fetchPriority: priority ? ('high' as const) : undefined,
    style: { objectPosition },
  }
  if (crop) {
    const s = media.sizes?.[crop]
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        alt={altText}
        src={rel(s?.url ?? media.url)!}
        width={s?.width ?? 800}
        height={s?.height ?? 800}
        {...common}
      />
    )
  }
  const candidates = WIDTH_SIZES.map((n) => media.sizes?.[n])
    .filter((s): s is NonNullable<typeof s> => Boolean(s?.url && s.width))
    .map((s) => `${rel(s.url)} ${s.width}w`)
  if (media.width && !candidates.some((c) => c.endsWith(` ${media.width}w`)))
    candidates.push(`${rel(media.url)} ${media.width}w`)
  const fallback = rel(media.sizes?.lg?.url ?? media.url)!
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={altText}
      src={fallback}
      srcSet={candidates.join(', ') || undefined}
      sizes={sizes}
      width={media.width ?? 1600}
      height={media.height ?? 1067}
      {...common}
    />
  )
}
