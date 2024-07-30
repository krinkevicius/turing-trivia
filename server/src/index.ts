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
// import getQuestions from '@server/services'
// import { CATEGORIES } from '@server/consts'
import { logger } from '@server/logger'
import delay from '@server/utils/delay'
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
  console.log('a user connected')

  const user = sessions.getSessionById(socket.data.sessionId)! // session will exist, as checked in middleware

  socket.emit('session', socket.data.sessionId, user)

  socket.on('createGame', callback => {
    console.log('server should createGame')
    const gameId = generateRandomId()
    games.createNewGame(gameId, user)
    socket.join(gameId)
    callback(gameId)
    updateGame(gameId, socket)
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
  logger.info('Server running at port %d', SOCKET_PORT)
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
  // rkq: change back to API and limit to QUESTIONS_PER_ROUND
  const questions: Question[] = [
    {
      id: '622a1c367cc59eab6f9503aa',
      category: 'Entertainment',
      questionText:
        'Which eighties album, selling over 20 million copies, featured an appearance by the classic horror actor Vincent Price?',
      answers: [
        {
          id: 'cc66baa9fe6e24ac',
          answerText: 'Brothers in Arms',
          isCorrect: false,
        },
        { id: '03d64a2e09a82184', answerText: 'Thriller', isCorrect: true },
        {
          id: 'ec07abcba4ea43ea',
          answerText: 'The Joshua Tree',
          isCorrect: false,
        },
        {
          id: 'de14485242289ee6',
          answerText: 'Tango in the Night',
          isCorrect: false,
        },
      ],
      showAnswers: false,
    },
    // {
    //   id: '6244373e746187c5e7be933f',
    //   category: 'Science',
    //   questionText: 'What is sodium tetraborate decahydrate commonly known as?',
    //   answers: [
    //     { id: '6591ee2ce055fe40', answerText: 'Bleach', isCorrect: false },
    //     { id: '7910439203396efa', answerText: 'Borax', isCorrect: true },
    //     {
    //       id: 'f0703f5d817d8b7d',
    //       answerText: 'Dolomite',
    //       isCorrect: false,
    //     },
    //     {
    //       id: 'aee0e0a9cfe769a9',
    //       answerText: 'Baking Soda',
    //       isCorrect: false,
    //     },
    //   ],
    //   showAnswers: false,
    // },
  ]
  // = await getQuestions({
  //   limit: 2,
  //   categories: Object.keys(CATEGORIES).join(','),
  // })
  for (let i = 0; i < questions.length; i += 1) {
    games.setQuestion(gameId, questions[i])
    updateGame(gameId, socket)
    await delay()
    games.checkAnswers(gameId)
    updateGame(gameId, socket)
    await delay()
  }

  console.log('gameLoop ended')
  games.endGame(gameId)
  updateGame(gameId, socket)
}
