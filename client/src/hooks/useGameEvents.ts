import { socket } from '@/libs/socket'
import type { GameData } from '@server/shared'
import { useEffect } from 'react'
export default function useGameEvents() {
  useEffect(() => {
    const onUpdateGameData = (gameData: GameData) => {
      console.log('Game data updated:', gameData)
    }

    socket.on('updateGameData', onUpdateGameData)

    return () => {
      socket.off('updateGameData', onUpdateGameData)
    }
  })
}
