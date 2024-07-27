import { useGameStoreContext } from '@/store/gameStore'
import { socket } from '@/libs/socket'
import CopyButton from '@/components/CopyButton'
import Button from '@/components/ui/Button'
import LobbyPlayerCard from '@/components/GameLobby/LobbyPlayerCard'
import CardLayout from '@/components/ui/CardLayout'

type Props = {
  onGoBack: () => void
}

export default function CreateGame({ onGoBack }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
  const players = useGameStoreContext(state => state.players)
  const resetGameStore = useGameStoreContext(state => state.resetGameStore)

  const cancelGameCreation = () => {
    socket.emit('leaveGame', gameId)
    // rkq: does not work???
    resetGameStore()
    onGoBack()
  }

  return (
    <>
      {gameId ? (
        <>
          <div>Game ID: {gameId}</div>
          <CopyButton textToCopy={gameId} />
        </>
      ) : (
        <>Generating game ID...</>
      )}
      <Button onClick={cancelGameCreation}>Back</Button>
      <CardLayout>
        {players.map(player => (
          <LobbyPlayerCard key={player.userId} player={player} />
        ))}
      </CardLayout>
    </>
  )
}
