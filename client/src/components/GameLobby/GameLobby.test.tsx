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

  it('should not render either of the buttons when the Join Game button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    const createGameButton = screen.getByRole('button', { name: 'Create Game' })
    const joinGameButton = screen.getByRole('button', { name: 'Join Game' })

    await user.click(joinGameButton)

    expect(createGameButton).not.toBeInTheDocument()
    expect(joinGameButton).not.toBeInTheDocument()
  })

  it('should not render either of the buttons when the Create Game button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    const createGameButton = screen.getByRole('button', { name: 'Create Game' })
    const joinGameButton = screen.getByRole('button', { name: 'Join Game' })

    await user.click(createGameButton)

    expect(createGameButton).not.toBeInTheDocument()
    expect(joinGameButton).not.toBeInTheDocument()
  })

  it('should render elements of CreateGame component when the Create Game button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Create Game' }))

    // Initially, user should see text "Generating game ID..." and "Back buttons"

    expect(screen.getByText('Generating game ID...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.queryByText('Game ID: mocked response')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument()

    expect(socket.emitWithAck).toHaveBeenCalledWith('createGame')
    // After socket returns a response, user should see the game ID and a button to copy it
    await waitFor(
      () => {
        expect(screen.getByText('Game ID: mocked response')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
        expect(screen.queryByText('Generating game ID...')).not.toBeInTheDocument()
      },
      {
        timeout: 200,
      },
    )
  })

  it('should render elements of JoinGame component when the Join Game button is clicked', async () => {
    renderGameLobby()
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Join Game' }))

    expect(screen.getByPlaceholderText('Type game code here...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
})

function renderGameLobby() {
  return render(
    <GameStoreProvider>
      <GameLobby />
    </GameStoreProvider>,
  )
}
