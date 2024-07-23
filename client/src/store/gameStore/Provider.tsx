import { createGameStore, GameStoreContext } from '@/store/gameStore'
import type { GameStore } from '@/store/gameStore'
import type { GameProviderProps } from '@/types'
import { useRef } from 'react'

export const GameStoreProvider = ({ children, ...props }: GameProviderProps) => {
  const storeRef = useRef<GameStore>()
  if (!storeRef.current) {
    storeRef.current = createGameStore(props)
  }
  return <GameStoreContext.Provider value={storeRef.current}>{children}</GameStoreContext.Provider>
}
