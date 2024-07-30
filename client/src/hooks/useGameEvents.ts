import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import type { GameData } from '@server/shared'
import { useEffect } from 'react'

export default function useGameEvents() {
  const updateGameData = useGameStoreContext(state => state.updateGameData)

  useEffect(() => {
    const onUpdateGameData = (gameData: GameData) => {
      updateGameData(gameData)
    }

    socket.on('updateGameData', onUpdateGameData)

    return () => {
      socket.off('updateGameData', onUpdateGameData)
    }
  }, [updateGameData])
}
