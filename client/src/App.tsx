import useConnection from '@/hooks/useConnection'
import Login from '@/components/Login'
import GameLobby from '@/components/GameLobby'
import { useUserStoreContext } from '@/store/userStore'

function App() {
  useConnection()
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const user = useUserStoreContext(state => state.user)
  const sessionId = useUserStoreContext(state => state.sessionId)
  return (
    <div>
      <div>Connection status: {connectionStatus}</div>
      <div>Session ID: {sessionId}</div>
      <div>User ID: {user?.userId}</div>
      <div>Username: {user?.username}</div>
      {connectionStatus === 'connected' ? <GameLobby /> : <Login />}
    </div>
  )
}

export default App
