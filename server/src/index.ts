import { createServer } from 'node:http'
import { Server } from 'socket.io'
import type { EventsMap } from '@socket.io/component-emitter'
import type { ClientToServerEvents, GameId, ServerToClientEvents, SocketData } from '@server/types'
import generateRandomId from '@server/utils/generateRandomId'
import { initializeGameStore, initializeSessionStore } from '@server/store'
import { logger } from '@server/logger'
import createApp from '@server/app'
import gameloop from '@server/gameloop'
import { config } from './config'

const app = createApp()
const server = createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents, EventsMap, SocketData>(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  },
})

const sessions = initializeSessionStore()
const games = initializeGameStore()

const gameUpdateEmmiter = (gameId: GameId) => {
  const gameData = games.getGameById(gameId)

  if (!gameData) return

  io.to(gameId).emit('updateGameData', gameData)
}

const errorEmitter = (gameId: GameId, msg: string) => {
  io.to(gameId).emit('serverError', msg)
}

io.use((socket, next) => {
  const { sessionId } = socket.handshake.auth
  const username = socket.handshake.auth.username || `anonymous_${generateRandomId(2)}`

  if (sessionId) {
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
  const user = sessions.getSessionById(socket.data.sessionId)! // session will exist, as checked in middleware

  socket.emit('session', socket.data.sessionId, user)

  socket.on('createGame', callback => {
    const gameId = generateRandomId()
    games.createNewGame(gameId, user)
    socket.join(gameId)
    callback(gameId)
    gameUpdateEmmiter(gameId)
  })

  socket.on('leaveGame', gameId => {
    games.leaveGame(gameId, user)
    socket.leave(gameId)
    gameUpdateEmmiter(gameId)
  })

  socket.on('joinGame', (gameId, callback) => {
    const response = games.joinGame(gameId, user)
    if (response.status === 'ok') {
      socket.join(gameId)
      gameUpdateEmmiter(gameId)
    }
    callback(response)
  })

  socket.on('playerReady', gameId => {
    games.setPlayerReady(gameId, user.userId)

    gameUpdateEmmiter(gameId)

    if (games.isGameReady(gameId)) {
      gameloop(gameId, games, gameUpdateEmmiter, errorEmitter)
    }
  })

  socket.on('answer', (gameId, questionId, answerId) => {
    games.setPlayerAnswer(gameId, user.userId, questionId, answerId)
  })

  socket.on('disconnect', () => {
    const gameId = games.getByPlayerId(user.userId)

    if (!gameId) return

    games.leaveGame(gameId, user)
    socket.leave(gameId)
    gameUpdateEmmiter(gameId)
  })
})

server.listen(config.port, () => {
  logger.info('Server running at port %d', config.port)
})
