import { useGameStoreContext } from '@/store/gameStore'
import { socket } from '@/libs/socket'
import CopyButton from '@/components/CopyButton'
import Button from '@/components/ui/Button'

type Props = {
  onGoBack: () => void
}

export default function CreateGame({ onGoBack }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
  const players = useGameStoreContext(state => state.players)
  const resetGameStore = useGameStoreContext(state => state.resetGameStore)

  const cancelRoomCreation = () => {
    // send request to server to leave room
    socket.emit('leaveGame', gameId)
    // reset game store values???
    resetGameStore()
    onGoBack()
  }

  return (
    <>
      <div>Creating game...</div>
      {gameId ? (
        <>
          <div>Room ID: {gameId}</div>
          <CopyButton textToCopy={gameId} />
        </>
      ) : (
        <>Generating room ID...</>
      )}
      <Button onClick={cancelRoomCreation}>Back</Button>
      {/* rkq: list of current players */}
      {players.map(player => (
        <div key={player.userId}>
          <div>{player.username}</div>
          {/* <LobbyUserCard /> */}
        </div>
      ))}
    </>
  )
}
