'use client'

import { Dialog } from 'radix-ui'
import { useCallback, useEffect } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaDoc } from '@/payload-types'

/** Full-screen viewer for a gallery. Loaded on demand the first time an image is opened. */
export function GalleryLightbox({
  images,
  index,
  onIndexChange,
  returnFocusTo,
}: {
  images: MediaDoc[]
  index: number
  onIndexChange: (index: number | null) => void
  returnFocusTo?: HTMLElement | null
}) {
  const go = useCallback(
    (d: number) => onIndexChange((index + d + images.length) % images.length),
    [index, images.length, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const current = images[index]

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-ink/95 fixed inset-0 z-50 data-[state=open]:animate-[fade-in_300ms]" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col text-white outline-none"
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            returnFocusTo?.focus()
          }}
        >
          <Dialog.Title className="sr-only">
            Imagem {index + 1} de {images.length}
          </Dialog.Title>
          <div className="flex items-center justify-between p-4 text-sm">
            <span className="tabular-nums opacity-75" aria-live="polite">
              {index + 1} / {images.length}
            </span>
            <Dialog.Close
              className="grid size-12 place-items-center rounded-full hover:bg-white/10"
              aria-label="Fechar galeria"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>
          <div className="relative flex-1">
            {current ? (
              <Media
                key={current.id}
                media={current}
                fill
                sizes="100vw"
                quality={85}
                imgClassName="!object-contain"
              />
            ) : null}
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
              aria-label="Imagem anterior"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6 rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20"
              aria-label="Próxima imagem"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          {current?.caption || current?.credit ? (
            <p className="p-4 text-center text-sm opacity-80">
              {current.caption}
              {current.credit ? (
                <span className="opacity-70"> · Foto: {current.credit}</span>
              ) : null}
            </p>
          ) : (
            <div className="h-6" />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
