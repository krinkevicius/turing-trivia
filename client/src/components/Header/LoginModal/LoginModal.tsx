type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function LoginModal({ open, onClose, children }: Props) {
  return (
    <div
      data-testid="modal-background"
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={`rounded-xl border-2 border-borderPrimary bg-bgPrimary p-6 shadow transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={event => event.stopPropagation()}
      >
        <button
          className="p1 absolute right-2 top-1 rounded-lg text-textSecondary hover:text-textPrimary"
          title="Close"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}
