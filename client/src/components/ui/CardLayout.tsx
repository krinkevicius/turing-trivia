interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function CardLayout({ children, className, ...props }: Props) {
  return (
    // rkq: decide on the styles
    <div className={`flex flex-row ${className}`} {...props}>
      {children}
    </div>
  )
}
