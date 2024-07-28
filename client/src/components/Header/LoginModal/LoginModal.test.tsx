import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginModal from '.'

const propFn = vi.fn()

describe('LoginModal', () => {
  it('should call prop function when X button is clicked', async () => {
    render(
      <LoginModal open={true} onClose={propFn}>
        This is test child
      </LoginModal>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'X' }))
    expect(propFn).toHaveBeenCalled()
  })

  it('should call prop function when background div is clicked', async () => {
    render(
      <LoginModal open={true} onClose={propFn}>
        This is test child
      </LoginModal>,
    )
    const user = userEvent.setup()
    await user.click(screen.getByTestId('modal-background'))
    expect(propFn).toHaveBeenCalled()
  })
})
