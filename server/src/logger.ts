import pino from 'pino'
import { config } from './config'

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'pid,hostname',
    },
  },
  level: config.env === 'test' ? 'silent' : 'trace',
})
