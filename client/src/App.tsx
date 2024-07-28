import { useGameStoreContext } from '@/store/gameStore'
import useGameEvents from '@/hooks/useGameEvents'
import useConnection from '@/hooks/useConnection'
import Header from '@/components/Header'
import Body from '@/components/Body'

function App() {
  useConnection()
  useGameEvents()
  // rkq: remove this after visual tests
  const gameId = useGameStoreContext(state => state.gameId)

  return (
    <div className="bg-bgPrimary text-textPrimary font-poppins">
      <div className="h-screen w-screen container mx-auto px-4">
        <Header />
        {/* rkq: remove this after visual tests */}
        <div>GAME ID: {gameId}</div>
        {/* rkq: change */}
        <div className="h-[calc(100vh-200px)]">
          <Body />
        </div>
      </div>
    </div>
  )
}

export default App
