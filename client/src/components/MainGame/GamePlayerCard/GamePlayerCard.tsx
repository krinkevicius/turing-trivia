import type { Player } from '@server/shared'

type Props = {
  player: Player
}

export default function GamePlayerCard({ player }: Props) {
  return (
    <div>
      <h1>{player.username}</h1>
      <p>{player.score}</p>
    </div>
  )
}
