import type { GameData, User } from '@server/types'

export default function initializeGameStore() {
  const gameStorage = new Map<string, GameData>()

  function createNewGame(gameId: string, user: User) {
    gameStorage.set(gameId, { gameId, status: 'waitingToStart', players: [] })
    joinGame(gameId, user)
  }

  function getGameById(gameId: string) {
    return gameStorage.get(gameId)
  }

  function joinGame(gameId: string, user: User) {
    const game = gameStorage.get(gameId)
    if (!game) return

    game.players.push({ ...user, score: 0 })
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

  function removeGame(gameId: string) {
    gameStorage.delete(gameId)
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
