import useSocket from '@/hooks/useSocket'
import Header from '@/components/Header'
import Body from '@/components/Body'

function App() {
  useSocket()

  return (
    <div className="bg-bgPrimary text-textPrimary font-poppins">
      <div className="h-screen w-screen container mx-auto px-4">
        <Header />
        <div className="h-[calc(100dvh-150px)] max-h-screen">
          <Body />
        </div>
      </div>
    </div>
  )
}

export default App
