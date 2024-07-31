import 'dotenv/config'
import z from 'zod'

const { env } = process

if (!env.NODE_ENV) env.NODE_ENV = 'development'
const isDevTest = env.NODE_ENV === 'development' || env.NODE_ENV === 'test'

export const schema = z.object({
  env: z.enum(['development', 'production', 'staging', 'test']).default('development'),
  sentryServerDsn: z.string().default(() => {
    if (isDevTest) {
      return ''
    }

    throw new Error('You must provide Sentry DSN in production env!')
  }),
})

export const config = schema.parse({
  env: env.NODE_ENV,
  sentryServerDsn: env.SENTRY_SERVER_DSN,
})
