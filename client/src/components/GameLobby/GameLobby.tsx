import { useState } from 'react'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import CreateGame from '@/components/GameLobby/CreateGame'
import JoinGame from '@/components/GameLobby/JoinGame'
import HeaderLayout from '@/components/ui/HeaderLayout'
import Button from '@/components/ui/Button'
import OptionLayout from '@/components/ui/OptionLayout'

type LobbyAction = 'create' | 'join' | null

export default function GameLobby() {
  const gameId = useGameStoreContext(state => state.gameId)
  const setGameId = useGameStoreContext(state => state.setGameId)
  const [lobbyAction, setLobbyAction] = useState<LobbyAction>(null)

  async function handleCreateGame() {
    setLobbyAction('create')
    const response = await socket.emitWithAck('createGame')
    if (!gameId) {
      // rkq: remove
      console.log('game lobby is updating gameId')
      setGameId(response)
    }
  }

  function handleJoinGame() {
    setLobbyAction('join')
  }

  function onJoinSuccess() {
    setLobbyAction('create')
  }

  function handleGoBack() {
    setLobbyAction(null)
  }

  if (!lobbyAction)
    return (
      <div data-testid="game-lobby" className="h-full">
        <OptionLayout
          header={<HeaderLayout>Create or join a game</HeaderLayout>}
          option1={
            <Button className="bg-red-500 w-full" onClick={handleCreateGame}>
              Create Game
            </Button>
          }
          option2={
            <Button className="bg-red-500 w-full" onClick={handleJoinGame}>
              Join Game
            </Button>
          }
        />
      </div>
    )

  return lobbyAction === 'create' ? (
    <CreateGame onGoBack={handleGoBack} />
  ) : (
    <JoinGame onGoBack={handleGoBack} onSuccess={onJoinSuccess} />
  )
}
