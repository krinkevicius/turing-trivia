interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      // rkq: decide on the styles
      className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-md bg-btnColor text-textPrimary rounded hover:bg-btnHover hover:text-white focus:outline-none focus:ring-2 focus:ring-btnColor focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-btnColor disabled:text-textPrimary ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
