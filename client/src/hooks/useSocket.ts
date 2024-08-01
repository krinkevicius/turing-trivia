import { useEffect, useState } from 'react'
import { useUserStoreContext } from '@/store/userStore'
import { useGameStoreContext } from '@/store/gameStore'
import type { GameData, SessionId, User } from '@server/shared'
import { socket } from '@/libs/socket'
import { USER_STORAGE_KEY } from '@/consts'

export default function useSocket() {
  const { setConnectionStatus, setSessionId, setUser } = useUserStoreContext(state => state)
  const updateGameData = useGameStoreContext(state => state.updateGameData)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const onUpdateGameData = (gameData: GameData) => {
      updateGameData(gameData)
    }

    const onServerError = (message: string) => {
      setError(new Error(message))
    }

    const onConnect = () => {
      console.log('Connected to server')
      setConnectionStatus('connected')
    }

    const onConnectError = (/* error: Error */) => {
      setConnectionStatus('disconnected')
      localStorage.removeItem(USER_STORAGE_KEY)
      // alert(error)
      setError(new Error('connection error'))
    }

    const onSession = (sessionId: SessionId, user: User) => {
      setSessionId(sessionId)
      setUser(user)
    }

    socket.on('connect', onConnect)
    socket.on('connect_error', onConnectError)
    socket.on('session', onSession)
    socket.on('updateGameData', onUpdateGameData)
    socket.on('serverError', onServerError)

    return () => {
      socket.off('updateGameData', onUpdateGameData)
      socket.off('serverError', onServerError)
      socket.off('connect', onConnect)
      socket.off('connect_error', onConnectError)
      socket.off('session', onSession)
    }
  }, [updateGameData, setConnectionStatus, setSessionId, setUser])

  if (error) {
    throw error
  }
}
