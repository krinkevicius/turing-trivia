import { useEffect } from 'react'
import { socket } from '@/libs/socket'
import { useUserStore } from '@/store/userStore'
import type { SessionId, User } from '@server/shared'

export default function useConnection() {
  const { setConnectionStatus, setSessionId, setUser } = useUserStore()

  useEffect(() => {
    const onConnect = () => {
      console.log('Connected to server')
      setConnectionStatus('connected')
    }

    const onConnectError = (error: Error) => {
      setConnectionStatus('disconnected')
      useUserStore.persist.clearStorage()
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
