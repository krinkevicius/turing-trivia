import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserStoreProvider } from '@/store/userStore'
import type { Player, User } from '@server/shared'
import { socket } from '@/libs/socket'
import LobbyPlayerCard from '.'
import { GameStoreProvider } from '@/store/gameStore'

vi.mock('@/libs/socket', () => {
  return {
    socket: {
      emit: vitest.fn(),
    },
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})
const testPlayer: Player = {
  userId: '12345',
  username: 'user123',
  status: 'waiting',
  score: 0,
}

describe('LobbyPlayerCard', () => {
  it('should render a user card with the user name', () => {
    renderLobbyUserCard(testPlayer)

    expect(screen.getByText('user123')).toBeInTheDocument()
  })

  it('should render "I\'m ready!" button if user matches player', () => {
    renderLobbyUserCard(testPlayer)

    expect(screen.getByRole('button', { name: "I'm ready!" })).toBeInTheDocument()
  })

  it('should not render "I\'m ready!" button if user does not match player', () => {
    const differentPlayer: Player = {
      userId: '54321',
      username: 'user543',
      status: 'waiting',
      score: 0,
    }

    renderLobbyUserCard(differentPlayer)

    expect(screen.queryByRole('button', { name: "I'm ready!" })).not.toBeInTheDocument()
  })

  it('should render a user card with text "Ready!" and disable the button if player is ready', () => {
    const readyPlayer: Player = { ...testPlayer, status: 'ready' }
    renderLobbyUserCard(readyPlayer)

    expect(screen.getByText('Ready!')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: "I'm ready!" })).toBeDisabled()
  })

  it('should send socket request to set player status to ready when "I\'m ready!" button is clicked', async () => {
    renderLobbyUserCard(testPlayer)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: "I'm ready!" }))

    expect(socket.emit).toHaveBeenCalledWith('playerReady', 'game-id-123')
  })
})

function renderLobbyUserCard(withPlayer: Player) {
  const userViewingScreen: User = {
    userId: '12345',
    username: 'user123',
  }

  return render(
    <GameStoreProvider gameId="game-id-123">
      <UserStoreProvider user={userViewingScreen}>
        <LobbyPlayerCard player={withPlayer} />
      </UserStoreProvider>
    </GameStoreProvider>,
  )
}
