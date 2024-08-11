import type { GameId, Question, ServerGameStore } from '@server/types'
import * as Sentry from '@sentry/node'
import getQuestions from '@server/services'
import { CATEGORIES, E2E_TEST_QUESTIONS, QUESTIONS_PER_ROUND, SHOW_ANSERS_MS } from '@server/consts'
import delay from '@server/utils/delay'
import { prodLogger } from '@server/logger'
import { config } from '@server/config'
import cloneDeep from 'lodash/cloneDeep'

export default async function gameloop(
  gameId: GameId,
  games: ServerGameStore,
  gameUpdateEmmiter: (gameId: GameId) => void,
  errorEmitter: (gameId: GameId, msg: string) => void,
) {
  try {
    const questions: Question[] =
      config.env !== 'e2e'
        ? await getQuestions({
            limit: QUESTIONS_PER_ROUND,
            categories: Object.keys(CATEGORIES).join(','),
            difficulties: 'easy,medium',
          })
        : cloneDeep(E2E_TEST_QUESTIONS)
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
    prodLogger.error('error during gameloop, check Sentry')
    Sentry.captureException(error)
    errorEmitter(gameId, 'gameloop error')
  }
}
