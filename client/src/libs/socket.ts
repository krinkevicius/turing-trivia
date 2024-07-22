import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@server/shared'

const SOCKET_PORT = 8181
const URL = `http://localhost:${SOCKET_PORT}`

//rkq: change
const id = false

const options = id
  ? {
      auth: {
        sessionId: '6bb83ebd39f3b6f6',
      },
      autoConnect: false,
    }
  : { autoConnect: false }

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, options)
