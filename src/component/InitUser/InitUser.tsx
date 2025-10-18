// component/InitUser.tsx
'use client'

import { useEffect } from 'react'
import { me } from '@/controller/api'
import { useUserStore } from '@/store/useUserStore'
import { ACCESS_TOKEN_KEY } from '@/config/system'
import toast from 'react-hot-toast'
import {getCookie} from "@/util/helper";

export default function InitUser() {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const getMe = async () => {
      const user = useUserStore.getState().user
      if (user) return // ✅ Nếu đã có user → không gọi lại API

      const token = getCookie(ACCESS_TOKEN_KEY)
      if (!token) return

      try {
        const res = await me()
        const data = res.data

        if (!data.success) {
          toast.error('Không thể tải thông tin user')
          return
        }

        setUser(data.data)
      } catch (err) {
        toast.error('Lỗi khi gọi API user')
      }
    }

    getMe()
  }, [])

  return null
}
