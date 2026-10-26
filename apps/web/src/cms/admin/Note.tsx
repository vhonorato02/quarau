import type { UIFieldServerProps } from 'payload'

/** Read-only help text inside a form (configured with admin.custom.text). */
export function Note({ field }: UIFieldServerProps) {
  const text = (field.admin?.custom as { text?: string } | undefined)?.text
  return text ? <p className="quarau-note">{text}</p> : null
}
