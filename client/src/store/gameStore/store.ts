import type { GameProps, GameState } from '@/types'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const createGameStore = (initProps?: Partial<GameProps>) => {
  const DEFAULT_PROPS: GameProps = {
    gameId: '',
    status: 'waitingToStart',
    players: [],
    currentQuestion: null,
  }
  return createStore<GameState>()(
    immer(set => ({
      ...DEFAULT_PROPS,
      ...initProps,
      setGameId: gameId => set({ gameId }),
      updateGameData: gameData => {
        set({
          gameId: gameData.gameId,
          status: gameData.status,
          players: gameData.players,
          currentQuestion: gameData.currentQuestion,
        })
      },
      resetGameStore: () => set(DEFAULT_PROPS),
    })),
  )
}

export type GameStore = ReturnType<typeof createGameStore>
