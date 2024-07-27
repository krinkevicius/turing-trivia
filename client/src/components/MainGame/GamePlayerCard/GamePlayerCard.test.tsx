import { render, screen } from '@testing-library/react'
import type { Player } from '@server/shared'

import GamePlayerCard from '.'

describe('GamePlayerCard', () => {
  it('should render players username and score', () => {
    const testPlayer: Player = {
      userId: '12345',
      username: 'user123',
      status: 'waiting',
      score: 0,
    }

    render(<GamePlayerCard player={testPlayer} />)

    expect(screen.getByText('user123')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
