import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import type { Question } from '@server/shared'
import { useState } from 'react'

type Props = {
  question: Question
}

export default function QuestionComponent({ question }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
  const players = useGameStoreContext(state => state.players)
  //rkq: initiate to be the same as showAnswers prop?
  const [isAnswered, setIsAnswered] = useState<boolean>(question.showAnswers)

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
          <div key={answer.id}>
            <button disabled={isAnswered} onClick={() => handleAnswer(answer.id)}>
              {answer.answerText}
            </button>
            {question.showAnswers && (
              <div>
                <p>Selected by:</p>
                {players.map(
                  player =>
                    player.selectedAnswer === answer.id && (
                      <div key={player.userId}>{player.username}</div>
                    ),
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
