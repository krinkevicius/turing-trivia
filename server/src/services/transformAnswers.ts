import type { Answer } from '@server/types'
import generateRandomId from '@server/utils/generateRandomId'

export default function transformAnswers(input: {
  correctAnswer: string
  incorrectAnswers: string[]
}): Answer[] {
  const { correctAnswer, incorrectAnswers } = input

  return [
    ...incorrectAnswers.map(answer => ({
      id: generateRandomId(),
      answerText: answer,
      isCorrect: false,
    })),
    {
      id: generateRandomId(),
      answerText: correctAnswer,
      isCorrect: true,
    },
  ]
}
