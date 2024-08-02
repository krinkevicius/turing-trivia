import Header from '@/components/Header'
import { ERROR_MAP } from '@/consts'

type Props = {
  message: string
}

export default function Fallback({ message }: Props) {
  const text = ERROR_MAP[message] || 'Unexpected server error. Please try again later.'

  return (
    <div className="bg-bgPrimary text-textPrimary font-poppins">
      <div className="h-screen w-screen container mx-auto px-4">
        <Header />
        <div className="h-[calc(100vh-150px)] max-h-screen py-16">
          <div className="flex justify-center items-center text-xl font-bold text-center">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
