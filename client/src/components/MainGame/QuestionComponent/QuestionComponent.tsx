import AnswerComponent from '@/components/MainGame/AnswerComponent'
import QuestionLayout from '@/components/ui/QuestionLayout'
import Timer from '@/components/ui/Timer'
import { socket } from '@/libs/socket'
import { useGameStoreContext } from '@/store/gameStore'
import type { Question } from '@server/shared'
import { useEffect, useState } from 'react'

type Props = {
  question: Question
}

export default function QuestionComponent({ question }: Props) {
  const gameId = useGameStoreContext(state => state.gameId)
  const [isAnswered, setIsAnswered] = useState<boolean>(question.showAnswers)

  //To synchronize isAnswered with showAnswers
  useEffect(() => {
    setIsAnswered(question.showAnswers)
  }, [question])

  function handleAnswer(answerId: string) {
    socket.emit('answer', gameId, question.id, answerId)
    setIsAnswered(true)
  }

  return (
    <>
      <QuestionLayout
        question={
          <div className="flex items-center justify-center gap-2 rounded border-4 border-borderPrimary bg-bgSecondary">
            <div className="flex-1"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center text-center font-bold">
                {question.questionText}
              </div>
              <div className="text-center text-sm">{question.category}</div>
            </div>
            <div className="flex-1">
              <div className="ml-auto h-20 w-20 p-2">
                {!question.showAnswers && <Timer duration={10} />}
              </div>
            </div>
          </div>
        }
        answers={question.answers.map(answer => (
          <AnswerComponent
            key={answer.id}
            answer={answer}
            showAnswers={question.showAnswers}
            disabled={isAnswered || question.showAnswers}
            onAnswer={handleAnswer}
          />
        ))}
      />
    </>
  )
}
