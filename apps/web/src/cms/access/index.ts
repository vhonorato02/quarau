import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

export const ROLES = ['admin', 'editor', 'author'] as const
export type Role = (typeof ROLES)[number]

type UserLike = { id: number | string; roles?: Role[] | null } | null | undefined

export const hasRole = (user: UserLike, ...roles: Role[]): boolean =>
  Boolean(user?.roles?.some((r) => roles.includes(r)))

export const isAdmin = (req: PayloadRequest): boolean => hasRole(req.user as UserLike, 'admin')
export const isEditorOrAbove = (req: PayloadRequest): boolean =>
  hasRole(req.user as UserLike, 'admin', 'editor')

export const authenticated: Access = ({ req }) => Boolean(req.user)
export const admins: Access = ({ req }) => isAdmin(req)
export const editors: Access = ({ req }) => isEditorOrAbove(req)
export const anyone: Access = () => true
export const nobody: Access = () => false

export const adminsFieldLevel: FieldAccess = ({ req }) => isAdmin(req)

/** Public can read published docs; logged-in users can read drafts too. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } } satisfies Where
}

/**
 * Editors and admins can do everything. Authors can create and edit their own
 * documents, but cannot publish — publishing requires an editor.
 */
export const authorsOwnDrafts: Access = ({ req, data }) => {
  if (isEditorOrAbove(req)) return true
  const user = req.user as UserLike
  if (!hasRole(user, 'author')) return false
  if (data && (data as { _status?: string })._status === 'published') return false
  return { createdBy: { equals: user!.id } } satisfies Where
}

export const authorsCanCreateDrafts: Access = ({ req, data }) => {
  if (isEditorOrAbove(req)) return true
  if (!hasRole(req.user as UserLike, 'author')) return false
  return (data as { _status?: string } | undefined)?._status !== 'published'
}

/** Users may read and update their own profile; admins manage everyone. */
export const adminsOrSelf: Access = ({ req }) => {
  if (isAdmin(req)) return true
  if (!req.user) return false
  return { id: { equals: req.user.id } }
}

/**
 * Payload opens a public "create first user" screen while the users table is empty, and whoever
 * gets there first becomes administrator. A fresh deploy is reachable before anyone runs
 * `pnpm seed:admin`, so that screen stays closed: the first account is created only by server
 * scripts (Local API) or when ALLOW_FIRST_USER_SIGNUP=true is set on purpose.
 */
export function firstUserSignupBlocked(args: {
  totalDocs: number
  payloadAPI: string | undefined
  env: Record<string, string | undefined>
}): boolean {
  if (args.totalDocs > 0) return false
  if (args.payloadAPI === 'local') return false
  return args.env.ALLOW_FIRST_USER_SIGNUP !== 'true'
}
