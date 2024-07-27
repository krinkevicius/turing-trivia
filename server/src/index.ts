// rkq: remove rule
/* eslint-disable no-console */
import { createServer } from 'node:http'
import express from 'express'
import type { Socket } from 'socket.io'
import { Server } from 'socket.io'
import type { EventsMap } from '@socket.io/component-emitter'
import type {
  ClientToServerEvents,
  Question,
  ServerToClientEvents,
  SocketData,
} from '@server/types'
import generateRandomId from '@server/utils/generateRandomId'
import { initializeGameStore, initializeSessionStore } from '@server/store'
import getQuestions from '@server/services'
import { CATEGORIES } from '@server/consts'
// import gameLoop from '@server/gameLoop'

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
const games = initializeGameStore()

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

  socket.on('createGame', callback => {
    console.log('server should createGame')
    const gameId = generateRandomId()
    games.createNewGame(gameId, user)
    socket.join(gameId)
    callback(gameId)
    console.log(socket.rooms)
    updateGame(gameId, socket)
    console.log(games.getGameById(gameId))
  })

  socket.on('leaveGame', gameId => {
    console.log(`server should leaveGame ID ${gameId}`)
    games.leaveGame(gameId, user)
    updateGame(gameId, socket)
    socket.leave(gameId)
  })

  socket.on('joinGame', (gameId, callback) => {
    const response = games.joinGame(gameId, user)
    if (response.status === 'ok') {
      socket.join(gameId)
      updateGame(gameId, socket)
    }
    callback(response)
  })

  socket.on('playerReady', gameId => {
    console.log(`player ${user.userId} is ready to play ${gameId}`)
    games.setPlayerReady(gameId, user.userId)

    updateGame(gameId, socket)

    if (games.isGameReady(gameId)) {
      gameLoop(gameId, socket)
    }
  })

  socket.on('answer', (gameId, questionId, answerId) => {
    games.setPlayerAnswer(gameId, user.userId, questionId, answerId)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
server.listen(SOCKET_PORT, () => {
  console.log('Server running at port %d', SOCKET_PORT)
})

function updateGame(
  gameId: string,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, EventsMap, SocketData>,
  toEveryone: boolean = true,
) {
  const gameData = games.getGameById(gameId)

  if (!gameData) return

  if (toEveryone) {
    io.to(gameId).emit('updateGameData', gameData)
  } else {
    socket.broadcast.emit('updateGameData', gameData)
  }
}

async function gameLoop(
  gameId: string,
  socket: Socket<ClientToServerEvents, ServerToClientEvents, EventsMap, SocketData>,
) {
  // rkq: change limit to QUESTIONS_PER_ROUND
  const questions: Question[] = await getQuestions({
    limit: 1,
    categories: Object.keys(CATEGORIES).join(','),
  })
  for (let i = 0; i < questions.length; i += 1) {
    console.log(questions[i].questionText)
    games.setQuestion(gameId, questions[i])
    updateGame(gameId, socket)
    await new Promise(resolve => {
      setTimeout(resolve, 15000)
    })
    games.checkAnswers(gameId)
    console.log(new Date())
  }

  console.log('gameLoop ended')
}
