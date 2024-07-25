import type { User } from '@server/types'

export interface Player extends User {
  status: 'waiting' | 'ready'
  score: number
}

export interface GameData {
  gameId: string
  status: 'waitingToStart' | 'inProgress' | 'over'
  players: Player[]
}
