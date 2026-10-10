'use client'

import { LogoSymbol, cn } from '@quarau/ui'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

function canUse3D(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.innerWidth < 768) return false
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return false
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

/** 3D symbol, loaded on idle after first paint. Static SVG symbol is the fallback (and the LCP-safe default). */
export function HeroVisual({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!canUse3D()) return
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600))
    const id = idle(() => setEnabled(true))
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number)
  }, [])

  return (
    <div className={cn('relative aspect-square w-full', className)} aria-hidden="true">
      <div
        className={cn(
          'absolute inset-[14%] transition-opacity duration-700',
          ready ? 'opacity-0' : 'opacity-100',
        )}
      >
        <LogoSymbol
          variant="white"
          alt=""
          className="w-full opacity-85 drop-shadow-[0_20px_60px_rgb(4_38_58/0.6)]"
        />
      </div>
      {enabled ? (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          <HeroScene onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  )
}
