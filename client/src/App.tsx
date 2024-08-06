import useSocket from '@/hooks/useSocket'
import Header from '@/components/Header'
import Body from '@/components/Body'

function App() {
  useSocket()

  return (
    <div className="bg-bgPrimary font-poppins text-textPrimary">
      <div className="container mx-auto h-screen w-screen px-4">
        <Header />
        <div className="h-[calc(100dvh-150px)] max-h-screen">
          <Body />
        </div>
      </div>
    </div>
  )
}

export default App
