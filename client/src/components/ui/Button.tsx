import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  colorScheme?: 'primary' | 'secondary'
}

export default function Button({ children, colorScheme = 'primary', className, ...props }: Props) {
  const baseClasses =
    'md:text-md rounded px-3 py-1.5 text-sm text-textPrimary hover:text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:text-textPrimary md:px-4 md:py-2'
  const colorClasses =
    colorScheme === 'primary'
      ? 'bg-primaryBtnColor hover:bg-primaryBtnHover focus:ring-primaryBtnColor disabled:bg-primaryBtnColor'
      : 'bg-secondaryBtnColor hover:bg-secondaryBtnHover focus:ring-secondaryBtnColor disabled:bg-secondaryBtnColor'
  return (
    <button className={twMerge(`${baseClasses} ${colorClasses} ${className}`)} {...props}>
      {children}
    </button>
  )
}
