import { useEffect } from 'react'
import { useUserStoreContext } from '@/store/userStore'
import useInputFocus from '@/hooks/useInputFocus'
import Button from '@/components/ui/Button'

type Props = {
  username: string
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLogin: () => void
}

export default function Login({ username, onUsernameChange, onLogin }: Props) {
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const inputRef = useInputFocus()

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
    <div className="flex flex-col gap-y-2 py-4">
      <input
        ref={inputRef}
        className="focus:shadow-outline mb-3 w-full appearance-none rounded border-2 border-borderPrimary bg-bgPrimary px-3 py-2 text-textSecondary shadow focus:outline-none focus:ring-2 focus:ring-borderPrimary focus:ring-opacity-50"
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
