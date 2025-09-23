"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from '@/util/helper'
import {useEffect, useState} from "react";

export default function HomeClient() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = getCookie('token')
    if (!token) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
    setIsChecking(false)
  }, [])

  const logout = () => {
    setCookie('token', '')
    setCookie('email', '')
    router.push('login') // quay về trang login
  }

  if (isChecking) return null // hoặc loading spinner

  if (!isAuthenticated) return null // tránh render giao diện nếu chưa login

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <div className="font-medium text-2xl mb-4">Chào mừng <strong className="italic text-myRed">{getCookie('email')}</strong> đến trang Home 🎉</div>

      {/*<Link href="login" className="text-myRed">Logout</Link>*/}

      <button
        onClick={logout}
        className="bg-myRed text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}