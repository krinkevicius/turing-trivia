import { useGameStoreContext } from '@/store/gameStore'
import CardLayout from '@/components/ui/CardLayout'
import GamePlayerCard from '@/components/MainGame/GamePlayerCard'
import QuestionComponent from '@/components/MainGame/QuestionComponent'

export default function MainGame() {
  const currentQuestion = useGameStoreContext(state => state.currentQuestion)
  const players = useGameStoreContext(state => state.players)
  return (
    <>
      {/* rkq: remove */}
      <div>GAME SHOULD START!!!</div>
      <div>
        {currentQuestion ? <QuestionComponent question={currentQuestion} /> : <div>Loading...</div>}
      </div>
      <div>
        <CardLayout>
          {players.map(player => (
            <GamePlayerCard key={player.userId} player={player} />
          ))}
        </CardLayout>
      </div>
    </>
  )
}
