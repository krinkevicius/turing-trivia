import Button from '@/components/ui/Button'
import HeaderLayout from '@/components/ui/HeaderLayout'
import { useGameStoreContext } from '@/store/gameStore'

export default function ScoreBoard() {
  const players = useGameStoreContext(state => state.players)
  const resetGameStore = useGameStoreContext(state => state.resetGameStore)

  function handleGoBack() {
    resetGameStore()
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <HeaderLayout>Final scores</HeaderLayout>
        <div className="flex flex-col gap-2 items-center mt-4">
          {players
            .sort((a, b) => b.score - a.score)
            .map(player => (
              <div
                key={player.userId}
                data-testid="player-score-card"
                className="flex flex-row justify-between items-center h-20 w-3/4 rounded border-2 py-2 px-4 text-lg bg-bgTetrary"
                style={{
                  borderColor: player.color,
                }}
              >
                <div>{player.username}</div>
                <div>{player.score}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="pb-1">
        <Button colorScheme="secondary" onClick={handleGoBack}>
          Back
        </Button>
      </div>
    </div>
  )
}
