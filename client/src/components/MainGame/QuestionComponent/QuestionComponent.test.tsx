import type { Player, Question, User } from '@server/shared'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionComponent from '.'
import { GameStoreProvider } from '@/store/gameStore'
import { UserStoreProvider } from '@/store/userStore'

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

const testPlayer: Player = {
  userId: 'test-user-id',
  username: 'test-username',
  status: 'ready',
  color: '#6224ff',
  score: 0,
  selectedAnswer: null,
}

const testUser: User = {
  userId: testPlayer.userId,
  username: testPlayer.username,
}

const testQuestion: Question = {
  id: 'test-question-1',
  questionText: 'What is the capital of France?',
  answers: [
    {
      id: 'test-answer-1',
      answerText: 'Paris',
      isCorrect: true,
    },
    {
      id: 'test-answer-2',
      answerText: 'Madrid',
      isCorrect: false,
    },
    {
      id: 'test-answer-3',
      answerText: 'Berlin',
      isCorrect: false,
    },
    {
      id: 'test-answer-4',
      answerText: 'London',
      isCorrect: false,
    },
  ],
  category: 'geography',
  showAnswers: false,
}

describe('QuestionComponent', () => {
  it('should render question text and answers', () => {
    renderQuestionComponent()

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Paris' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Madrid' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Berlin' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'London' })).toBeInTheDocument()
  })

  it('should disable answers after one is clicked', async () => {
    renderQuestionComponent()
    const user = userEvent.setup()

    const parisButton = screen.getByRole('button', { name: 'Paris' })
    const madridButton = screen.getByRole('button', { name: 'Madrid' })
    const berlinButton = screen.getByRole('button', { name: 'Berlin' })
    const londonButton = screen.getByRole('button', { name: 'London' })

    await user.click(parisButton)

    expect(parisButton).toBeDisabled()
    expect(madridButton).toBeDisabled()
    expect(berlinButton).toBeDisabled()
    expect(londonButton).toBeDisabled()
  })

  it('should show timer if showAnswers is false', () => {
    renderQuestionComponent()

    expect(screen.getByTestId('timer')).toBeInTheDocument()
  })

  it('should not show timer if showAnswers is true', () => {
    renderQuestionComponent({ question: { ...testQuestion, showAnswers: true } })

    expect(screen.queryByTestId('timer')).not.toBeInTheDocument()
  })
})

function renderQuestionComponent({ question = testQuestion }: { question?: Question } = {}) {
  return render(
    <UserStoreProvider user={testUser}>
      <GameStoreProvider gameId="test-game-id" players={[testPlayer]}>
        <QuestionComponent question={question} />
      </GameStoreProvider>
      ,
    </UserStoreProvider>,
  )
}
