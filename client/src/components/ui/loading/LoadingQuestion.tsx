import QuestionLayout from '@/components/ui/QuestionLayout'

export default function LoadingQuestion() {
  const loadingDiv: React.ReactNode = (
    <div className="h-full min-h-9 w-full animate-pulse rounded bg-textSecondary"></div>
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
