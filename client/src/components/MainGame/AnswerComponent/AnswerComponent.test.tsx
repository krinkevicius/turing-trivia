import type { Answer, Player } from '@server/shared'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameStoreProvider } from '@/store/gameStore'
import AnswerComponent from '.'

const propFn = vi.fn()

type TestProps = {
  answer?: Answer
  showAnswers?: boolean
  players?: Player[]
}

const correctTestAnswer: Answer = {
  id: 'test-answer-1',
  answerText: 'Paris',
  isCorrect: true,
}

describe('AnswerComponent', () => {
  it('should render answer text and have a default background color', () => {
    renderAnswerComponent()

    const answer = screen.getByRole('button', { name: 'Paris' })

    expect(answer).toBeInTheDocument()
    expect(answer).toHaveStyle({ backgroundColor: '#373842' })
  })

  it('should have green background color when showAnswers is true and answer is correct', () => {
    renderAnswerComponent({ showAnswers: true })

    expect(screen.getByRole('button', { name: 'Paris' })).toHaveStyle({
      backgroundColor: '#24dc62',
    })
  })

  it('should have red background color when showAnswers is true and answer is incorrect', () => {
    renderAnswerComponent({
      answer: { ...correctTestAnswer, isCorrect: false },
      showAnswers: true,
    })

    expect(screen.getByRole('button', { name: 'Paris' })).toHaveStyle({
      backgroundColor: '#dc3434',
    })
  })

  it('should call passed onAnswer function when clicked', async () => {
    renderAnswerComponent()
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Paris' }))

    expect(propFn).toHaveBeenCalledWith('test-answer-1')
  })

  it('should render player choice when showAnswers is true', () => {
    const testPlayer: Player = {
      userId: 'test-user-id',
      username: 'test-username',
      status: 'ready',
      color: '#6224ff',
      score: 0,
      selectedAnswer: 'test-answer-1',
    }

    renderAnswerComponent({ showAnswers: true, players: [testPlayer] })

    const playerChoice = screen.getByTestId('player-choice')
    expect(playerChoice).toBeInTheDocument()
  })
})

function renderAnswerComponent({
  answer = correctTestAnswer,
  showAnswers = false,
  players = [],
}: TestProps = {}) {
  return render(
    <GameStoreProvider players={players}>
      <AnswerComponent
        answer={answer}
        disabled={false}
        showAnswers={showAnswers}
        onAnswer={propFn}
      />
    </GameStoreProvider>,
  )
}
