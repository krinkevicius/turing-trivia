import { GameStoreContext } from '@/store/gameStore'
import type { GameState } from '@/types'
import { useContext } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'

export const useGameStoreContext = <T>(selector: (state: GameState) => T): T => {
  const gameStoreContext = useContext(GameStoreContext)

  if (!gameStoreContext) {
    throw new Error('useGameStoreContext must be used within GameStoreProvider')
  }

  return useStoreWithEqualityFn(gameStoreContext, selector)
}
