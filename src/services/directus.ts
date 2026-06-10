import { createDirectus, rest } from '@directus/sdk'

const directusUrl = 'http://192.168.0.107:8055'

export const directus = createDirectus(directusUrl).with(rest())