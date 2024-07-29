import AnswerComponent from '@/components/MainGame/AnswerComponent'
import QuestionLayout from '@/components/ui/QuestionLayout'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import type { Question } from '@server/shared'
import { useState } from 'react'

type Props = {
  question: Question
}

export default function QuestionComponent({ question }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
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
      <QuestionLayout
        question={
          <div className="flex items-center justify-center bg-bgSecondary rounded border-4 border-borderPrimary gap-2">
            <div className="flex-1"></div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center text-center font-bold">
                {question.questionText}
              </div>
              <div className="text-center text-sm">{question.category}</div>
            </div>
            <div className="flex-1">
              <div className="w-20 h-20 bg-green-500 ml-auto">Timer</div>
            </div>
          </div>
        }
        answers={question.answers.map(answer => (
          <AnswerComponent
            key={answer.id}
            answer={answer}
            showAnswers={question.showAnswers}
            disabled={isAnswered}
            onAnswer={handleAnswer}
          />
        ))}
      />
    </>
  )
}
