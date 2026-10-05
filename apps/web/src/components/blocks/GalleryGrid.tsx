'use client'

import { cn } from '@quarau/ui'
import { Dialog } from 'radix-ui'
import { useCallback, useEffect, useState } from 'react'
import type * as React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'

/** Mosaic rhythm: every 7 images form an editorial pattern of large and small tiles. */
const PATTERN = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-3',
  'md:col-span-2',
  'md:col-span-4',
]

export function GalleryGrid({ images, layout = 'mosaic' }: { images: MediaDoc[]; layout?: 'mosaic' | 'carousel' }) {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null
  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  const current = index !== null ? images[index] : null

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
      {layout === 'carousel' ? (
        <ul className="scroller flex gap-4 overflow-x-auto px-(--spacing-gutter) pb-4" data-lenis-prevent>
          {images.map((img, i) => (
            <li key={img.id} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[34vw]">
              <Tile img={img} onOpen={() => setIndex(i)} className="aspect-[4/3]" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid auto-rows-[38vw] grid-cols-2 gap-3 md:auto-rows-[15vw] md:grid-cols-6 md:gap-4 2xl:auto-rows-[13rem]">
          {images.map((img, i) => (
            <li
              key={img.id}
              data-reveal
              style={{ '--reveal-delay': (i % 6) * 60 } as React.CSSProperties}
              className={cn(PATTERN[i % PATTERN.length], i % 7 === 0 && 'col-span-2 row-span-2')}
            >
              <Tile img={img} onOpen={() => setIndex(i)} className="h-full" />
            </li>
          ))}
        </ul>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/95 data-[state=open]:animate-[fade-in_300ms]" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col text-white outline-none" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">
            Imagem {index !== null ? index + 1 : ''} de {images.length}
          </Dialog.Title>
          <div className="flex items-center justify-between p-4 text-sm">
            <span className="tabular-nums opacity-75" aria-live="polite">
              {index !== null ? index + 1 : ''} / {images.length}
            </span>
            <Dialog.Close className="grid size-12 place-items-center rounded-full hover:bg-white/10" aria-label="Fechar galeria">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>
          <div className="relative flex-1">
            {current ? <Media key={current.id} media={current} fill sizes="100vw" quality={85} imgClassName="!object-contain" /> : null}
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
              aria-label="Imagem anterior"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 rotate-180" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
              aria-label="Próxima imagem"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {current?.caption || current?.credit ? (
            <p className="p-4 text-center text-sm opacity-80">
              {current.caption}
              {current.credit ? <span className="opacity-70"> · Foto: {current.credit}</span> : null}
            </p>
          ) : (
            <div className="h-6" />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Tile({ img, onOpen, className }: { img: MediaDoc; onOpen: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn('group relative block w-full overflow-hidden rounded-md bg-surface-sunken', className)}
      aria-label={`Ampliar imagem: ${img.alt}`}
    >
      <Media
        media={img}
        fill
        sizes="(min-width: 768px) 40vw, 50vw"
        imgClassName="transition-transform duration-[1.2s] ease-(--ease-brand) group-hover:scale-[1.04]"
      />
    </button>
  )
}
