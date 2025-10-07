interface FormErrorProps {
  message?: string
}

export default function InputErrorMessage({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className="text-myRed mt-1 text-[12px]">
      {message}
    </div>
  )
}
