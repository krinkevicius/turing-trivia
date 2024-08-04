export const socketOrigin = import.meta.env.VITE_SOCKET_ORIGIN
export const socketPort = import.meta.env.VITE_SOCKET_PORT
export const sentryDSN = import.meta.env.VITE_SENTRY_CLIENT_DSN
const isProduction = import.meta.env.VITE_ENVIRONMENT === 'production'

if (isProduction && typeof socketOrigin !== 'string') {
  throw new Error('VITE_SOCKET_ORIGIN is not defined')
}

if (isProduction && typeof socketPort !== 'string') {
  throw new Error('VITE_SOCKET_PORT is not defined')
}
