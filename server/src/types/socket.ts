import type { GameId, GameData } from '@server/types'

export type SessionId = string

export interface User {
  userId: string
  username: string
}

export type ServerResponse = {
  status: 'ok' | 'error'
}

export type ClientToServerEvents = {
  createGame: (callback: (gameId: GameId) => void) => void
  leaveGame: (gameId: GameId) => void
  joinGame: (gameId: GameId, callback: (response: ServerResponse) => void) => void
  playerReady: (gameId: GameId) => void
  answer: (gameId: GameId, questionId: string, answerId: string) => void
}

export type ServerToClientEvents = {
  session: (sessionId: SessionId, user: User) => void
  updateGameData: (gameData: GameData) => void
  serverError: (message: string) => void
}

export type SocketData = {
  sessionId: SessionId
}
