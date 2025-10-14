"use client"

import Link from "next/link";
import Required from "@/component/Required";
import DebugPanel from "@/component/DebugPanel";
import {EyeIcon, EyeSlashIcon} from "@/component/Icon";
import {useState} from "react";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputErrorMessage from "@/component/InputErrorMessage";
import toast from 'react-hot-toast';
import {useRouter} from "next/navigation";
import {delay, getManagementPath} from "@/util/helper";
import {postRegister} from "@/controller/api";


// ✅ Schema kiểm tra dữ liệu
const validator = yup.object({
  username: yup.string().required('Username bắt buộc').max(64, 'Username tối đa 64 ký tự'),
  email: yup.string().email('Email không hợp lệ').required('Email bắt buộc'),
  phone: yup.string()
    .required('SĐT bắt buộc')
    .matches(/^\d{10,11}$/, 'Số điện thoại phải có 10–11 chữ số'),
  password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Mật khẩu bắt buộc'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Xác nhận mật khẩu bắt buộc'),
}).required()

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const router = useRouter()

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: yupResolver(validator),
    mode: "onBlur"
  })

  const onSubmit = async (data: any) => {
    try {
      await delay(1000)
      const response = await postRegister(data);
      if (!response.data.success) {
        const errors = response.data.errors || {}
        if (errors.username) {
          setError('username', { type: 'server', message: errors.username[0] })
        }
        if (errors.email) {
          setError('email', { type: 'server', message: errors.email[0] })
        }
        if (errors.phone) {
          setError('phone', { type: 'server', message: errors.phone[0] })
        }
        return
      }
      toast.success('Thêm mới thành công')
      return router.push(getManagementPath('/login'))
    } catch (error) {
      console.error('Lỗi kết nối:', error)
      toast.error('Không thể kết nối đến máy chủ')
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, '') // Xóa mọi ký tự không phải số
    e.target.value = onlyNumbers.slice(0, 11  )
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <h1 className="mb-2">Đăng ký</h1>
      <div className="mb-6">Bạn đã có tài khoản?<Link href={"login"} className="text-myRed"> Đăng nhập</Link></div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Username <Required/></label>
          <input type="email" className="text-[17px] px-3 py-[10px] form_control" placeholder="Username ..."
                 {...register("username")}
          />
          <InputErrorMessage message={errors.username?.message}/>
        </div>

        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Email <Required/></label>
          <input type="email" className="text-[17px] px-3 py-[10px] form_control" placeholder="email@gmail.com"
                 {...register("email")}
          />
          <InputErrorMessage message={errors.email?.message}/>
        </div>

        <div className="form_group mb-2">
          <label className="font-semibold mb-1">SĐT <Required/></label>
          <input type="text" className="text-[17px] px-3 py-[10px] form_control"
                 placeholder="0964000111" {...register("phone")}
                 pattern="\d*" inputMode="numeric"
                 onChange={handlePhoneChange}
          />
          <InputErrorMessage message={errors.phone?.message}/>
        </div>

        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Mật khẩu <Required/></label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} className="pr-10 text-[17px] px-3 py-[10px] form_control"
                   placeholder="******" {...register("password")}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[18px]"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
            </div>
          </div>
          <InputErrorMessage message={errors.password?.message}/>
        </div>

        <div className="form_group mb-2">
          <label className="font-semibold mb-1">Xác nhận mật khẩu <Required/></label>
          <div className="relative">
            <input type={showPasswordConfirmation ? 'text' : 'password'}
                   className="pr-10 text-[17px] px-3 py-[10px] form_control"
                   placeholder="******" {...register("password_confirmation")}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[18px]"
              onClick={() => setShowPasswordConfirmation(prev => !prev)}
            >
              {showPasswordConfirmation ? <EyeSlashIcon/> : <EyeIcon/>}
            </div>
          </div>
          <InputErrorMessage message={errors.password_confirmation?.message}/>
        </div>

        <button type="submit"
                disabled={!isValid || isSubmitting}
                className={`rounded block bg-myRed w-full text-white py-[10px] mb-3 mt-6 
                  ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                `}>
          Đăng ký
        </button>
      </form>


      {/* DebugPanel chỉ hiển thị ở dev */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel data={{isValid, isSubmitting}}/>
      )}
    </div>
  )
}