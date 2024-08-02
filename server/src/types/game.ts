import type { User } from '@server/types'

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
