import type { User } from '@server/types'

export interface Player extends User {
  score: number
}

export type GameData = {
  gameId: string
  status: 'waitingToStart' | 'inProgress' | 'over'
  players: Player[]
}
