import 'server-only'

import configPromise from '@payload-config'
import { getPayload as getPayloadInstance, type Payload } from 'payload'

export async function getPayload(): Promise<Payload> {
  return getPayloadInstance({ config: configPromise })
}
