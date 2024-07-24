import { useState } from 'react'
import { socket } from '@/libs/socket'
import Button from '@/components/ui/Button'

type Props = {
  onGoBack: () => void
  onSuccess: () => void
}

export default function JoinGame({ onGoBack, onSuccess }: Props) {
  const [userInput, setUserInput] = useState<string>('')
  const [joinGameError, setJoinGameError] = useState<string>('')

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
    <>
      <input type="text" onChange={handleInputChange} placeholder="Type game code here..." />
      <Button disabled={!userInput} onClick={joinGame}>
        Join
      </Button>
      {/* rkq: add min height to not move text around */}
      {/* rkq: just  joinGameError?*/}
      <div>{joinGameError && <p>{joinGameError}</p>}</div>
      <Button onClick={cancelGameJoin}>Back</Button>
    </>
  )
}
