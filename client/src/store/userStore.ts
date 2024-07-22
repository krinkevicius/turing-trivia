import { create } from 'zustand'

type UserState = {
  connectionStatus: 'disconnected' | 'connecting' | 'connected'
  setConnectionStatus: (status: UserState['connectionStatus']) => void
}

export const useUserStore = create<UserState>()(set => ({
  connectionStatus: 'disconnected',
  setConnectionStatus: status => set({ connectionStatus: status }),
}))
