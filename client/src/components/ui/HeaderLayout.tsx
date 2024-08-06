import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function HeaderLayout({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        `flex items-center justify-center text-center text-xl font-bold sm:text-2xl md:text-4xl ${className}`,
      )}
    >
      {children}
    </div>
  )
}
