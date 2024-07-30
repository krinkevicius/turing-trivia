import { useGameStoreContext } from '@/store/gameStore'
import { useUserStoreContext } from '@/store/userStore'
import GameLobby from '@/components/GameLobby'
import MainGame from '@/components/MainGame'
import LoadingLobby from '@/components/ui/loading/LoadingLobby'
import ScoreBoard from '@/components/ScoreBoard'

export default function Body() {
  const connectionStatus = useUserStoreContext(state => state.connectionStatus)
  const gameStatus = useGameStoreContext(state => state.status)

  if (gameStatus === 'inProgress') return <MainGame />
  if (gameStatus === 'over') return <ScoreBoard />
  if (connectionStatus === 'connected') return <GameLobby />
  if (connectionStatus === 'connecting') return <LoadingLobby />
  return <>This is some random text that should explain what the website is about</>
}
