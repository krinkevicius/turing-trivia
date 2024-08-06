type Props = {
  question: React.ReactNode
  answers: React.ReactNode[]
}

export default function QuestionLayout({ question, answers }: Props) {
  return (
    <div className="container mx-auto flex h-full flex-col items-center gap-4">
      <div className="mt-4 w-full">{question}</div>
      <div className="grid w-3/4 grid-cols-2 gap-4">{answers}</div>
    </div>
  )
}
