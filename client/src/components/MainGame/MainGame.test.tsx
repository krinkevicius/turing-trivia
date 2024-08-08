import type { Question } from '@server/shared'
import { render, screen } from '@testing-library/react'
import { GameStoreProvider } from '@/store/gameStore'
import { UserStoreProvider } from '@/store/userStore'
import MainGame from '.'

describe('MainGame', () => {
  it('should render loading text when question is not received from the server', () => {
    renderMainGame()

    expect(screen.getByTestId('loading-question')).toBeInTheDocument()
  })

  it('should render the question text when question is received from the server', () => {
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

    renderMainGame(testQuestion)

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
  })
})

function renderMainGame(currentQuestion?: Question) {
  return render(
    <UserStoreProvider>
      <GameStoreProvider currentQuestion={currentQuestion}>
        <MainGame />
      </GameStoreProvider>
      ,
    </UserStoreProvider>,
  )
}
