import { useGameStoreContext } from '@/store/gameStore'
import { useUserStoreContext } from '@/store/userStore'
import type { Answer } from '@server/shared'
import { useState } from 'react'
import { socket } from '@/libs/socket'

type Props = {
  answer: Answer
  questionId: string
  disabled: boolean
  showAnswers: boolean
  onAnswer: () => void
}

const answerColorStyles: Record<string, string> = {
  '#373842': 'focus:ring-secondaryBtnColor disabled:bg-secondaryBtnColor', // default
  '#24dc62': 'focus:ring-correctAnswer disabled:bg-correctAnswer', // correct
  '#dc3434': 'focus:ring-incorrectAnswer disabled:bg-incorrectAnswer', //incorrect
}

export default function AnswerComponent({
  answer,
  questionId,
  disabled,
  showAnswers,
  onAnswer,
}: Props) {
  const players = useGameStoreContext(state => state.players)
  const gameId = useGameStoreContext(state => state.gameId)
  const user = useUserStoreContext(state => state.user)
  const backgroundColor = showAnswers ? (answer.isCorrect ? '#24dc62' : '#dc3434') : '#373842'
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const playerColor = players.find(p => p.userId === user!.userId)?.color

  const baseClasses =
    'px-3 py-1.5 text-sm md:px-4 md:py-2 min-h-16 h-full w-full rounded md:text-md text-textPrimary hover:bg-secondaryBtnHover hover:text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:text-textPrimary'

  const colorClasses = answerColorStyles[backgroundColor]

  function handleAnswer() {
    setIsAnswered(true)
    socket.emit('answer', gameId, questionId, answer.id)
    onAnswer()
    // onAnswer(answer.id, containerRef, player!.color)
  }

  return (
    <div
      data-testid="answer-container"
      className="flex h-full w-full flex-row rounded px-0.5 py-4"
      style={{
        borderWidth: '2px',
        borderColor: isAnswered ? playerColor : 'transparent',
      }}
    >
      <div className="show-players w-3.5">
        {showAnswers && (
          <div className="flex flex-col gap-2">
            {players.map(
              player =>
                player.selectedAnswer === answer.id && (
                  <div
                    key={player.userId}
                    data-testid="player-choice"
                    // src: https://css-tricks.com/the-shapes-of-css/#aa-cone-shape-via-omid-rasouli
                    className="h-0 w-0 rotate-[270deg] rounded-[50%] border-x-[7px] border-t-[10px] border-solid border-x-transparent"
                    style={{
                      borderTopColor: player.color,
                    }}
                  ></div>
                ),
            )}
          </div>
        )}
      </div>

      <button
        className={`${baseClasses} ${colorClasses}`}
        style={{ backgroundColor }}
        onClick={handleAnswer}
        disabled={disabled}
      >
        {answer.answerText}
      </button>
      <div className="w-3.5"></div>
    </div>
  )
}
