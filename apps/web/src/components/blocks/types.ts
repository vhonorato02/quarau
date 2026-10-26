import type { News, Page, Project, Service } from '@/payload-types'

export type PageBlock = NonNullable<Page['layout']>[number]
export type StoryBlock =
  | NonNullable<Project['story']>[number]
  | NonNullable<Service['story']>[number]
  | NonNullable<News['story']>[number]
export type AnyBlock = PageBlock | StoryBlock
export type BlockOf<T extends AnyBlock['blockType']> = Extract<AnyBlock, { blockType: T }>

/** Where the blocks are rendered: the page path and title feed breadcrumbs and anchors. */
export type BlockContext = { path: string; title: string; isHome: boolean }

/** Stable DOM id for a block heading. */
export const headingId = (block: { id?: string | null; blockType: string }, i: number) =>
  `b-${block.id ?? `${block.blockType}-${i}`}`
