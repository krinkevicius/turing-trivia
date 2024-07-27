import type { APIQuestion, Question } from '@server/types'
import shuffleArray from '@server/utils/shuffleArray'
import transformAnswers from './transformAnswers'

export default function formatQuestions(input: APIQuestion[]): Question[] {
  return input.map(question => ({
    id: question.id,
    category: question.category,
    questionText: question.question.text,
    answers: shuffleArray(
      transformAnswers({
        correctAnswer: question.correctAnswer,
        incorrectAnswers: question.incorrectAnswers,
      }),
    ),
    showAnswers: false,
  }))
}
