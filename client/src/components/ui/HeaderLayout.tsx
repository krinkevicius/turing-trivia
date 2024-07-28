interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function HeaderLayout({ children, className }: Props) {
  return (
    <div className={`text-xl sm:text-2xl md:text-4xl font-bold text-center ${className}`}>
      {children}
    </div>
  )
}
