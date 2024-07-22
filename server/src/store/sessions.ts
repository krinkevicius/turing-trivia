import type { SessionId, User } from '@server/types'

export default function initializeSessionStore() {
  const sessionStorage = new Map<SessionId, User>()

  function getSessionById(sessionId: SessionId) {
    return sessionStorage.get(sessionId)
  }

  function setSession(sessionId: SessionId, user: User) {
    sessionStorage.set(sessionId, user)
  }

  return {
    sessionStorage, // rkq: do I need to return this?
    getSessionById,
    setSession,
  }
}
