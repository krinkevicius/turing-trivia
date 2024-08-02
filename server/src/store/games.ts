import { CORRECT_ANSWER_POINTS, MAX_PLAYERS, MIN_PLAYERS, PLAYER_COLORS } from '@server/consts'
import type {
  GameData,
  User,
  ServerResponse,
  Question,
  GameId,
  ServerGameStore,
} from '@server/types'
import shuffleArray from '@server/utils/shuffleArray'

export default function initializeGameStore(): ServerGameStore {
  const gameStorage = new Map<string, GameData>()

  function createNewGame(gameId: string, user: User) {
    gameStorage.set(gameId, {
      gameId,
      status: 'waitingToStart',
      players: [],
      currentQuestion: null,
    })
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
    return { status: 'ok' }
  }

  function setQuestion(gameId: string, question: Question) {
    const game = gameStorage.get(gameId)
    if (!game) return

    game.currentQuestion = question
  }

  function setPlayerAnswer(gameId: GameId, userId: string, questionId: string, answerId: string) {
    const game = gameStorage.get(gameId)
    if (!game || !game.currentQuestion || game.currentQuestion.id !== questionId) return

    game.players = game.players.map(p =>
      p.userId === userId ? { ...p, selectedAnswer: answerId } : p,
    )
  }

  function checkAnswers(gameId: GameId) {
    const game = gameStorage.get(gameId)
    if (!game || !game.currentQuestion) return

    game.players = game.players.map(p => {
      if (p.selectedAnswer === game.currentQuestion?.answers.find(a => a.isCorrect)?.id) {
        return { ...p, score: p.score + CORRECT_ANSWER_POINTS }
      }
      return p
    })
    game.currentQuestion.showAnswers = true
  }

  function leaveGame(gameId: string, user: User) {
    const game = gameStorage.get(gameId)
    if (!game) return

    const playerIndex = game.players.findIndex(player => player.userId === user.userId)
    if (playerIndex === -1) return

    game.players.splice(playerIndex, 1)
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
    gameStorage.delete(gameId)
  }

  function isGameReady(gameId: string) {
    const game = gameStorage.get(gameId)
    if (!game || game.status !== 'inProgress') return false
    return true
  }

  return {
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
    removeGame,
  }
}
