import { render, screen } from '@testing-library/react'
import CreateGame from '.'

describe('CreateGame', () => {
  it('should render "Creating game..."', () => {
    render(<CreateGame />)

    expect(screen.getByText('Creating game...')).toBeInTheDocument()
  })
})
