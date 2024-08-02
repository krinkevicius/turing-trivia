import type { GameData } from '@server/shared'

export type GameProps = GameData

export interface GameState extends GameProps {
  setGameId: (gameId: string) => void
  updateGameData: (gameData: GameData) => void
  resetGameStore: () => void
}

export type GameProviderProps = React.PropsWithChildren<Partial<GameProps>>
