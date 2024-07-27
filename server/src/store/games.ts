// rkq: remove rule
/* eslint-disable no-console */
import type { GameData, User, ServerResponse, Question } from '@server/types'

type ServerGameStore = {
  gameStorage: Map<string, GameData>
  createNewGame: (gameId: string, user: User) => void
  getGameById: (gameId: string) => GameData | undefined
  joinGame: (gameId: string, user: User) => ServerResponse
  leaveGame: (gameId: string, user: User) => void
  setPlayerReady: (gameId: string, userId: string) => ServerResponse
  setQuestion: (gameId: string, question: Question) => void
  isGameReady: (gameId: string) => boolean
  removeGame: (gameId: string) => void
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

  function joinGame(gameId: string, user: User): ServerResponse {
    const game = gameStorage.get(gameId)

    if (!game || game.status !== 'waitingToStart' || game.players.length >= 4)
      return { status: 'error' }

    game.players.push({ ...user, status: 'waiting', score: 0 })

    return { status: 'ok' }
  }

  function setPlayerReady(gameId: string, userId: string): ServerResponse {
    const game = gameStorage.get(gameId)
    if (!game) return { status: 'error' }

    game.players = game.players.map(p => (p.userId === userId ? { ...p, status: 'ready' } : p))

    if (game.players.length >= 2 && game.players.every(p => p.status === 'ready')) {
      game.status = 'inProgress'
    }
    console.log(game)
    return { status: 'ok' }
  }

  function setQuestion(gameId: string, question: Question) {
    const game = gameStorage.get(gameId)
    if (!game) return

    game.currentQuestion = question

    console.log('game.currentQuestion', game)
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
    joinGame,
    leaveGame,
    setPlayerReady,
    setQuestion,
    isGameReady,
    removeGame, // rkq: do I need to return this?
  }
}
