import { useState } from 'react'
import { useUserStoreContext } from '@/store/userStore'
import LoginModal from '@/components/Header/LoginModal'
import Button from '@/components/ui/Button'
import { socket } from '@/libs/socket'
import HeaderLayout from '@/components/ui/HeaderLayout'

export default function Header() {
  const user = useUserStoreContext(state => state.user)
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const setConnectionStatus = useUserStoreContext(state => state.setConnectionStatus)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  // rkq: remove this after visual testing!
  const sessionId = useUserStoreContext(state => state.sessionId)

  const handleModalClose = () => {
    setUsername('')
    setShowModal(false)
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  function handleConnect() {
    console.log('connecting to server...')
    socket.auth = { ...socket.auth, username }
    socket.connect()
    setConnectionStatus(socket.connected ? 'connected' : 'connecting')
    handleModalClose()
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center py-4">
        <div className="flex-1"></div>
        <HeaderLayout>Turing Trivia</HeaderLayout>
        <div className="flex-1">
          <div className="ml-auto flex flex-col items-end">
            {connectionStatus === 'connected' ? (
              <>
                <p className="text-right text-xs">Logged in as</p>
                <p className="text-right text-sm">{user?.username}</p>
              </>
            ) : (
              <Button
                className="w-20"
                disabled={connectionStatus === 'connecting'}
                onClick={() => setShowModal(true)}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* rkq: remove these after visual testing! */}
      <div>Connection status: {connectionStatus}</div>
      <div>Session ID: {sessionId}</div>
      <div>User ID: {user?.userId}</div>
      <div>Username: {user?.username}</div>
      <hr className="mb-4 border-t-3 border-borderPrimary" />
      {showModal && (
        <LoginModal open={showModal} onClose={handleModalClose}>
          <div className="flex flex-col py-4 gap-y-2">
            <input
              className="shadow appearance-none border-borderPrimary border-2 rounded w-full py-2 px-3 text-textSecondary mb-3 bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-borderPrimary focus:ring-opacity-50 focus:shadow-outline"
              type="text"
              disabled={connectionStatus !== 'disconnected'}
              onChange={handleUsernameChange}
              placeholder="Type your username"
            />
            <Button disabled={!username} onClick={handleConnect}>
              Login!
            </Button>
          </div>
        </LoginModal>
      )}
    </>
  )
}
