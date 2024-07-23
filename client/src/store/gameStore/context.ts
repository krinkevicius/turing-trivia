import type { GameStore } from '@/store/gameStore'
import { createContext } from 'react'

export const GameStoreContext = createContext<GameStore | null>(null)
