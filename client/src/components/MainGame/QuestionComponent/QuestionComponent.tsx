import type { Question } from '@server/shared'

type Props = {
  question: Question
}

export default function QuestionComponent({ question }: Props) {
  return (
    <>
      <div>{question.questionText}</div>
      <div>
        {question.answers.map(answer => (
          <div key={answer.id}>{answer.answerText}</div>
        ))}
      </div>
    </>
  )
}
