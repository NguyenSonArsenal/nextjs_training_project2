interface LoadingButtonProps {
  children: React.ReactNode
  isSubmitting?: boolean
  handleSubmit?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset' // 👈 thêm type
}

export default function LoadingButton({
                                        handleSubmit,
                                        children,
                                        disabled = false,
                                        isSubmitting = false,
                                        className = '',
                                        type = 'submit',
                                      }: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={() => {
        if (type === 'button' && !isSubmitting) {
          handleSubmit?.()
        }
      }}
      disabled={disabled || isSubmitting}
      className={`rounded block w-full py-[10px] text-white transition ${
        disabled || isSubmitting
          ? 'opacity-50 cursor-not-allowed bg-gray-400'
          : 'bg-myRed hover:bg-myRed_hover cursor-pointer'
      } ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {isSubmitting && (
          <span className="loader-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        )}
        {children}
      </div>
    </button>
  )
}
