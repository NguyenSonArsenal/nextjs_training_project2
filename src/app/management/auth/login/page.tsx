"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import DebugPanel from "@/component/DebugPanel";
import {EyeIcon, EyeSlashIcon} from "@/component/Icon";
import { useRouter } from 'next/navigation'
import {delay, getManagementPath, setCookie} from "@/util/helper";
import {postLogin} from "@/controller/api";
import toast from "react-hot-toast";
import {ACCESS_TOKEN_KEY} from "@/config/system";
import Required from "@/component/Required";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorAuthen, setErrorAuthen] = useState('')
  const [allowSubmit, setAllowSubmit] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!email && !password) {
      setAllowSubmit(false)
      return
    }
    const valid = !errorEmail && !errorPassword && !!email && !!password
    setAllowSubmit(valid)
  }, [email, password])

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onChangeEmail = (e) => {
    const val = e.target.value
    setEmail(val);
    if (!val) {
      setErrorEmail("Vui lòng nhập email")
    } else if (!val.includes('@')) {
      setErrorEmail("Email phải có kí tự @")
    } else {
      setErrorEmail("")
    }
  }

  const onChangePassword = (e) => {
    const val = e.target.value
    setPassword(val);
    if (!val) {
      setErrorPassword("Vui lòng nhập password")
    } else if (val.length < 4) {
      setErrorPassword("Mật khẩu ít nhất 4 kí tự")
    } else if (/\s/.test(val)){
      setErrorPassword("Mật khẩu không được chứa khoảng trắng")
    } else {
      setErrorPassword("")
    }
  }

  const submitForm = async () => {
    setAllowSubmit(false)
    setErrorAuthen('')
    await delay(1000)

    try {
      const response = await postLogin({
        email: email,
        password: password
      });

      const data = await response.data;
      if (data.success) {
        setCookie(ACCESS_TOKEN_KEY, data.data.accessToken)
        setCookie('email', email)
        toast.success("Đăng nhập thành công")
        return router.push(getManagementPath(''))
      }
      toast.error("Tài khoản không hợp lệ")
    } catch (err) {
      console.log(err, '// err')
      toast.error("Đã có lỗi sảy ra vui lòng thử lại sau")
    } finally {
      setAllowSubmit(true)
    }
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <h1 className="mb-2">Đăng nhập</h1>
      <div className="mb-6">Bạn chưa có tài khoản?<Link href={"register"} className="text-myRed"> Đăng ký</Link></div>

      <form action="">
        {errorAuthen && <div className={'text-myRed mb-4 text-[12px]'}>{errorAuthen}</div>}
        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Email <Required /></label>
          <input type="email" className="text-[17px] px-3 py-[10px] form_control" value={email} onChange={onChangeEmail} placeholder="email@gmail.com"/>
          {errorEmail && <div className={'text-myRed mt-1 text-[12px]'}>{errorEmail}</div>}
        </div>
        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Mật khẩu <Required /></label>
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
          {errorPassword && <div className={'text-myRed mt-1 text-[12px]'}>{errorPassword}</div>}
        </div>
        <button type={"button"}
                className={`rounded block bg-myRed w-full text-white py-[10px] mb-3 mt-6
                  ${
                  allowSubmit ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                } 
                `}

                disabled={!allowSubmit}
                onClick={submitForm}
        >
          Đăng nhập
        </button>
        <Link href={"#"} className="text-myRed text-right block">Quên mật khẩu</Link>
      </form>



      {/* DebugPanel chỉ hiển thị ở dev */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel data={{ email, password, showPassword, allowSubmit }} />
      )}
    </div>
  )
}