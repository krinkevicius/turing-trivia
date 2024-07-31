import express from 'express'
import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { config } from './config'

export default function createApp() {
  const app = express()

  Sentry.init({
    dsn: config.sentryServerDsn,
    integrations: [nodeProfilingIntegration()],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  })

  Sentry.setupExpressErrorHandler(app) // rkq: is this needed?

  return app
}
