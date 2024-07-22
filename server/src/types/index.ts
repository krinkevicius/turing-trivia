// rkq change
export type SessionId = string

export type User = {
  userId: string
  username: string
}

// export type DataFomServer = {
//   sessionId: SessionId
//   user: User
// }

export type ClientToServerEvents = {
  createRoom: (callback: (roomId: string) => void) => void
  cancelRoom: (roomId: string) => void

  // rkq: delete everything below
  // getQuestion: (callback: (question: Question) => void) => void
  fakeStart: () => void
  fakeDataFromClient: (data: string) => void
}

export type ServerToClientEvents = {
  session: (sessionId: SessionId, user: User) => void
  // rkq: delete these
  fakeNoArg: () => void
  fakeBasicEmit: (a: number, b: string, c: Buffer) => void
  fakeWithAck: (d: string, callback: (e: number) => void) => void
  // fakeReceiveQuestion: (question: Question) => void
  fakeShowResults: () => void
}

export type SocketData = {
  sessionId: SessionId
}
