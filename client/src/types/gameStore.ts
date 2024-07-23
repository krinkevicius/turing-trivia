export interface GameProps {
  gameId: string
}

export interface GameState extends GameProps {
  setGameId: (gameId: string) => void
  resetGameId: () => void
}

export type GameProviderProps = React.PropsWithChildren<Partial<GameProps>>
