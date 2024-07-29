import { useUserStoreContext } from '@/store/userStore'
import type { Player } from '@server/shared'

type Props = {
  player: Player
}

export default function GamePlayerCard({ player }: Props) {
  const user = useUserStoreContext(state => state.user)

  return (
    <div
      className={`${user?.userId === player.userId ? 'flex' : 'hidden'} flex-row justify-between items-center h-20 w-full rounded border-2 py-2 px-4 text-lg bg-bgTetrary xl:flex xl:w-1/4`}
      style={{
        borderColor: player.color,
      }}
    >
      {/* rkq: move to show selected answer? */}
      {/* <div
        // src: https://css-tricks.com/the-shapes-of-css/#aa-cone-shape-via-omid-rasouli
        className="w-0 h-0 rotate-[55deg] rounded-[50%] border-t-[50px] border-x-[35px] border-x-transparent border-solid"
        style={{
          borderTopColor: player.color,
        }}
      ></div> */}
      <div>{player.username}</div>
      <div>{player.score}</div>
    </div>
  )
}
