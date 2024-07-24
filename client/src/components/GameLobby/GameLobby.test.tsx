import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameStoreProvider } from '@/store/gameStore'
import { socket } from '@/libs/socket'
import GameLobby from '.'

vi.mock('@/libs/socket', () => {
  return {
    socket: {
      emitWithAck: vitest.fn(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('mocked response')
          }, 100)
        })
      }),
      emit: vitest.fn(),
    },
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('GameLobby', () => {
  it('should render buttons to create or join a game by default', () => {
    renderGameLobby()

    expect(screen.getByText('Create or join a game')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create Game' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Join Game' })).toBeInTheDocument()
  })

  it('should not render either of the buttons when the join room button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    const createGameButton = screen.getByRole('button', { name: 'Create Game' })
    const joinGameButton = screen.getByRole('button', { name: 'Join Game' })

    await user.click(joinGameButton)

    expect(createGameButton).not.toBeInTheDocument()
    expect(joinGameButton).not.toBeInTheDocument()
  })

  it('should render elements of CreateGame component when the Create Game button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    const createGameButton = screen.getByRole('button', { name: 'Create Game' })

    await user.click(createGameButton)

    // Initially, user should see text "Generating room ID..." and "Back buttons"

    expect(screen.getByText('Generating room ID...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.queryByText('Room ID: mocked response')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument()

    expect(socket.emitWithAck).toHaveBeenCalledWith('createGame')
    // After socket returns a response, user should see the room ID and a button to copy it
    await waitFor(
      () => {
        expect(screen.getByText('Room ID: mocked response')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
        expect(screen.queryByText('Generating room ID...')).not.toBeInTheDocument()
      },
      {
        timeout: 200,
      },
    )
  })

  it('should render elements of JoinGame component when the Join Game button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    const joinGameButton = screen.getByRole('button', { name: 'Join Game' })

    await user.click(joinGameButton)

    expect(joinGameButton).not.toBeInTheDocument()

    expect(screen.getByText('Joining game...')).toBeInTheDocument()
  })

  // rkq: old tests
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
