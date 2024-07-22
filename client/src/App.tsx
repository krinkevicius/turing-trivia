import useConnection from '@/hooks/useConnection'
import { useUserStore } from '@/store/userStore'
import Login from '@/components/Login'

function App() {
  useConnection()
  const connectionStatus = useUserStore(state => state.connectionStatus)

  return (
    <div>
      <div>Connection status: {connectionStatus}</div>
      {connectionStatus !== 'connected' && <Login />}
      <p>Hello world!</p>
    </div>
  )
}

export default App
