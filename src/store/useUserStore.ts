// store/useUserStore.ts
"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { USER_AUTH_STORAGE_KEY } from "@/config/system"

interface User {
  username: string
  email: string
  avatar?: string
  created_at?: string
  updated_at?: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

// ✅ Tạo store với persist (cú pháp mới trong Zustand v5)
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: USER_AUTH_STORAGE_KEY, // key lưu trong localStorage
    }
  )
)
