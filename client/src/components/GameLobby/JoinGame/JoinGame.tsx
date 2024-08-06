import { useState } from 'react'
import { socket } from '@/libs/socket'
import Button from '@/components/ui/Button'
import HeaderLayout from '@/components/ui/HeaderLayout'
import useInputFocus from '@/hooks/useInputFocus'

type Props = {
  onGoBack: () => void
  onSuccess: () => void
}

export default function JoinGame({ onGoBack, onSuccess }: Props) {
  const [userInput, setUserInput] = useState<string>('')
  const [joinGameError, setJoinGameError] = useState<string>('')

  const inputRef = useInputFocus()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value)
  }

  async function joinGame() {
    setJoinGameError('')
    const response = await socket.emitWithAck('joinGame', userInput)
    if (response.status === 'error') {
      setJoinGameError('Game ID incorrect, or game already started')
    } else {
      onSuccess()
    }
  }

  function cancelGameJoin() {
    setUserInput('')
    setJoinGameError('')
    onGoBack()
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <HeaderLayout>Paste the game code to join!</HeaderLayout>
        <div className="flex flex-col">
          <div className="mt-4 flex flex-row gap-2">
            <input
              ref={inputRef}
              className="focus:shadow-outline mb-3 h-14 w-full appearance-none rounded border-2 border-borderPrimary bg-bgPrimary px-3 py-2 text-textSecondary shadow focus:outline-none focus:ring-2 focus:ring-borderPrimary focus:ring-opacity-50"
              type="text"
              onChange={handleInputChange}
              placeholder="Type game code here..."
            />
            <Button className="h-14 w-40" disabled={!userInput} onClick={joinGame}>
              Join
            </Button>
          </div>
          <div className="min-h-5">
            {joinGameError && <p className="text-sm text-textSecondary">{joinGameError}</p>}
          </div>
        </div>
      </div>
      <div className="pb-1">
        <Button onClick={cancelGameJoin} colorScheme="secondary">
          Back
        </Button>
      </div>
    </div>
  )
}
