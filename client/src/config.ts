export const socketOrigin = import.meta.env.VITE_SOCKET_ORIGIN
export const socketPort = import.meta.env.VITE_SOCKET_PORT
export const sentryDSN = import.meta.env.VITE_SENTRY_CLIENT_DSN

if (typeof socketOrigin !== 'string') {
  throw new Error('VITE_SOCKET_ORIGIN is not defined')
}

if (typeof socketPort !== 'string') {
  throw new Error('VITE_SOCKET_PORT is not defined')
}
