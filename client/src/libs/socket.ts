import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@server/shared'

const SOCKET_PORT = 8181
const URL = `http://localhost:${SOCKET_PORT}`

const options = { autoConnect: false }

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, options)
