import { useUserStoreContext } from '@/store/userStore'
import { useGameStoreContext } from '@/store/gameStore'
import useGameEvents from '@/hooks/useGameEvents'
import useConnection from '@/hooks/useConnection'
import GameLobby from '@/components/GameLobby'
import MainGame from '@/components/MainGame/MainGame'
import Header from '@/components/Header'

function App() {
  useConnection()
  useGameEvents()
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const gameStatus = useGameStoreContext(state => state.status)
  // rkq: remove this after visual tests
  const gameId = useGameStoreContext(state => state.gameId)

  return (
    <div className="bg-bgPrimary text-textPrimary font-poppins">
      <div className="h-screen w-screen container mx-auto px-4">
        <Header />
        {/* rkq: remove this after visual tests */}
        <div>GAME ID: {gameId}</div>
        {gameStatus !== 'waitingToStart' && <MainGame />}
        {connectionStatus === 'connected' ? <GameLobby /> : <></>}
      </div>
    </div>
  )
}

export default App
