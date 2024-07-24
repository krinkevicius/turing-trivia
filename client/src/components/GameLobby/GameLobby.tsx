import { useState } from 'react'
import CreateGame from '@/components/GameLobby/CreateGame'
import JoinGame from '@/components/GameLobby/JoinGame'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import CopyButton from '@/components/CopyButton'
// import LobbyUserCard from '@/components/GameLobby/LobbyUserCard'

type LobbyAction = 'create' | 'join' | null

export default function GameLobby() {
  const gameId = useGameStoreContext(state => state.gameId)
  const players = useGameStoreContext(state => state.players)
  const setGameId = useGameStoreContext(state => state.setGameId)
  const resetGameStore = useGameStoreContext(state => state.resetGameStore)
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

  function handleResetActionFromCreate() {
    // send request to server to leave room
    socket.emit('leaveGame', gameId)
    // reset game store values???
    resetGameStore()
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
      {/* rkq: list of current players */}
      {players.map(player => (
        <div key={player.userId}>
          <div>{player.username}</div>
          {/* <LobbyUserCard /> */}
        </div>
      ))}
    </>
  ) : (
    <>
      <JoinGame />
      <button onClick={() => setLobbyAction(null)}>Back</button>
    </>
  )
}
