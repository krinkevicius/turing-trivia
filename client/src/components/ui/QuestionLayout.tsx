type Props = {
  question: React.ReactNode
  answers: React.ReactNode[]
}

export default function QuestionLayout({ question, answers }: Props) {
  return (
    <div className="flex flex-col h-full container mx-auto items-center gap-4">
      <div className="w-full mt-4">{question}</div>
      <div className="grid grid-cols-2 w-3/4 gap-4">{answers}</div>
    </div>
  )
}
