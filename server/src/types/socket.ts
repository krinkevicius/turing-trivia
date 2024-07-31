import type { GameData } from '@server/types'

export type SessionId = string
export type GameId = string

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

  // rkq: no longer needed?
  cancelRoom: (gameId: GameId) => void

  // rkq: delete everything below
  // getQuestion: (callback: (question: Question) => void) => void
  increaseBears: () => void
  fakeStart: () => void
  fakeDataFromClient: (data: string) => void
}

export type ServerToClientEvents = {
  session: (sessionId: SessionId, user: User) => void
  updateGameData: (gameData: GameData) => void
  serverError: (message: string) => void
  // rkq: delete these
  bears: () => void
  fakeNoArg: () => void
  fakeBasicEmit: (a: number, b: string, c: Buffer) => void
  fakeWithAck: (d: string, callback: (e: number) => void) => void
  // fakeReceiveQuestion: (question: Question) => void
  fakeShowResults: () => void
}

export type SocketData = {
  sessionId: SessionId
}
