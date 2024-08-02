import type { GameId, Question, ServerGameStore } from '@server/types'
import * as Sentry from '@sentry/node'
import getQuestions from '@server/services'
import { CATEGORIES, SHOW_ANSERS_MS } from '@server/consts'
import delay from '@server/utils/delay'

export default async function gameloop(
  gameId: GameId,
  games: ServerGameStore,
  gameUpdateEmmiter: (gameId: GameId) => void,
  errorEmitter: (gameId: GameId, msg: string) => void,
) {
  // rkq: change back limit to QUESTIONS_PER_ROUND
  try {
    const questions: Question[] = await getQuestions({
      limit: 1,
      categories: Object.keys(CATEGORIES).join(','),
    })
    for (let i = 0; i < questions.length; i += 1) {
      games.setQuestion(gameId, questions[i])
      gameUpdateEmmiter(gameId)
      await delay()
      games.checkAnswers(gameId)
      gameUpdateEmmiter(gameId)
      await delay(SHOW_ANSERS_MS)
    }

    games.endGame(gameId)
    gameUpdateEmmiter(gameId)
    games.removeGame(gameId)
  } catch (error) {
    Sentry.captureException(error)
    errorEmitter(gameId, 'gameloop error')
    // io.to(gameId).emit('serverError', 'gameloop error')
  }
}
