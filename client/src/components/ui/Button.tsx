interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  colorScheme?: 'primary' | 'secondary'
}

export default function Button({ children, colorScheme = 'primary', className, ...props }: Props) {
  const baseClasses =
    'px-3 py-1.5 text-sm md:px-4 md:py-2 rounded md:text-md text-textPrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:text-textPrimary'
  const colorClasses =
    colorScheme === 'primary'
      ? 'bg-primaryBtnColor hover:bg-primaryBtnHover focus:ring-primaryBtnColor disabled:bg-primaryBtnColor'
      : 'bg-secondaryBtnColor hover:bg-secondaryBtnHover focus:ring-secondaryBtnColor disabled:bg-secondaryBtnColor'
  return (
    <button
      // rkq: decide on the styles
      className={`${baseClasses} ${colorClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
