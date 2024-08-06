import { useGameStoreContext } from '@/store/gameStore'
import { socket } from '@/libs/socket'
import CopyButton from '@/components/CopyButton'
import Button from '@/components/ui/Button'
import LobbyPlayerCard from '@/components/GameLobby/LobbyPlayerCard'
import CardLayout from '@/components/ui/CardLayout'
import HeaderLayout from '@/components/ui/HeaderLayout'

type Props = {
  onGoBack: () => void
}

export default function CreateGame({ onGoBack }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
  const players = useGameStoreContext(state => state.players)
  const resetGameStore = useGameStoreContext(state => state.resetGameStore)

  const cancelGameCreation = () => {
    socket.emit('leaveGame', gameId)
    resetGameStore()
    onGoBack()
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        {gameId ? (
          <div className="mt-4 flex flex-col items-center justify-center gap-y-3">
            <HeaderLayout>
              <span className="mr-4">Game ID: {gameId}</span>
              <CopyButton textToCopy={gameId} />
            </HeaderLayout>
          </div>
        ) : (
          <HeaderLayout>Generating game ID...</HeaderLayout>
        )}
        <CardLayout className="mt-4 md:grid md:grid-cols-2">
          {players.map(player => (
            <LobbyPlayerCard key={player.userId} player={player} />
          ))}
        </CardLayout>
      </div>
      <div className="pb-1">
        <Button onClick={cancelGameCreation} colorScheme="secondary">
          Back
        </Button>
      </div>
    </div>
  )
}
