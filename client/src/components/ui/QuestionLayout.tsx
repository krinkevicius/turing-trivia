type Props = {
  question: React.ReactNode
  answers: React.ReactNode[]
}

export default function QuestionLayout({ question, answers }: Props) {
  return (
    <div className="flex flex-col h-full container mx-auto items-center gap-4">
      <div className="w-3/4 h-9 md:h-11 mt-4">{question}</div>
      <div className="grid grid-cols-2 h-9 w-3/4 gap-4">{answers}</div>
    </div>
  )
}
