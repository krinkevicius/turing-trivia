import { useState } from 'react'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import CreateGame from '@/components/GameLobby/CreateGame'
import JoinGame from '@/components/GameLobby/JoinGame'

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
      <div data-testid="game-lobby">
        <h1>Create or join a game</h1>
        <button onClick={handleCreateGame}>Create Game</button>
        <button onClick={handleJoinGame}>Join Game</button>
      </div>
    )

  return lobbyAction === 'create' ? (
    <CreateGame onGoBack={handleGoBack} />
  ) : (
    <JoinGame onGoBack={handleGoBack} onSuccess={onJoinSuccess} />
  )
}
