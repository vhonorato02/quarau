import * as React from 'react'

export function SkipLink({
  href = '#conteudo',
  children = 'Pular para o conteúdo',
}: {
  href?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="bg-ink fixed top-3 left-3 z-[100] -translate-y-24 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
    >
      {children}
    </a>
  )
}
