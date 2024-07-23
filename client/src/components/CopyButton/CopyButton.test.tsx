import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CopyButton from '.'

describe('CopyButton', () => {
  it('should render a button with initial text Copy', () => {
    render(<CopyButton textToCopy="Hello, World!" />)
    const copyButton = screen.getByRole('button', { name: 'Copy' })
    expect(copyButton).toBeInTheDocument()
  })

  it('should change button text to "Copied!" after clicking and back to "Copy" after a delay', async () => {
    const user = userEvent.setup()
    render(<CopyButton textToCopy="Hello, World!" delay={100} />)
    const copyButton = screen.getByRole('button', { name: /copy/i })

    await user.click(copyButton)

    expect(copyButton).toHaveTextContent('Copied!')

    await waitFor(() => expect(copyButton).toHaveTextContent('Copy'), { timeout: 200 })
  })

  it('should place the text in the clipboard after clicking', async () => {
    const user = userEvent.setup()
    render(<CopyButton textToCopy="Hello, World!" />)
    const copyButton = screen.getByRole('button', { name: /copy/i })
    await user.click(copyButton)

    const clipboardText = await navigator.clipboard.readText()

    expect(clipboardText).toBe('Hello, World!')
  })

  it('should disable button when textToCopy is empty string', async () => {
    render(<CopyButton textToCopy="" />)

    const copyButton = screen.getByRole('button', { name: /copy/i })
    expect(copyButton).toBeDisabled()
  })
})
