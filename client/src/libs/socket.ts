import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@server/shared'
import { useUserStore } from '@/store/userStore'

// rkq: move or create env file
const SOCKET_PORT = 8181
const URL = `http://localhost:${SOCKET_PORT}`

const { sessionId } = useUserStore.getState()

const options = sessionId
  ? {
      auth: {
        sessionId,
      },
      autoConnect: true,
    }
  : { autoConnect: false }

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, options)
