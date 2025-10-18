"use client"

import { useRouter } from 'next/navigation'
import {deleteCookie, getCookie, getManagementPath} from '@/util/helper'
import {useEffect, useState} from "react";
import {ACCESS_TOKEN_KEY} from "@/config/system";
import Link from "next/link";

export default function HomeClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN_KEY)
    if (!token) {
      router.push(getManagementPath('/auth/login'))
    } else {
      setIsAuthenticated(true)
    }
    setIsChecking(false)
  }, [])

  const logout = () => {
    deleteCookie(ACCESS_TOKEN_KEY)
    deleteCookie('email')
    router.push(getManagementPath('/auth/login'))
  }

  if (isChecking) return null // hoặc loading spinner

  if (!isAuthenticated) return null // tránh render giao diện nếu chưa login

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <div className="font-medium text-2xl mb-4">Chào mừng <strong className="italic text-myRed">{getCookie('email')}</strong> đến trang Home 🎉</div>

      <Link className={'mb-4 block'} href={getManagementPath('/profile')}>Profile</Link>
      <Link className={'mb-4 block'} href={getManagementPath('/user')}>User</Link>

      <button
        onClick={logout}
        className="bg-myRed text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}