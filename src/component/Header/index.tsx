import Link from 'next/link'
import { IconBack } from '@/component/Icon'

interface MobileHeaderProps {
  title: string
  backHref?: string
  className?: string
  onClose?: () => void
}

export default function Header({
                                       title,
                                       backHref = '/',
                                       className = '',
                                        onClose,
                                     }: MobileHeaderProps) {
  return (
    <div className={`flex items-center pb-2 border-b border-neutral-4 relative ${className}`}>
      <span className="cursor-pointer absolute left-4">
        {backHref ? (
          <Link href={backHref}>
            <IconBack />
          </Link>
        ) : (
          <span onClick={onClose}>
            <IconBack />
          </span>
        )}
      </span>
      <h1 className="text-2xl text-center m-auto pb-3 font-medium">{title}</h1>
    </div>
  )
}
