import type { SessionId, User } from '@server/shared'
import { create } from 'zustand'

type UserState = {
  connectionStatus: 'disconnected' | 'connecting' | 'connected'
  sessionId: SessionId | null
  user: User | null
  setConnectionStatus: (status: UserState['connectionStatus']) => void
  setSessionId: (sessionId: SessionId) => void
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>()(set => ({
  connectionStatus: 'disconnected',
  sessionId: null,
  user: null,
  setConnectionStatus: status => set({ connectionStatus: status }),
  setSessionId: sessionId => set({ sessionId }),
  setUser: user => set({ user }),
}))
