import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import type { GameData } from '@server/shared'
import { useEffect, useState } from 'react'

export default function useGameEvents() {
  const updateGameData = useGameStoreContext(state => state.updateGameData)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const onUpdateGameData = (gameData: GameData) => {
      updateGameData(gameData)
    }

    const onServerError = (message: string) => {
      setError(new Error(message))
    }

    socket.on('updateGameData', onUpdateGameData)

    socket.on('serverError', onServerError)

    return () => {
      socket.off('updateGameData', onUpdateGameData)
      socket.off('serverError', onServerError)
    }
  }, [updateGameData])

  if (error) {
    throw error
  }
}
