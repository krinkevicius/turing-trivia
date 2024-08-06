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
      className="flex h-20 w-full flex-row items-center justify-between rounded border-2 bg-bgTetrary p-2 xl:w-1/4"
      style={{
        borderColor: player.color,
      }}
    >
      <div className="flex flex-col">
        <div>{player.username}</div>
        <div className="min-h-4 md:min-h-5">
          {player.status === 'ready' && (
            <div className="text-xs text-textSecondary md:text-sm">Ready!</div>
          )}
        </div>
      </div>
      {user.userId === player.userId && (
        <Button
          className="h-14 w-32 md:w-40"
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
