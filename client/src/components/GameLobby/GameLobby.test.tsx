import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameStoreProvider } from '@/store/gameStore'
import GameLobby from '.'

describe('GameLobby', () => {
  it('should render buttons to create or join a game by default', () => {
    renderGameLobby()

    expect(screen.getByText('Create or join a game')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Game' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Join Game' })).toBeInTheDocument()
  })

  it('should render "Creating game..." when "Create Game" button is clicked', async () => {
    renderGameLobby()

    await userEvent.click(screen.getByRole('button', { name: 'Create Game' }))

    expect(screen.getByText(/Creating game.../)).toBeInTheDocument()
  })

  it('should render "Joining game..." when "Join Game" button is clicked', async () => {
    renderGameLobby()

    await userEvent.click(screen.getByRole('button', { name: 'Join Game' }))

    expect(screen.getByText('Joining game...')).toBeInTheDocument()
  })
})

function renderGameLobby() {
  return render(
    <GameStoreProvider>
      <GameLobby />
    </GameStoreProvider>,
  )
}
