import { cn } from '@quarau/ui'
import Image from 'next/image'

import type { Media as MediaDoc } from '@/payload-types'

type MediaProp = MediaDoc | number | null | undefined

export function isMedia(m: MediaProp): m is MediaDoc {
  return typeof m === 'object' && m !== null && 'url' in m
}

/** Payload returns absolute URLs (serverURL); keep them same-origin relative for next/image. */
export function toRelative(url: string | null | undefined): string | null {
  if (!url) return null
  if (url.startsWith('/')) return url
  try {
    const u = new URL(url)
    return `${u.pathname}${u.search}`
  } catch {
    return url
  }
}

export function mediaUrl(m: MediaProp, size?: 'thumbnail' | 'card' | 'wide' | 'og'): string | null {
  if (!isMedia(m)) return null
  const sized = size ? m.sizes?.[size]?.url : null
  return toRelative(sized ?? m.url ?? null)
}

type Props = {
  media: MediaProp
  className?: string
  imgClassName?: string
  /** `fill` fills the positioned parent (object-cover with focal point). */
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: 60 | 75 | 85
  alt?: string
}

/**
 * Responsive, optimized image for CMS media. Uses the editor-defined focal point
 * for cropping and the stored blur placeholder while loading.
 */
export function Media({ media, className, imgClassName, fill, sizes = '100vw', priority, quality = 75, alt }: Props) {
  if (!isMedia(media) || !media.url) return null
  const src = toRelative(media.url)!
  const isVideo = media.mimeType?.startsWith('video/')
  if (isVideo) {
    return (
      <video
        className={cn('h-full w-full object-cover', imgClassName, className)}
        src={src}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-label={media.alt}
      />
    )
  }
  const objectPosition = `${media.focalX ?? 50}% ${media.focalY ?? 50}%`
  const isSvg = media.mimeType === 'image/svg+xml'
  const common = {
    alt: alt ?? media.alt ?? '',
    sizes,
    priority,
    quality,
    unoptimized: isSvg,
    placeholder: media.blurDataURL ? ('blur' as const) : ('empty' as const),
    blurDataURL: media.blurDataURL ?? undefined,
    style: { objectPosition },
  }
  if (fill) {
    return (
      <span className={cn('absolute inset-0 block overflow-hidden', className)}>
        <Image src={src} fill className={cn('object-cover', imgClassName)} {...common} />
      </span>
    )
  }
  return (
    <Image
      src={src}
      width={media.width ?? 1600}
      height={media.height ?? 1000}
      className={cn('h-auto w-full', imgClassName, className)}
      {...common}
    />
  )
}
