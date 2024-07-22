import { render, screen } from '@testing-library/react'
import JoinGame from '.'

describe('JoinGame', () => {
  it('should render "Creating game..."', () => {
    render(<JoinGame />)

    expect(screen.getByText('Joining game...')).toBeInTheDocument()
  })
})
