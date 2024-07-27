import { useGameStoreContext } from '@/store/gameStore'
import GamePlayerCard from '@/components/MainGame/GamePlayerCard'

export default function MainGame() {
  const currentQuestion = useGameStoreContext(state => state.currentQuestion)
  const players = useGameStoreContext(state => state.players)
  return (
    <>
      {/* rkq: remove */}
      <div>GAME SHOULD START!!!</div>
      <div>
        {currentQuestion ? (
          <>
            <div>This should be a component to return question</div>
            <div>{currentQuestion.questionText}</div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        {players.map(player => (
          <GamePlayerCard key={player.userId} player={player} />
        ))}
      </div>
    </>
  )
}
