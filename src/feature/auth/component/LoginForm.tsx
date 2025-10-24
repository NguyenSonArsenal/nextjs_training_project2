'use client'

import Link from 'next/link'
import DebugPanel from '@/component/DebugPanel'
import { EyeIcon, EyeSlashIcon } from '@/component/Icon'
import Required from '@/component/Form/Required'
import ButtonLoading from '@/component/Form/ButtonLoading'
import { useLogin } from '@/feature/auth/hook/useLogin'

export default function LoginForm() {
  const {
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
  } = useLogin()

  const handlePreSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (allowSubmit && !isSubmitting) {
      submitForm()
    }
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <h1 className="mb-2">Đăng nhập</h1>
      <div className="mb-6">
        Bạn chưa có tài khoản?
        <Link href={"register"} className="text-myRed"> Đăng ký</Link>
      </div>

      <form onSubmit={handlePreSubmitForm}>
        {errorAuthen && <div className="text-myRed mb-4 text-[12px]">{errorAuthen}</div>}

        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Email <Required /></label>
          <input
            type="email"
            className="text-[17px] px-3 py-[10px] form_control"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="email@gmail.com"
          />
          {errorEmail && <div className="text-myRed mt-1 text-[12px]">{errorEmail}</div>}
        </div>

        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Mật khẩu <Required /></label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="pr-10 text-[17px] px-3 py-[10px] form_control"
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              placeholder="******"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[18px]"
              onClick={togglePassword}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </div>
          {errorPassword && <div className="text-myRed mt-1 text-[12px]">{errorPassword}</div>}
        </div>

        <ButtonLoading isSubmitting={isSubmitting} disabled={!allowSubmit}>
          Đăng nhập
        </ButtonLoading>
      </form>

      {process.env.NODE_ENV === 'development' && (
        <DebugPanel data={{ email, password, showPassword, allowSubmit }} />
      )}
    </div>
  )
}
