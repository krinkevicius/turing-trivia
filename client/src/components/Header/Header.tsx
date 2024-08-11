import { useState } from 'react'
import { useUserStoreContext } from '@/store/userStore'
import LoginModal from '@/components/Header/LoginModal'
import Button from '@/components/ui/Button'
import { socket } from '@/libs/socket'
import HeaderLayout from '@/components/ui/HeaderLayout'
import Login from '@/components/Header/Login'

export default function Header() {
  const user = useUserStoreContext(state => state.user)
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const setConnectionStatus = useUserStoreContext(state => state.setConnectionStatus)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')

  const handleModalClose = () => {
    setUsername('')
    setShowModal(false)
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  function handleLogin() {
    socket.auth = { ...socket.auth, username }
    socket.connect()
    setConnectionStatus(socket.connected ? 'connected' : 'connecting')
    handleModalClose()
  }

  return (
    <>
      <div className="flex h-24 flex-row items-center justify-center py-4">
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
                data-testid="header-login-button"
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
      <hr className="border-t-3 mb-4 border-borderPrimary" />
      {showModal && (
        <LoginModal open={showModal} onClose={handleModalClose}>
          <Login
            username={username}
            onLogin={handleLogin}
            onUsernameChange={handleUsernameChange}
          />
        </LoginModal>
      )}
    </>
  )
}
