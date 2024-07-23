export type SessionId = string

export type User = {
  userId: string
  username: string
}

export type ClientToServerEvents = {
  createGame: (callback: (roomId: string) => void) => void
  cancelRoom: (roomId: string) => void

  // rkq: delete everything below
  // getQuestion: (callback: (question: Question) => void) => void
  increaseBears: () => void
  fakeStart: () => void
  fakeDataFromClient: (data: string) => void
}

export type ServerToClientEvents = {
  session: (sessionId: SessionId, user: User) => void
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
