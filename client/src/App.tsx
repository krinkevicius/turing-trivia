import useSocket from '@/hooks/useSocket'
// import useConnection from '@/hooks/useConnection'
import Header from '@/components/Header'
import Body from '@/components/Body'

function App() {
  useSocket()

  return (
    <div className="bg-bgPrimary text-textPrimary font-poppins">
      <div className="h-screen w-screen container mx-auto px-4">
        <Header />
        {/* rkq: change */}
        <div className="h-[calc(100vh-200px)] max-h-screen">
          <Body />
        </div>
      </div>
    </div>
  )
}

export default App
