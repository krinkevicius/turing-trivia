import useConnection from '@/hooks/useConnection'
import { useUserStoreContext } from '@/store/userStore'
import useGameEvents from '@/hooks/useGameEvents'
import Login from '@/components/Login'
import GameLobby from '@/components/GameLobby'
import { useGameStoreContext } from '@/store/gameStore'

function App() {
  useConnection()
  useGameEvents()
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const user = useUserStoreContext(state => state.user)
  const sessionId = useUserStoreContext(state => state.sessionId)
  const gameId = useGameStoreContext(state => state.gameId)
  return (
    <div>
      <div>Connection status: {connectionStatus}</div>
      <div>Session ID: {sessionId}</div>
      <div>User ID: {user?.userId}</div>
      <div>Username: {user?.username}</div>
      <hr></hr>
      <div>{gameId}</div>
      {connectionStatus === 'connected' ? <GameLobby /> : <Login />}
    </div>
  )
}

export default App
