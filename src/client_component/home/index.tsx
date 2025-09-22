"use client"

import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function HomeClient() {
  const router = useRouter()

  const logout = () => {
    router.push('login') // quay về trang login
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <h1 className="text-2xl mb-4">Chào mừng bạn đến trang Home 🎉</h1>

      <Link href="login" className="text-myRed">Login</Link>

      {/*<button*/}
      {/*  onClick={logout}*/}
      {/*  className="bg-myRed text-white px-4 py-2 rounded"*/}
      {/*>*/}
      {/*  Logout*/}
      {/*</button>*/}
    </div>
  )
}