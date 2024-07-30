import type { GameProps, UserProps } from '@/types'
import { render, screen } from '@testing-library/react'
import { UserStoreProvider } from '@/store/userStore'
import { GameStoreProvider } from '@/store/gameStore'
import Body from '.'

describe('Body', () => {
  it('should render intro text when user is disconnected', () => {
    renderBody()
    expect(
      screen.getByText(/This is some random text that should explain what the website is about/),
    ).toBeInTheDocument()
  })

  it('should render connecting text when user is connecting', () => {
    renderBody('connecting')
    expect(screen.getByTestId('loading-lobby')).toBeInTheDocument()
  })

  it('should render GameLobby when user is connected and game is waiting to start', () => {
    renderBody('connected')
    expect(screen.getByTestId('game-lobby')).toBeInTheDocument()
  })

  it('should render MainGame when game is in progress', () => {
    renderBody('connected', 'inProgress')
    expect(screen.getByTestId('main-game')).toBeInTheDocument()
  })

  it('should render Scoreboard when game is finished', () => {
    renderBody('connected', 'over')
    expect(screen.getByText(/final scores/i)).toBeInTheDocument()
  })
})

function renderBody(
  connectionStatus: UserProps['connectionStatus'] = 'disconnected',
  gameStatus: GameProps['status'] = 'waitingToStart',
) {
  return render(
    <UserStoreProvider connectionStatus={connectionStatus}>
      <GameStoreProvider status={gameStatus}>
        <Body />
      </GameStoreProvider>
    </UserStoreProvider>,
  )
}
