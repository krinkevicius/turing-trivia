type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function LoginModal({ open, onClose, children }: Props) {
  return (
    <div
      data-testid="modal-background"
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={`bg-bgPrimary border-borderPrimary border-2 rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        onClick={event => event.stopPropagation()}
      >
        {/* rkq: add styles! */}
        <button
          className="absolute top-1 right-2 p1 rounded-lg text-textSecondary hover:text-textPrimary"
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
