import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ServerResponse } from '@server/shared'
import { socket } from '@/libs/socket'
import JoinGame from '.'

const mockedOnGoBackFn = vi.fn()
const mockedOnSuccessFn = vi.fn()
const VALID_ROOM_ID = 'valid-room-id'
const INVALID_ROOM_ID = 'invalid-room-id'

vi.mock('@/libs/socket', () => {
  return {
    socket: {
      emit: vitest.fn((_, roomId) => {
        console.log(roomId)
      }),
      emitWithAck: vitest.fn((_, roomId: string) => {
        const response: ServerResponse =
          roomId === VALID_ROOM_ID ? { status: 'ok' } : { status: 'error' }

        return new Promise(resolve => {
          setTimeout(() => {
            resolve(response)
          }, 100)
        })
      }),
    },
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('JoinGame', () => {
  it('should render main elements', () => {
    renderJoinGame()

    expect(screen.getByPlaceholderText('Type game code here...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })

  it('should focus on input element when component renders', () => {
    renderJoinGame()

    expect(screen.getByPlaceholderText('Type game code here...')).toHaveFocus()
  })

  it('should disable the button when the input is empty', () => {
    renderJoinGame()

    const joinButton = screen.getByRole('button', { name: 'Join' })

    expect(joinButton).toBeDisabled()
  })

  it('should enable the button when the input is not empty', async () => {
    renderJoinGame()
    const user = userEvent.setup()

    const input = screen.getByPlaceholderText('Type game code here...')
    const joinButton = screen.getByRole('button', { name: 'Join' })

    await user.type(input, 'game-id')
    expect(input).toHaveValue('game-id')
    expect(joinButton).not.toBeDisabled()
  })

  it('should call passed onSuccess function when the server responds with OK', async () => {
    renderJoinGame()
    const user = userEvent.setup()

    const input = screen.getByPlaceholderText('Type game code here...')
    const joinButton = screen.getByRole('button', { name: 'Join' })

    await user.type(input, VALID_ROOM_ID)
    await user.click(joinButton)

    expect(socket.emitWithAck).toHaveBeenCalledWith('joinGame', VALID_ROOM_ID)
    await waitFor(
      () => {
        expect(mockedOnSuccessFn).toHaveBeenCalled()
      },
      {
        timeout: 200,
      },
    )
  })

  it('should show an error message when the server responds with an error', async () => {
    renderJoinGame()
    const user = userEvent.setup()

    const input = screen.getByPlaceholderText('Type game code here...')
    const joinButton = screen.getByRole('button', { name: 'Join' })

    await user.type(input, INVALID_ROOM_ID)
    await user.click(joinButton)

    expect(socket.emitWithAck).toHaveBeenCalledWith('joinGame', INVALID_ROOM_ID)
    await waitFor(
      () => {
        expect(screen.getByText('Game ID incorrect, or game already started')).toBeInTheDocument()
      },
      {
        timeout: 200,
      },
    )
  })

  it('should call passed onGoBack function when the back button is clicked', async () => {
    renderJoinGame()
    const user = userEvent.setup()

    const backButton = screen.getByRole('button', { name: 'Back' })

    await user.click(backButton)

    expect(mockedOnGoBackFn).toHaveBeenCalled()
  })
})

function renderJoinGame() {
  return render(<JoinGame onGoBack={mockedOnGoBackFn} onSuccess={mockedOnSuccessFn} />)
}
