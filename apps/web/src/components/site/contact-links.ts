/** "(12) 98281-3669" → "tel:+5512982813669". Brazilian numbers without a country code get +55. */
export function phoneHref(number: string): string {
  const digits = number.replace(/\D/g, '')
  return `tel:+${digits.startsWith('55') && digits.length > 11 ? digits : `55${digits}`}`
}

/** WhatsApp link (only for numbers the company confirmed as WhatsApp). */
export function whatsappHref(number: string): string {
  const digits = number.replace(/\D/g, '')
  return `https://wa.me/${digits.startsWith('55') && digits.length > 11 ? digits : `55${digits}`}`
}
