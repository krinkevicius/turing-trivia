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
        {/* rkq: change */}
        <div className="h-[calc(100vh-200px)] max-h-screen">{text}</div>
      </div>
    </div>
  )
}
