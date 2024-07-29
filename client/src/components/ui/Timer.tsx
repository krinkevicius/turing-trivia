import { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'

type Props = {
  duration: number
}

export default function Timer({ duration }: Props) {
  const [scope, animate] = useAnimate()

  const radius = 30
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const timerAnimation = async () => {
      await animate(scope.current, { strokeDashoffset: 0 }, { duration: duration, ease: 'linear' })
    }
    timerAnimation()
  }, [scope, animate, duration])

  return (
    <svg data-testid="timer" viewBox="0 0 120 120">
      <g transform="rotate(-90 60 60)">
        <circle cx="60" cy="60" r={55} fill="#5b34dc" stroke="#24252d" strokeWidth="10" />
        <motion.circle
          ref={scope}
          cx="60"
          cy="60"
          r={30}
          fill="none"
          stroke="#24252d"
          strokeWidth="60"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          initial={false}
        />
      </g>
    </svg>
  )
}
