// utils/auth.ts
import { deleteCookie, getManagementPath } from '@/util/helper'
import { ACCESS_TOKEN_KEY } from '@/config/system'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()

  const logout = () => {
    deleteCookie([ACCESS_TOKEN_KEY, 'email'])
    router.push(getManagementPath('/auth/login'))
    setTimeout(() => {
      useUserStore.getState().clearUser() // Xóa user khỏi store sau khi redirect, tránh lỗi trống thông tin user ở header do clear storage
    }, 1000)
  }

  return logout
}
