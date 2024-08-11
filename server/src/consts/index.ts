import { config } from '@server/config'
import type { Question } from '@server/types'

export const CATEGORIES: Record<string, string> = {
  history: 'History',
  geography: 'Geography',
  'film_and_tv,music': 'Entertainment',
  science: 'Science',
  arts_and_literature: 'Arts & Literature',
  sport_and_leisure: 'Sports & Leisure',
}

export const QUESTIONS_PER_ROUND = config.env === 'production' ? 10 : 1

export const API_URL = 'https://the-trivia-api.com/v2/questions'

export const PLAYER_COLORS = ['#fee106', '#f49c1c', '#d90f8c', '#0296d5']

export const SERVER_DELAY_MS = config.env === 'e2e' ? 1000 : 10000
export const SHOW_ANSERS_MS = config.env === 'e2e' ? 1000 : 5000

export const MIN_PLAYERS = config.env === 'e2e' ? 1 : 2
export const MAX_PLAYERS = 4

export const CORRECT_ANSWER_POINTS = 100

export const E2E_TEST_QUESTIONS: Question[] = [
  {
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
  },
  // {
  //   id: 'test-question-2',
  //   questionText: 'What sport does LeBron James play?',
  //   answers: [
  //     {
  //       id: 'test-answer-5',
  //       answerText: 'Basketball',
  //       isCorrect: true,
  //     },
  //     {
  //       id: 'test-answer-6',
  //       answerText: 'Football',
  //       isCorrect: false,
  //     },
  //     {
  //       id: 'test-answer-7',
  //       answerText: 'Hockey',
  //       isCorrect: false,
  //     },
  //     {
  //       id: 'test-answer-8',
  //       answerText: 'Baseball',
  //       isCorrect: false,
  //     },
  //   ],
  //   category: 'sport_and_leisure',
  //   showAnswers: false,
  // },
]
