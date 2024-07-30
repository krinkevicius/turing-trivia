import { render, screen } from '@testing-library/react'
import { GameStoreProvider } from '@/store/gameStore'
import type { Player } from '@server/shared'
import ScoreBoard from '.'

const testPlayers: Player[] = [
  {
    userId: 'test-player-1',
    username: 'Test Player 1',
    status: 'ready',
    selectedAnswer: null,
    color: '#000000',
    score: 200,
  },
  {
    userId: 'test-player-2',
    username: 'Test Player 2',
    status: 'ready',
    selectedAnswer: null,
    color: '#000000',
    score: 100,
  },
  {
    userId: 'test-player-3',
    username: 'Test Player 3',
    status: 'ready',
    selectedAnswer: null,
    color: '#000000',
    score: 300,
  },
]

describe('ScoreBoard', () => {
  it('should render players by scores in descending order', () => {
    renderScoreBoard()

    expect(screen.getByText(/final scores/i)).toBeInTheDocument()

    const playerScoreCards = screen.getAllByTestId('player-score-card')
    expect(playerScoreCards).toHaveLength(3)
    expect(playerScoreCards[0]).toHaveTextContent('Test Player 3')
    expect(playerScoreCards[0]).toHaveTextContent('300')
    expect(playerScoreCards[1]).toHaveTextContent('Test Player 1')
    expect(playerScoreCards[1]).toHaveTextContent('200')
    expect(playerScoreCards[2]).toHaveTextContent('Test Player 2')
    expect(playerScoreCards[2]).toHaveTextContent('100')

    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
})

function renderScoreBoard() {
  return render(
    <GameStoreProvider players={testPlayers}>
      <ScoreBoard />
    </GameStoreProvider>,
  )
}
