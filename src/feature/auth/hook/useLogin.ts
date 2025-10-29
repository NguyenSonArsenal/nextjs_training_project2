// src/feature/auth/hook/useLogin.ts
// gom logic liên quan đến state, side effect, xử lý… trong component React.
// Khi nào dùng hook: Khi component có nhiều state, nhiều xử lý, hoặc có thể reuse logic ở nơi khác

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { setCookie } from '@/util/helper'
import { ACCESS_TOKEN_KEY } from '@/config/system'
import { useUserStore } from '@/store/useUserStore'
import { getManagementPath } from '@/util/helper'
import {postLogin} from "@/feature/auth/service/auth.service";

export const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorAuthen, setErrorAuthen] = useState('')
  const [allowSubmit, setAllowSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const valid = !errorEmail && !errorPassword && !!email && !!password
    setAllowSubmit(valid)
  }, [email, password, errorEmail, errorPassword])

  const onChangeEmail = (val: string) => {
    setEmail(val)
    if (!val) setErrorEmail('Vui lòng nhập email')
    else if (!val.includes('@')) setErrorEmail('Email phải có kí tự @')
    else setErrorEmail('')
  }

  const onChangePassword = (val: string) => {
    setPassword(val)
    if (!val) setErrorPassword('Vui lòng nhập password')
    else if (val.length < 4) setErrorPassword('Mật khẩu ít nhất 4 kí tự')
    else if (/\s/.test(val)) setErrorPassword('Mật khẩu không được chứa khoảng trắng')
    else setErrorPassword('')
  }

  const togglePassword = () => setShowPassword((prev) => !prev)

  const submitForm = async () => {
    setIsSubmitting(true)
    setAllowSubmit(false)
    setErrorAuthen('')

    try {
      const response = await postLogin({ email, password })
      const data = await response.data

      if (data.success) {
        setCookie(ACCESS_TOKEN_KEY, data.data.access_token)
        setCookie('email', email)
        setUser(data.data)
        toast.success('Đăng nhập thành công')
        router.push(getManagementPath('dashboard'))
        return
      }

      toast.error('Tài khoản không hợp lệ')
    } catch (err) {
      console.log(err, '// err')
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
    } finally {
      setIsSubmitting(false)
      setAllowSubmit(true)
    }
  }

  return {
    email,
    password,
    showPassword,
    errorEmail,
    errorPassword,
    errorAuthen,
    allowSubmit,
    isSubmitting,
    onChangeEmail,
    onChangePassword,
    togglePassword,
    submitForm,
  }
}
