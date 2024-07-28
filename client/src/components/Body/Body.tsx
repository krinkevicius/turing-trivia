import { useGameStoreContext } from '@/store/gameStore'
import { useUserStoreContext } from '@/store/userStore'
import GameLobby from '@/components/GameLobby'
import MainGame from '@/components/MainGame'

export default function Body() {
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const gameStatus = useGameStoreContext(state => state.status)

  if (gameStatus !== 'waitingToStart') return <MainGame />
  if (connectionStatus === 'connected') return <GameLobby />
  if (connectionStatus === 'connecting') return <>Connecting...</>
  return <>This is some random text that should explain what the website is about</>
}
