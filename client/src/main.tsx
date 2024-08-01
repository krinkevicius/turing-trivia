import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserStoreProvider } from '@/store/userStore'
import { GameStoreProvider } from '@/store/gameStore'
import ErrorBoundary from '@/components/ErrorBoundary'
import { sentryDSN } from '@/config.ts'

Sentry.init({
  dsn: sentryDSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // rkq: change
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Profiling
  profilesSampleRate: 1.0, // Profile 100% of the transactions. This value is relative to tracesSampleRate
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserStoreProvider>
      <GameStoreProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </GameStoreProvider>
    </UserStoreProvider>
  </React.StrictMode>,
)
