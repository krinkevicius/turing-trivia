import type { User } from '@server/types'

export interface Player extends User {
  status: 'waiting' | 'ready'
  score: number
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
}

export interface GameData {
  gameId: string
  status: 'waitingToStart' | 'inProgress' | 'over'
  players: Player[]
  currentQuestion: Question | null
}
