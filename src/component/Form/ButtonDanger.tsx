interface DangerButtonProps {
  children: React.ReactNode
  isSubmitting?: boolean
  handleSubmit?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset' // 👈 thêm type
}

export default function ButtonDanger({
                                        handleSubmit,
                                        children,
                                        disabled = false,
                                        isSubmitting = false,
                                        className = '',
                                        type = 'submit',
                                      }: DangerButtonProps) {
  return (
    <button
      type={type}
      onClick={() => {
        if (type === 'button' && !isSubmitting) {
          handleSubmit?.()
        }
      }}
      disabled={disabled || isSubmitting}
      className={`px-4 py-2 rounded text-white transition ${
        disabled || isSubmitting
          ? 'opacity-50 cursor-not-allowed bg-gray-400'
          : 'bg-myRed hover:bg-myRed_hover cursor-pointer'
      } ${className}`}
    >
        {children}
    </button>
  )
}
