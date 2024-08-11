import 'dotenv/config'
import z from 'zod'

const { env } = process

if (!env.NODE_ENV) env.NODE_ENV = 'development'
const isDevTest =
  env.NODE_ENV === 'development' || env.NODE_ENV === 'test' || env.NODE_ENV === 'e2e'

export const schema = z.object({
  env: z.enum(['development', 'production', 'e2e', 'test']).default('development'),
  port: z
    .string()
    .refine(val => parseInt(val, 10))
    .default(() => {
      if (isDevTest) {
        return '8181'
      }

      throw new Error('You must provide Socket.io port in production environment!')
    }),
  sentryServerDsn: z.string().default(() => {
    if (isDevTest) {
      return ''
    }

    throw new Error('You must provide Sentry DSN in production environment!')
  }),
})

export const config = schema.parse({
  env: env.NODE_ENV,
  port: env.SOCKET_PORT,
  sentryServerDsn: env.SENTRY_SERVER_DSN,
})
