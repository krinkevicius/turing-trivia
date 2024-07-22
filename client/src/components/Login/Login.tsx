import { useState } from 'react'
import { socket } from '@/libs/socket'
import { useUserStore } from '@/store/userStore'

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const connectionStatus = useUserStore(state => state.connectionStatus)
  const setConnectionStatus = useUserStore(state => state.setConnectionStatus)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  function connect() {
    console.log('connecting to server...')
    socket.auth = { username }
    socket.connect()
    setConnectionStatus(socket.connected ? 'connected' : 'connecting')
  }

  const buttonText = (() => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected!'
      case 'connecting':
        return 'Loading'
      default:
        return 'Login'
    }
  })()
  return (
    <div>
      <input
        type="text"
        disabled={connectionStatus !== 'disconnected'}
        onChange={handleUsernameChange}
        placeholder="Type your username"
      />
      <button disabled={!username || connectionStatus !== 'disconnected'} onClick={connect}>
        {buttonText}
      </button>
    </div>
  )
}
