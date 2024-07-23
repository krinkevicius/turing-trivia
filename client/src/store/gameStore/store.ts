import type { GameProps, GameState } from '@/types'
import { createStore } from 'zustand'

export const createGameStore = (initProps?: Partial<GameProps>) => {
  const DEFAULT_PROPS: GameProps = {
    gameId: '',
  }
  return createStore<GameState>()(set => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setGameId: gameId => set({ gameId }),
    resetGameId: () => set({ gameId: '' }),
  }))
}

export type GameStore = ReturnType<typeof createGameStore>
