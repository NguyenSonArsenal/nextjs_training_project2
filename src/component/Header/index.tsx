import Link from 'next/link'
import { IconBack } from '@/component/Icon'
import {useUserStore} from "@/store/useUserStore";

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
  const { user } = useUserStore()

  return (
    <div className={`flex items-center justify-between pb-2 border-b border-neutral-4 ${className}`}>
      {/* Back icon */}
      <span className="cursor-pointer pl-4">
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

      {/* Title */}
      <h1 className="text-2xl text-center flex-1 font-medium">{title}</h1>

      {/* User info */}
      <div className="pr-4 text-right text-sm text-neutral-600">
        <p>👋 Xin chào, <strong>{user?.username}</strong></p>
        <p className="text-xs text-neutral-500">📧 {user?.email}</p>
      </div>
    </div>
  )
}
