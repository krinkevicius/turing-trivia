import { useState } from 'react'
import { socket } from '@/libs/socket'
import { useUserStoreContext } from '@/store/userStore'
import Button from '@/components/ui/Button'

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const setConnectionStatus = useUserStoreContext(state => state.setConnectionStatus)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  function connect() {
    console.log('connecting to server...')
    socket.auth = { ...socket.auth, username }
    socket.connect()
    setConnectionStatus(socket.connected ? 'connected' : 'connecting')
  }

  const buttonText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected!'
      case 'connecting':
        return 'Loading'
      default:
        return 'Login'
    }
  }
  return (
    <div>
      <input
        type="text"
        disabled={connectionStatus !== 'disconnected'}
        onChange={handleUsernameChange}
        placeholder="Type your username"
      />
      <Button disabled={!username || connectionStatus !== 'disconnected'} onClick={connect}>
        {buttonText()}
      </Button>
    </div>
  )
}
