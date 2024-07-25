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
    // rkq: send socket request to set player status to ready
    socket.emit('playerReady', gameId)
  }

  if (!user) return null

  return (
    <>
      <div>{player.username}</div>
      {/* rkq: Add some sort of avatar? */}
      {/* rkq: add height */}
      <div>{player.status === 'ready' && <div>Ready!</div>}</div>
      {user.userId === player.userId && (
        <Button onClick={handleReady} disabled={player.status === 'ready'}>
          I'm ready!
        </Button>
      )}
    </>
  )
}
