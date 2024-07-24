import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameStoreProvider } from '@/store/gameStore'
import CreateGame from '.'

const mockedPropFn = vi.fn()

describe('CreateGame', () => {
  it('should render "Generating game ID" text and back buttons if gameId is not received from server', () => {
    renderCreateGame()

    expect(screen.getByText('Generating game ID...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.queryByText(/Game ID:/)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copy' })).not.toBeInTheDocument()
  })

  it('should render game ID, copy and back buttons if gameId is received from server', () => {
    const gameIdFromServer = '6968457d04a12a60'
    renderCreateGame(gameIdFromServer)

    expect(screen.getByText(`Game ID: ${gameIdFromServer}`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.queryByText('Generating game ID...')).not.toBeInTheDocument()
  })

  it('should call prop function when the cancel button is clicked', async () => {
    renderCreateGame()
    const user = userEvent.setup()

    const goBackButton = screen.getByRole('button', { name: 'Back' })

    await user.click(goBackButton)
    expect(mockedPropFn).toHaveBeenCalledTimes(1)
  })
})

function renderCreateGame(gameId: string = '') {
  return render(
    <GameStoreProvider gameId={gameId}>
      <CreateGame onGoBack={mockedPropFn} />
    </GameStoreProvider>,
  )
}
