import * as React from 'react'

import { cn } from '../lib/cn'

type LogoProps = {
  /** Public path where the brand SVGs are served. */
  basePath?: string
  variant?: 'color' | 'white'
  className?: string
  /** Accessible name. Pass an empty string when the logo is purely decorative. */
  alt?: string
  priority?: boolean
}

/** Official Quarau symbol (magnifier "Q" + green dot). Aspect ratio 863 × 714. */
export function LogoSymbol({
  basePath = '/brand',
  variant = 'color',
  className,
  alt = 'Quarau',
  priority,
}: LogoProps) {
  return (
    <img
      src={`${basePath}/quarau-simbolo${variant === 'white' ? '-branco' : ''}.svg`}
      width={863}
      height={714}
      alt={alt}
      className={cn('h-auto', className)}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}

/** Official Quarau logotype with tagline. Aspect ratio 1295 × 306. */
export function Logotype({
  basePath = '/brand',
  variant = 'color',
  className,
  alt = 'Quarau — Projetos Socioambientais, Educativos e Culturais',
  priority,
}: LogoProps) {
  return (
    <img
      src={`${basePath}/quarau-logotipo${variant === 'white' ? '-branco' : ''}.svg`}
      width={1295}
      height={306}
      alt={alt}
      className={cn('h-auto', className)}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
