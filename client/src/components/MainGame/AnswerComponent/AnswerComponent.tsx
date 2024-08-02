import { useGameStoreContext } from '@/store/gameStore'
import type { Answer } from '@server/shared'

type Props = {
  answer: Answer
  disabled: boolean
  showAnswers: boolean
  onAnswer: (answerId: string) => void
}

const answerColorStyles: Record<string, string> = {
  '#373842': 'focus:ring-secondaryBtnColor disabled:bg-secondaryBtnColor', // default
  '#24dc62': 'focus:ring-correctAnswer disabled:bg-correctAnswer', // correct
  '#dc3434': 'focus:ring-incorrectAnswer disabled:bg-incorrectAnswer', //incorrect
}

export default function AnswerComponent({ answer, disabled, showAnswers, onAnswer }: Props) {
  const players = useGameStoreContext(state => state.players)
  const backgroundColor = showAnswers ? (answer.isCorrect ? '#24dc62' : '#dc3434') : '#373842'

  const baseClasses =
    'px-3 py-1.5 text-sm md:px-4 md:py-2 min-h-16 h-full w-full rounded md:text-md text-textPrimary hover:bg-secondaryBtnHover hover:text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:text-textPrimary'

  const colorClasses = answerColorStyles[backgroundColor]

  return (
    <div className="flex flex-row w-full h-full">
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
                    className="w-0 h-0 rotate-[270deg] rounded-[50%] border-t-[10px] border-x-[7px] border-x-transparent border-solid"
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
        onClick={() => onAnswer(answer.id)}
        disabled={disabled}
      >
        {answer.answerText}
      </button>
      <div className="w-3.5"></div>
    </div>
  )
}
