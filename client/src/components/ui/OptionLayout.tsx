type Props = {
  header: React.ReactNode
  option1: React.ReactNode
  option2: React.ReactNode
}

export default function OptionLayout({ header, option1, option2 }: Props) {
  return (
    <div className="container mx-auto flex h-full flex-col items-center">
      <div className="mt-4 h-9 w-3/4 md:h-11">{header}</div>
      <div className="flex h-full w-3/4 flex-row items-center justify-between">
        <div className="flex h-20 w-2/5 items-stretch">{option1}</div>
        <div className="flex h-20 w-2/5 items-stretch">{option2}</div>
      </div>
    </div>
  )
}
