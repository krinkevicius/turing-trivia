import type { ServerResponse, User } from '@server/types'

export type GameId = string

export interface Player extends User {
  status: 'waiting' | 'ready'
  selectedAnswer: string | null
  score: number
  color: string
}

export type APIParams = {
  limit: number
  categories: string
  difficulties: string
}

export type APIQuestion = {
  category: string
  id: string
  correctAnswer: string
  incorrectAnswers: string[]
  question: { text: string }
  tags: string[]
  type: 'text_choice'
  difficulty: string
  regions: string[]
  isNiche: boolean
}

export type Answer = {
  id: string
  answerText: string
  isCorrect: boolean
}

export type Question = {
  id: string
  questionText: string
  answers: Answer[]
  category: string
  showAnswers: boolean
}

export interface GameData {
  gameId: GameId
  status: 'waitingToStart' | 'inProgress' | 'over'
  players: Player[]
  currentQuestion: Question | null
}

export type ServerGameStore = {
  createNewGame: (gameId: GameId, user: User) => void
  getGameById: (gameId: GameId) => GameData | undefined
  getByPlayerId: (userId: string) => GameId | undefined
  joinGame: (gameId: GameId, user: User) => ServerResponse
  leaveGame: (gameId: GameId, user: User) => void
  setPlayerReady: (gameId: GameId, userId: string) => ServerResponse
  setQuestion: (gameId: GameId, question: Question) => void
  setPlayerAnswer: (gameId: GameId, userId: string, questionId: string, answerId: string) => void
  checkAnswers: (gameId: GameId) => void
  isGameReady: (gameId: GameId) => boolean
  endGame: (gameId: GameId) => void
  removeGame: (gameId: GameId) => void
}
