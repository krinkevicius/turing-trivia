import useConnection from '@/hooks/useConnection'
import { useUserStore } from '@/store/userStore'
import Login from '@/components/Login'
import GameLobby from '@/components/GameLobby'
function App() {
  useConnection()
  const connectionStatus = useUserStore(state => state.connectionStatus)
  const user = useUserStore(state => state.user)
  const sessionId = useUserStore(state => state.sessionId)

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
