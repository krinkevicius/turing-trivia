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
    <div className="flex h-full flex-col justify-between">
      <div>
        <HeaderLayout>Final scores</HeaderLayout>
        <div className="mt-4 flex flex-col items-center gap-2">
          {players
            .sort((a, b) => b.score - a.score)
            .map(player => (
              <div
                key={player.userId}
                data-testid="player-score-card"
                className="flex h-20 w-3/4 flex-row items-center justify-between rounded border-2 bg-bgTetrary px-4 py-2 text-lg"
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
