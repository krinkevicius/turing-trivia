import type { SessionId, User } from '@server/shared'

export interface UserProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected'
  sessionId: SessionId | null
  user: User | null
}

export interface UserState extends UserProps {
  setConnectionStatus: (status: UserState['connectionStatus']) => void
  setSessionId: (sessionId: SessionId) => void
  setUser: (user: User) => void
}

export type UserProviderProps = React.PropsWithChildren<Partial<UserProps>>
