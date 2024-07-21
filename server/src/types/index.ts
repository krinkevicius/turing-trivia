// rkq change
export type DataFomServer = {
  sessionId: string
  username: string
}

export type ClientToServerEvents = {
  createRoom: (callback: (roomId: string) => void) => void
  cancelRoom: (roomId: string) => void

  // rkq: delete everything below
  // getQuestion: (callback: (question: Question) => void) => void
  fakeStart: () => void
  fakeDataFromClient: (data: string) => void
}

export type ServerToClientEvents = {
  session: (data: DataFomServer) => void
  // rkq: delete these
  fakeNoArg: () => void
  fakeBasicEmit: (a: number, b: string, c: Buffer) => void
  fakeWithAck: (d: string, callback: (e: number) => void) => void
  // fakeReceiveQuestion: (question: Question) => void
  fakeShowResults: () => void
}

export type SocketData = {
  sessionId: string
  username: string
}
