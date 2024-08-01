import { useEffect, useRef } from 'react'
import { useUserStoreContext } from '@/store/userStore'
import Button from '@/components/ui/Button'

type Props = {
  username: string
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLogin: () => void
}

export default function Login({ username, onUsernameChange, onLogin }: Props) {
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || !username) return

      onLogin()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onLogin, username])

  return (
    <div className="flex flex-col py-4 gap-y-2">
      <input
        ref={inputRef}
        className="shadow appearance-none border-borderPrimary border-2 rounded w-full py-2 px-3 text-textSecondary mb-3 bg-bgPrimary focus:outline-none focus:ring-2 focus:ring-borderPrimary focus:ring-opacity-50 focus:shadow-outline"
        type="text"
        disabled={connectionStatus !== 'disconnected'}
        onChange={onUsernameChange}
        placeholder="Type your username"
      />
      <Button disabled={!username} onClick={onLogin}>
        Login!
      </Button>
    </div>
  )
}
