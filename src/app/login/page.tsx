"use client"

import Link from "next/link";
import Required from "@/component/Required/Index";
import {useEffect, useState} from "react";
import DebugPanel from "@/component/DebugPanel";
import {EyeIcon, EyeSlashIcon} from "@/component/Icon";

export default function Login() {
  const [isValid, setIsValid] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const valid = !!email && !!password
    setIsValid(valid)
  }, [email, password])

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const submitForm = () => {
    console.log('submit: ', email, password);
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <h1 className="mb-2">Đăng nhập</h1>
      <div className="mb-6">Bạn chưa có tài khoản?<Link href={"#"} className="text-myRed"> Đăng ký</Link></div>

      <form action="">
        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Email <Required /></label>
          <input type="email" className="text-[17px] px-3 py-[10px] form_control" value={email} onChange={onChangeEmail} placeholder="email@gmail.com"/>
          <div className={'text-myRed mt-1 text-[12px]'}>error email</div>
        </div>
        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Password <Required /></label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} className="pr-10 text-[17px] px-3 py-[10px] form_control"
                   value={password} onChange={onChangePassword} placeholder="******"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[18px]"
              onClick={togglePassword}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
          <div className={'text-myRed mt-1 text-[12px]'}>error password</div>
        </div>
        <button type={"button"} className={`rounded block bg-myRed w-full text-white py-[10px] mb-3 mt-6 ${
          isValid ? 'bg-myRed opacity-100 cursor-pointer' : 'bg-myRed opacity-50 cursor-not-allowed'
        }`}
                onClick={submitForm}
        >Đăng nhập
        </button>
        <Link href={"#"} className="text-myRed text-right block">Quên mật khẩu</Link>
      </form>



      {/* DebugPanel chỉ hiển thị ở dev */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel data={{ email, password, showPassword }} />
      )}
    </div>
  )
}