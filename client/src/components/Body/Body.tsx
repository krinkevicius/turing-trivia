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
  return (
    <div className="flex flex-col container mx-auto px-8 gap-4 text-xs md:text-base">
      <div className="text-xl font-bold text-center">Welcome to the Ultimate Trivia Challenge!</div>
      <p>
        Get ready for an exciting journey through the world of trivia! Whether you're a history
        buff, a science enthusiast, or a sports fanatic, there's something here for everyone.
      </p>

      <div className="text-xl font-bold text-center">Invite your friends!</div>
      <p>
        You can team up with up to 3 friends to form a group of 2-4 players. Don't have a group? No
        problem! You can join an existing game and make new friends along the way.
      </p>

      <div className="text-xl font-bold text-center">Categories to Challenge Your Mind:</div>
      <ul className="list-disc">
        <li>
          <strong>History</strong>: Test your knowledge of the past.
        </li>
        <li>
          <strong>Geography</strong>: Explore the world without leaving your seat.
        </li>
        <li>
          <strong>Entertainment</strong>: From movies to music, show what you know.
        </li>
        <li>
          <strong>Science</strong>: Dive into the wonders of the universe.
        </li>
        <li>
          <strong>Arts & Literature</strong>: Celebrate creativity and culture.
        </li>
        <li>
          <strong>Sports & Leisure</strong>: Prove your prowess in the world of sports.
        </li>
      </ul>

      <p>
        To start the game, press login button up top. This will allow to create or join a game that
        your friends created.
      </p>

      <p>So, what are you waiting for? Invite your friends and let the trivia adventure begin!</p>
    </div>
  )
}
