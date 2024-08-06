import OptionLayout from '@/components/ui/OptionLayout'

export default function LoadingLobby() {
  const loadingDiv: React.ReactNode = (
    <div className="h-full w-full animate-pulse rounded bg-textSecondary"></div>
  )

  return (
    <div data-testid="loading-lobby" className="h-full">
      <OptionLayout header={loadingDiv} option1={loadingDiv} option2={loadingDiv} />
    </div>
  )
}
