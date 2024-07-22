import type { SessionId, User } from '@server/shared'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserState = {
  connectionStatus: 'disconnected' | 'connecting' | 'connected'
  sessionId: SessionId | null
  user: User | null
  setConnectionStatus: (status: UserState['connectionStatus']) => void
  setSessionId: (sessionId: SessionId) => void
  setUser: (user: User) => void
}

//rkq: move?
const USER_STORAGE_KEY = 'user-storage'

function setInitialConnectionStatus() {
  const storedSessionId = localStorage.getItem(USER_STORAGE_KEY)
  return storedSessionId ? 'connecting' : 'disconnected'
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      sessionId: null,
      connectionStatus: setInitialConnectionStatus(),
      user: null,
      setConnectionStatus: status => set({ connectionStatus: status }),
      setSessionId: sessionId => set({ sessionId }),
      setUser: user => set({ user }),
    }),
    {
      name: USER_STORAGE_KEY,
      partialize: state => ({ sessionId: state.sessionId }),
    },
  ),
)
