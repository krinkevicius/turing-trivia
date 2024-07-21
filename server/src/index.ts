import { createServer } from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import type { EventsMap } from '@socket.io/component-emitter'
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '@server/types'

const app = express()
const server = createServer(app)

// rkq: move?
const SOCKET_PORT = 8181

const io = new Server<ClientToServerEvents, ServerToClientEvents, EventsMap, SocketData>(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://piehost.com'],
  },
})

io.on('connection', socket => {
  // eslint-disable-next-line no-console
  console.log('a user connected')

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('user disconnected')
  })
})
server.listen(SOCKET_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server running at port %d', SOCKET_PORT)
})
