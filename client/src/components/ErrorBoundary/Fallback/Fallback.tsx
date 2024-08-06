import Header from '@/components/Header'
import { ERROR_MAP } from '@/consts'

type Props = {
  message: string
}

export default function Fallback({ message }: Props) {
  const text = ERROR_MAP[message] || 'Unexpected server error. Please try again later.'

  return (
    <div className="bg-bgPrimary font-poppins text-textPrimary">
      <div className="container mx-auto h-screen w-screen px-4">
        <Header />
        <div className="h-[calc(100vh-150px)] max-h-screen py-16">
          <div className="flex items-center justify-center text-center text-xl font-bold">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
