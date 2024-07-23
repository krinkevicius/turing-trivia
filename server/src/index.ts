// rkq: remove rule
/* eslint-disable no-console */
import { createServer } from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import type { EventsMap } from '@socket.io/component-emitter'
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@server/types'
import generateRandomId from '@server/utils/generateRandomId'
import { initializeSessionStore } from '@server/store'

const app = express()
const server = createServer(app)

// rkq: move?
const SOCKET_PORT = 8181

const io = new Server<ClientToServerEvents, ServerToClientEvents, EventsMap, SocketData>(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://piehost.com'],
  },
})

const sessions = initializeSessionStore()

io.use((socket, next) => {
  console.log('middleware...')
  console.log(socket.handshake.auth)

  const { sessionId } = socket.handshake.auth
  const username = socket.handshake.auth.username || `anonymous_${generateRandomId(2)}`

  if (sessionId) {
    console.log('sessionId found')
    const session = sessions.getSessionById(sessionId)

    if (!session) {
      const err = new Error('connection error. Please try to refresh page and login again.')
      return next(err)
    }

    socket.data = { sessionId }

    return next()
  }

  socket.data = { sessionId: generateRandomId() }

  sessions.setSession(socket.data.sessionId, { userId: generateRandomId(), username })

  return next()
})

io.on('connection', socket => {
  console.log('a user connected')

  const user = sessions.getSessionById(socket.data.sessionId)! // session will exist, as checked in middleware

  socket.emit('session', socket.data.sessionId, user)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
server.listen(SOCKET_PORT, () => {
  console.log('Server running at port %d', SOCKET_PORT)
})
