import { useEffect } from 'react'
import { socket } from '@/libs/socket'
import type { SessionId, User } from '@server/shared'
import { useUserStoreContext } from '@/store/userStore'
import { USER_STORAGE_KEY } from '@/consts'

export default function useConnection() {
  const { setConnectionStatus, setSessionId, setUser } = useUserStoreContext(state => state)

  useEffect(() => {
    const onConnect = () => {
      setConnectionStatus('connected')
    }

    const onConnectError = (error: Error) => {
      setConnectionStatus('disconnected')
      localStorage.removeItem(USER_STORAGE_KEY)
      alert(error)
    }

    const onSession = (sessionId: SessionId, user: User) => {
      setSessionId(sessionId)
      setUser(user)
    }

    socket.on('connect', onConnect)
    socket.on('connect_error', onConnectError)
    socket.on('session', onSession)

    return () => {
      socket.off('connect', onConnect)
      socket.off('connect_error', onConnectError)
      socket.off('session', onSession)
    }
  }, [setConnectionStatus, setSessionId, setUser])
}
