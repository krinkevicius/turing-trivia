import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { socket } from '@/libs/socket'
import { UserStoreProvider } from '@/store/userStore'
import Login from '.'

vi.mock('@/libs/socket', () => {
  let connected = false
  return {
    socket: {
      get connected() {
        return connected
      },
      set connected(value) {
        connected = value
      },
      connect: vi.fn(),
    },
  }
})

beforeEach(() => {
  vi.clearAllMocks()
  socket.connected = false
})

describe('Login', () => {
  it('should render an input for username and a button to login', () => {
    renderLogin()

    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    expect(usernameInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should disable the button when the input is empty', () => {
    renderLogin()

    const loginButton = screen.getByRole('button', { name: 'Login' })

    expect(loginButton).toBeDisabled()
  })

  it('should enable the button when the input is not empty', async () => {
    renderLogin()
    const user = userEvent.setup()

    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    await user.type(usernameInput, 'john.doe')
    expect(usernameInput).toHaveValue('john.doe')
    expect(loginButton).not.toBeDisabled()
  })

  it('should disable the input element after the button is clicked', async () => {
    renderLogin()
    const user = userEvent.setup()

    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    await user.type(usernameInput, 'john.doe')
    expect(usernameInput).toHaveValue('john.doe')

    await user.click(loginButton)
    expect(usernameInput).toBeDisabled()
  })

  it('should change button text to "Loading" when button is clicked', async () => {
    renderLogin()
    const user = userEvent.setup()

    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton).toHaveTextContent('Login')
    await user.type(usernameInput, 'john.doe')

    await user.click(loginButton)

    expect(socket.connect).toHaveBeenCalled()
    expect(socket.connected).toBe(false)

    expect(loginButton).toHaveTextContent('Loading')
  })

  it('should change button text to "Connected!" when connected', async () => {
    socket.connected = true
    renderLogin()
    const user = userEvent.setup()

    const usernameInput = screen.getByPlaceholderText('Type your username')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    await user.type(usernameInput, 'john.doe')

    await user.click(loginButton)

    expect(socket.connect).toHaveBeenCalled()
    expect(loginButton).toHaveTextContent('Connected!')
  })
})

function renderLogin() {
  return render(
    <UserStoreProvider>
      <Login />
    </UserStoreProvider>,
  )
}
