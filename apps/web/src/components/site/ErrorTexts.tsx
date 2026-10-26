'use client'

import { createContext, useContext } from 'react'

import type { SiteTexts } from '@/cms/globals/site-texts'

const Ctx = createContext<SiteTexts['error'] | null>(null)

/** Gives the (client) error boundary the error texts from the CMS. */
export function ErrorTextsProvider({
  texts,
  children,
}: {
  texts: SiteTexts['error']
  children: React.ReactNode
}) {
  return <Ctx.Provider value={texts}>{children}</Ctx.Provider>
}

export const useErrorTexts = () => useContext(Ctx)
