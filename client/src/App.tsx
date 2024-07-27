import { useUserStoreContext } from '@/store/userStore'
import { useGameStoreContext } from '@/store/gameStore'
import useGameEvents from '@/hooks/useGameEvents'
import useConnection from '@/hooks/useConnection'
import Login from '@/components/Login'
import GameLobby from '@/components/GameLobby'
import MainGame from '@/components/MainGame/MainGame'

function App() {
  useConnection()
  useGameEvents()
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const user = useUserStoreContext(state => state.user)
  const sessionId = useUserStoreContext(state => state.sessionId)
  const gameId = useGameStoreContext(state => state.gameId)
  const gameStatus = useGameStoreContext(state => state.status)
  return (
    <div>
      <div>Connection status: {connectionStatus}</div>
      <div>Session ID: {sessionId}</div>
      <div>User ID: {user?.userId}</div>
      <div>Username: {user?.username}</div>
      <hr></hr>
      <div>{gameId}</div>
      {gameStatus !== 'waitingToStart' && <MainGame />}
      {connectionStatus === 'connected' ? <GameLobby /> : <Login />}
    </div>
  )
}

export default App
