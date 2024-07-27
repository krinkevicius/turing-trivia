import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import type { Question } from '@server/shared'
import { useState } from 'react'

type Props = {
  question: Question
}

export default function QuestionComponent({ question }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
  //rkq: initiate to be the same as showAnswers prop?
  const [isAnswered, setIsAnswered] = useState<boolean>(false)

  function handleAnswer(answerId: string) {
    console.log(
      `selected answer is: ${question.answers.find(answer => answer.id === answerId)?.answerText}`,
    )
    socket.emit('answer', gameId, question.id, answerId)
    setIsAnswered(true)
  }

  return (
    <>
      <div>{question.questionText}</div>
      <div>
        {question.answers.map(answer => (
          <button key={answer.id} disabled={isAnswered} onClick={() => handleAnswer(answer.id)}>
            {answer.answerText}
          </button>
        ))}
      </div>
    </>
  )
}
