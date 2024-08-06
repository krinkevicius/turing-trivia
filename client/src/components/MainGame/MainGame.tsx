import { useGameStoreContext } from '@/store/gameStore'
import CardLayout from '@/components/ui/CardLayout'
import GamePlayerCard from '@/components/MainGame/GamePlayerCard'
import QuestionComponent from '@/components/MainGame/QuestionComponent'
import LoadingQuestion from '@/components/ui/loading/LoadingQuestion'

export default function MainGame() {
  const currentQuestion = useGameStoreContext(state => state.currentQuestion)
  const players = useGameStoreContext(state => state.players)
  return (
    <div data-testid="main-game" className="flex h-full flex-col justify-between pb-1">
      <div>
        {currentQuestion ? <QuestionComponent question={currentQuestion} /> : <LoadingQuestion />}
      </div>
      <div>
        <CardLayout>
          {players.map(player => (
            <GamePlayerCard key={player.userId} player={player} />
          ))}
        </CardLayout>
      </div>
    </div>
  )
}
