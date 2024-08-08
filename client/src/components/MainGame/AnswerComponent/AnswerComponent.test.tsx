import type { Answer, Player, User } from '@server/shared'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameStoreProvider } from '@/store/gameStore'
import AnswerComponent from '.'
import { UserStoreProvider } from '@/store/userStore'
import { socket } from '@/libs/socket'

const propFn = vi.fn()

vi.mock('@/libs/socket', () => {
  return {
    socket: {
      emit: vitest.fn(),
    },
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

type TestProps = {
  answer?: Answer
  showAnswers?: boolean
  players?: Player[]
  user?: User | null
}

const correctTestAnswer: Answer = {
  id: 'test-answer-1',
  answerText: 'Paris',
  isCorrect: true,
}

const testPlayer: Player = {
  userId: 'test-user-id',
  username: 'test-username',
  status: 'ready',
  color: '#6224ff',
  score: 0,
  selectedAnswer: 'test-answer-1',
}

const testUser: User = {
  userId: testPlayer.userId,
  username: testPlayer.username,
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
    renderAnswerComponent({
      players: [testPlayer],
    })
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Paris' }))

    expect(propFn).toHaveBeenCalled() // With('test-answer-1', expect.any(Object), '#6224ff')
  })

  it('should emit socket event with gameId, questionId, and answerId when an answer is clicked', async () => {
    renderAnswerComponent()
    const user = userEvent.setup()

    // const parisButton = screen.getByRole('button', { name: 'Paris' })

    await user.click(screen.getByRole('button', { name: 'Paris' }))

    // expect(parisButton).toBeDisabled()
    expect(socket.emit).toHaveBeenCalledWith(
      'answer',
      'test-game-id',
      'test-question-id',
      'test-answer-1',
    )
  })

  it('should indicate the answer selected by the player with colored border', async () => {
    renderAnswerComponent({
      players: [
        {
          userId: 'test-user-2',
          username: 'test-username-2',
          status: 'ready',
          color: '#6224fe',
          score: 0,
          selectedAnswer: 'test-answer-1',
        },
        testPlayer,
      ],
    })

    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Paris' }))

    expect(screen.getByTestId('answer-container')).toHaveStyle({ borderColor: testPlayer.color })
  })

  it('should render player choice when showAnswers is true', () => {
    renderAnswerComponent({ showAnswers: true, players: [testPlayer] })

    const playerChoice = screen.getByTestId('player-choice')
    expect(playerChoice).toBeInTheDocument()
  })
})

function renderAnswerComponent({
  answer = correctTestAnswer,
  showAnswers = false,
  players = [],
  user = testUser,
}: TestProps = {}) {
  return render(
    <UserStoreProvider user={user}>
      <GameStoreProvider gameId="test-game-id" players={players}>
        <AnswerComponent
          questionId="test-question-id"
          answer={answer}
          disabled={false}
          showAnswers={showAnswers}
          onAnswer={propFn}
        />
      </GameStoreProvider>
      ,
    </UserStoreProvider>,
  )
}
