import type { APIQuestion } from '@server/types'
import formatQuestions from '@server/services/formatQuestions'

vi.mock('@server/utils/shuffleArray', () => ({
  default: vi.fn((input: any[]) => input),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('formatQuestions', () => {
  it('should format questions correctly', () => {
    const input: APIQuestion[] = [
      {
        id: '1',
        category: 'test-category',
        question: {
          text: 'question text',
        },
        tags: ['test-tag1', 'test-tag2'],
        type: 'text_choice',
        difficulty: 'easy',
        regions: ['test-region1', 'test-region2'],
        correctAnswer: 'correct answer',
        incorrectAnswers: ['incorrect answer 1', 'incorrect answer 2', 'incorrect answer 3'],
        isNiche: false,
      },
    ]

    const questions = formatQuestions(input)

    expect(questions).toHaveLength(1)

    expect(questions[0]).toEqual({
      id: '1',
      category: 'Random',
      questionText: 'question text',
      showAnswers: false,
      answers: [
        {
          id: expect.any(String),
          answerText: 'incorrect answer 1',
          isCorrect: false,
        },
        {
          id: expect.any(String),
          answerText: 'incorrect answer 2',
          isCorrect: false,
        },
        {
          id: expect.any(String),
          answerText: 'incorrect answer 3',
          isCorrect: false,
        },
        {
          id: expect.any(String),
          answerText: 'correct answer',
          isCorrect: true,
        },
      ],
    })
  })
})
