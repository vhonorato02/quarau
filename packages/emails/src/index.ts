import { render } from '@react-email/render'
import * as React from 'react'

import { LeadConfirmation, type LeadConfirmationProps } from './templates/LeadConfirmation'
import { LeadNotification, type LeadNotificationProps } from './templates/LeadNotification'

export type { LeadConfirmationProps, LeadNotificationProps }

export async function renderLeadNotification(props: LeadNotificationProps) {
  const el = React.createElement(LeadNotification, props)
  return { html: await render(el), text: await render(el, { plainText: true }) }
}

export async function renderLeadConfirmation(props: LeadConfirmationProps) {
  const el = React.createElement(LeadConfirmation, props)
  return { html: await render(el), text: await render(el, { plainText: true }) }
}
