type Props = {
  header: React.ReactNode
  option1: React.ReactNode
  option2: React.ReactNode
}

export default function OptionLayout({ header, option1, option2 }: Props) {
  return (
    <div className="flex flex-col h-full container mx-auto items-center">
      <div className="w-3/4 h-9 md:h-11 mt-4">{header}</div>
      <div className="flex flex-row w-3/4 h-full justify-between items-center">
        <div className="h-20 w-2/5 flex items-stretch">{option1}</div>
        <div className="h-20 w-2/5 flex items-stretch">{option2}</div>
      </div>
    </div>
  )
}
