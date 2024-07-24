import type { GameData } from '@server/shared'

// rkq: just should be GameData?
export type GameProps = GameData

export interface GameState extends GameProps {
  setGameId: (gameId: string) => void
  resetGameId: () => void
  updateGameData: (gameData: GameData) => void
  resetGameStore: () => void
}

export type GameProviderProps = React.PropsWithChildren<Partial<GameProps>>
