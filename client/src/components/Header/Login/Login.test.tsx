import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserStoreProvider } from '@/store/userStore'
import Login from '.'

const propOnLoginFn = vi.fn()
const propOnUsernameChangeFn = vi.fn()

describe('Login', () => {
  it('should focus on the username input when the modal is opened', () => {
    renderLogin('')
    const usernameInput = screen.getByPlaceholderText('Type your username')
    expect(usernameInput).toHaveFocus()
  })

  it('should disable the login button when the username is empty', () => {
    renderLogin('')

    expect(screen.getByRole('button', { name: 'Login!' })).toBeDisabled()
  })

  it('should call prop function propOnUsernameChangeFn when username input is changed', async () => {
    renderLogin('')
    const usernameInput = screen.getByPlaceholderText('Type your username')
    const user = userEvent.setup()

    await user.type(usernameInput, 'john.doe')
    expect(propOnUsernameChangeFn).toHaveBeenCalled()
  })

  it('should call prop function propOnLoginFn when login button is clicked', async () => {
    renderLogin('john.doez')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Login!' }))
    expect(propOnLoginFn).toHaveBeenCalledTimes(1)
  })

  it('should call prop function propOnLoginFn when Enter button is pressed', async () => {
    renderLogin('john.doe')
    const user = userEvent.setup()

    await user.keyboard('{Enter}')
    expect(propOnLoginFn).toHaveBeenCalledTimes(2)
  })
})

const renderLogin = (username: string) => {
  render(
    <UserStoreProvider>
      <Login
        username={username}
        onUsernameChange={propOnUsernameChangeFn}
        onLogin={propOnLoginFn}
      />
    </UserStoreProvider>,
  )
}
