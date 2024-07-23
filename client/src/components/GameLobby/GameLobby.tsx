import { useState } from 'react'
import CreateGame from '@/components/GameLobby/CreateGame'
import JoinGame from '@/components/GameLobby/JoinGame'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import CopyButton from '@/components/CopyButton'

type LobbyAction = 'create' | 'join' | null

export default function GameLobby() {
  const gameId = useGameStoreContext(state => state.gameId)
  const setGameId = useGameStoreContext(state => state.setGameId)
  const [lobbyAction, setLobbyAction] = useState<LobbyAction>(null)

  async function handleCreateGame() {
    setLobbyAction('create')
    const gameId = await socket.emitWithAck('createGame')
    setGameId(gameId)
  }

  function handleJoinGame() {
    setLobbyAction('join')
  }

  function handleResetActionFromCreate() {
    // send request to server to leave room
    // socket.emit('leaveGame', gameId)
    // reset game store values???
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
      <CreateGame />
      {gameId ? (
        <>
          <div>Room ID: {gameId}</div>
          <CopyButton textToCopy={gameId} />
        </>
      ) : (
        <>Generating room ID...</>
      )}
      <button onClick={handleResetActionFromCreate}>Back</button>
      {/* list of current players */}
    </>
  ) : (
    <>
      <JoinGame />
      <button onClick={() => setLobbyAction(null)}>Back</button>
    </>
  )
}
