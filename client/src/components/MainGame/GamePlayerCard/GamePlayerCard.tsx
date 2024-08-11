import { useUserStoreContext } from '@/store/userStore'
import type { Player } from '@server/shared'

type Props = {
  player: Player
}

export default function GamePlayerCard({ player }: Props) {
  const user = useUserStoreContext(state => state.user)

  return (
    <div
      className={`${user?.userId === player.userId ? 'flex' : 'hidden'} h-20 w-full flex-row items-center justify-between rounded border-2 bg-bgTetrary px-4 py-2 text-lg xl:flex xl:w-1/4`}
      style={{
        borderColor: player.color,
      }}
    >
      <div>{player.username}</div>
      <div data-testid="player-score">{player.score}</div>
    </div>
  )
}
