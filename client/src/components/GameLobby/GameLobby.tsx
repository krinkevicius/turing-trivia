import { useState } from 'react'
import CreateGame from '@/components/GameLobby/CreateGame'
import JoinGame from '@/components/GameLobby/JoinGame'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import Button from '@/components/ui/Button'

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
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setUsername(event.target.value)
    console.log(event.target.value)
  }

  function handleGoBack() {
    setLobbyAction(null)
  }

  if (!lobbyAction)
    return (
      <div>
        <h1>Create or join a game</h1>
        <button onClick={handleCreateGame}>Create Game</button>
        <button onClick={handleJoinGame}>Join Game</button>
      </div>
    )

  return lobbyAction === 'create' ? (
    <>
      <CreateGame onGoBack={handleGoBack} />
    </>
  ) : (
    <>
      <JoinGame />
      <input type="text" onChange={handleInputChange} placeholder="Type game code" />
      <Button onClick={handleJoinGame}>Join</Button>
      <Button onClick={() => setLobbyAction(null)}>Back</Button>
    </>
  )
}
