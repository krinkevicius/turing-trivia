import QuestionLayout from '@/components/ui/QuestionLayout'

export default function LoadingQuestion() {
  const loadingDiv: React.ReactNode = (
    <div className="animate-pulse bg-textSecondary min-h-9 h-full w-full rounded"></div>
  )

  return (
    <div data-testid="loading-question" className="h-full">
      <QuestionLayout
        question={loadingDiv}
        answers={[loadingDiv, loadingDiv, loadingDiv, loadingDiv]}
      />
    </div>
  )
}
