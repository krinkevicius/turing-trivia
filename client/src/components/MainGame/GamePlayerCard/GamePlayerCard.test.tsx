import { render, screen } from '@testing-library/react'
import type { Player } from '@server/shared'
import { UserStoreProvider } from '@/store/userStore'
import GamePlayerCard from '.'

describe('GamePlayerCard', () => {
  it('should render players username and score', () => {
    const testPlayer: Player = {
      userId: '12345',
      username: 'user123',
      status: 'waiting',
      score: 0,
      selectedAnswer: null,
      color: '#dc3434',
    }

    render(
      <UserStoreProvider>
        <GamePlayerCard player={testPlayer} />
      </UserStoreProvider>,
    )

    expect(screen.getByText('user123')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
