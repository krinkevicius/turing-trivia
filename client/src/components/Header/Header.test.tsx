import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserStoreProvider } from '@/store/userStore'
import type { UserProps } from '@/types'
import Header from '.'
import { socket } from '@/libs/socket'

vi.mock('@/libs/socket', () => {
  return {
    socket: {
      connect: vitest.fn(),
    },
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Header', () => {
  it('should render the title and login button when user is not connected to the socket', () => {
    renderHeader()
    expect(screen.getByText('Turing Trivia')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('should disable the button while connection status is connecting', () => {
    renderHeader('connecting')
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
  })

  it('should render modal when login button in header is clicked', async () => {
    renderHeader()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Login' }))
    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login!' })

    expect(usernameInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should disable the login button when username is empty', async () => {
    renderHeader()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Login' }))

    const loginButton = screen.getByRole('button', { name: 'Login!' })
    expect(loginButton).toBeDisabled()
  })

  it('should call socket.connect method and close modal when the login button is clicked', async () => {
    renderHeader()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Login' }))
    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login!' })

    await user.type(usernameInput, 'john.doe')
    expect(loginButton).not.toBeDisabled()

    await user.click(loginButton)
    expect(socket.connect).toHaveBeenCalled()

    expect(usernameInput).not.toBeInTheDocument()
    expect(loginButton).not.toBeInTheDocument()
  })
})

function renderHeader(connectionStatus: UserProps['connectionStatus'] = 'disconnected') {
  return render(
    <UserStoreProvider connectionStatus={connectionStatus}>
      <Header />
    </UserStoreProvider>,
  )
}
