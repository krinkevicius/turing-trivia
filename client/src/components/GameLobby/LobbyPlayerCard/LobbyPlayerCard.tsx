import Button from '@/components/ui/Button'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import { useUserStoreContext } from '@/store/userStore'
import type { Player } from '@server/shared'

type Props = {
  player: Player
}

export default function LobbyPlayerCard({ player }: Props) {
  const user = useUserStoreContext(state => state.user)
  const gameId = useGameStoreContext(state => state.gameId)
  function handleReady() {
    socket.emit('playerReady', gameId)
  }

  if (!user) return null

  return (
    <div
      className="flex flex-row justify-between items-center h-20 w-full rounded border-2 p-2 bg-bgTetrary xl:w-1/4"
      style={{
        borderColor: player.color,
      }}
    >
      <div className="flex flex-col">
        <div>{player.username}</div>
        <div className="min-h-4 md:min-h-5">
          {player.status === 'ready' && (
            <div className="text-textSecondary text-xs md:text-sm">Ready!</div>
          )}
        </div>
      </div>
      {user.userId === player.userId && (
        <Button
          className="w-32 h-14 md:w-40"
          onClick={handleReady}
          disabled={player.status === 'ready'}
          colorScheme="secondary"
        >
          {player.status === 'waiting' ? "I'm ready!" : 'Waiting for other players...'}
        </Button>
      )}
    </div>
  )
}
