import 'dotenv/config'
import z from 'zod'

const { env } = process

if (!env.NODE_ENV) env.NODE_ENV = 'development'

export const schema = z.object({
  env: z.enum(['development', 'production', 'staging', 'test']).default('development'),
})

export const config = schema.parse({
  env: env.NODE_ENV,
})
