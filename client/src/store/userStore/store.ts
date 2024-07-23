import { USER_STORAGE_KEY } from '@/consts'
import type { UserProps, UserState } from '@/types'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

export const createUserStore = (initProps?: Partial<UserProps>) => {
  const DEFAULT_PROPS: UserProps = {
    connectionStatus: 'disconnected',
    sessionId: null,
    user: null,
  }
  return createStore<UserState>()(
    persist(
      set => ({
        ...DEFAULT_PROPS,
        ...initProps,
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
}

export type UserStore = ReturnType<typeof createUserStore>
