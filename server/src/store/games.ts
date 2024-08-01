// rkq: remove rule
/* eslint-disable no-console */
import { MAX_PLAYERS, MIN_PLAYERS, PLAYER_COLORS } from '@server/consts'
import type { GameData, User, ServerResponse, Question, GameId } from '@server/types'
import shuffleArray from '@server/utils/shuffleArray'

type ServerGameStore = {
  gameStorage: Map<string, GameData>
  createNewGame: (gameId: GameId, user: User) => void
  getGameById: (gameId: GameId) => GameData | undefined
  getByPlayerId: (userId: string) => GameId | undefined
  joinGame: (gameId: GameId, user: User) => ServerResponse
  leaveGame: (gameId: GameId, user: User) => void
  setPlayerReady: (gameId: GameId, userId: string) => ServerResponse
  setQuestion: (gameId: GameId, question: Question) => void
  setPlayerAnswer: (gameId: GameId, userId: string, questionId: string, answerId: string) => void
  checkAnswers: (gameId: GameId) => void
  isGameReady: (gameId: GameId) => boolean
  endGame: (gameId: GameId) => void
  removeGame: (gameId: GameId) => void
}

export default function initializeGameStore(): ServerGameStore {
  const gameStorage = new Map<string, GameData>()

  function createNewGame(gameId: string, user: User) {
    gameStorage.set(gameId, {
      gameId,
      status: 'waitingToStart',
      players: [],
      currentQuestion: null,
    })
    // rkq: do I need to return this? Then check based on status
    joinGame(gameId, user)
  }

  function getGameById(gameId: string) {
    return gameStorage.get(gameId)
  }

  function getByPlayerId(userId: string) {
    return Array.from(gameStorage.values()).find(game =>
      game.players.some(player => player.userId === userId),
    )?.gameId
  }

  function joinGame(gameId: string, user: User): ServerResponse {
    const game = gameStorage.get(gameId)

    if (!game || game.status !== 'waitingToStart' || game.players.length >= MAX_PLAYERS)
      return { status: 'error' }

    const color = shuffleArray(PLAYER_COLORS.filter(c => !game.players.some(p => p.color === c)))[0]

    game.players.push({ ...user, status: 'waiting', score: 0, selectedAnswer: null, color })

    return { status: 'ok' }
  }

  function setPlayerReady(gameId: string, userId: string): ServerResponse {
    const game = gameStorage.get(gameId)
    if (!game) return { status: 'error' }

    game.players = game.players.map(p => (p.userId === userId ? { ...p, status: 'ready' } : p))

    if (game.players.length >= MIN_PLAYERS && game.players.every(p => p.status === 'ready')) {
      game.status = 'inProgress'
    }
    // console.log(game)
    return { status: 'ok' }
  }

  function setQuestion(gameId: string, question: Question) {
    const game = gameStorage.get(gameId)
    if (!game) return

    game.currentQuestion = question
    console.log('setQuestion:')
    console.log('game.currentQuestion', game)
  }

  function setPlayerAnswer(gameId: GameId, userId: string, questionId: string, answerId: string) {
    const game = gameStorage.get(gameId)
    if (!game || !game.currentQuestion || game.currentQuestion.id !== questionId) return

    game.players = game.players.map(p =>
      p.userId === userId ? { ...p, selectedAnswer: answerId } : p,
    )
    console.log('player answered', game.players)
  }

  function checkAnswers(gameId: GameId) {
    const game = gameStorage.get(gameId)
    if (!game || !game.currentQuestion) return

    game.players = game.players.map(p => {
      if (p.selectedAnswer === game.currentQuestion?.answers.find(a => a.isCorrect)?.id) {
        return { ...p, score: p.score + 1 }
      }
      return p
    })
    game.currentQuestion.showAnswers = true
    console.log('game.players', game.players)
  }

  function leaveGame(gameId: string, user: User) {
    const game = gameStorage.get(gameId)
    if (!game) return

    const playerIndex = game.players.findIndex(player => player.userId === user.userId)
    if (playerIndex === -1) return

    game.players.splice(playerIndex, 1)
    console.log('game.players', game.players)
    if (game.players.length === 0) {
      removeGame(gameId)
    }
  }

  function endGame(gameId: string) {
    const game = gameStorage.get(gameId)
    if (!game) return

    game.status = 'over'
    game.currentQuestion = null
  }
  function removeGame(gameId: string) {
    console.log('removing game', gameId)
    gameStorage.delete(gameId)
    console.log('gameStorage', gameStorage)
  }

  function isGameReady(gameId: string) {
    const game = gameStorage.get(gameId)
    if (!game || game.status !== 'inProgress') return false
    return true
  }

  return {
    gameStorage, // rkq: do I need to return this?
    createNewGame,
    getGameById,
    getByPlayerId,
    joinGame,
    leaveGame,
    setPlayerReady,
    setQuestion,
    setPlayerAnswer,
    checkAnswers,
    endGame,
    isGameReady,
    removeGame, // rkq: do I need to return this?
  }
}
