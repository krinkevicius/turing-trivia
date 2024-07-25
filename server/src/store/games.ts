// rkq: remove rule
/* eslint-disable no-console */

import type { GameData, User, ServerResponse } from '@server/types'

export default function initializeGameStore() {
  const gameStorage = new Map<string, GameData>()

  function createNewGame(gameId: string, user: User) {
    gameStorage.set(gameId, { gameId, status: 'waitingToStart', players: [] })
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
  return {
    gameStorage, // rkq: do I need to return this?
    createNewGame,
    getGameById,
    joinGame,
    leaveGame,
    removeGame, // rkq: do I need to return this?
  }
}
