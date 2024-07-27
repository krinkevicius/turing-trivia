import type { Question } from '@server/shared'
import { render, screen } from '@testing-library/react'
import QuestionComponent from '.'

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
}

describe('QuestionComponent', () => {
  it('should render question text and answers', () => {
    render(<QuestionComponent question={testQuestion} />)
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Madrid')).toBeInTheDocument()
    expect(screen.getByText('Berlin')).toBeInTheDocument()
    expect(screen.getByText('London')).toBeInTheDocument()
  })
})
