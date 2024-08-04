import pino from 'pino'
import { config } from './config'

const transport = {
  target: 'pino-pretty',
  options: {
    ignore: 'pid,hostname',
  },
}

export const devLogger = pino({
  transport,
  level: config.env === 'test' ? 'silent' : 'trace',
})

export const prodLogger = pino({
  transport,
  level: config.env === 'production' ? 'trace' : 'silent',
})
