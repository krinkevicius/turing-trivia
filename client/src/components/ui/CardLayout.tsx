import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function CardLayout({ children, className, ...props }: Props) {
  return (
    <div
      className={twMerge(
        `flex w-full flex-col justify-center gap-2 xl:flex xl:flex-row ${className}`,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
