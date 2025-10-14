"use client"

import  {CreateAt, Email, Password} from "@/component/Icon";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { getAxiosInstance } from '@/util/axiosInstance';
import UpdatePassword from "@/component/Modal/UpdatePassword";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import LoadingScroll from "@/component/LoadingScroll";

type ProfileProps = {
  email: string
  created_at: string
  updated_at: string
}
export default function Profile() {
  const [user, setUser] = useState<ProfileProps | null>()
  const [showModalUpdatePassword, setShowModalUpdatePassword] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getAxiosInstance().get('creator/profile');
        const data = res.data
        if (!data.success) {
          toast.error('Không thể tải thông tin cá nhân')
          return
        }

        setUser(data.data)
      } catch (err) {
        toast.error('Lỗi kết nối máy chủ')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Trang cá nhân"} backHref={getManagementPath('')}/>
      {
        !user ? (
          <LoadingScroll />
        ) : (
        <main className={"pt-4"}>
          <div className="mb-5 leading-6 text-base">Thông tin tài khoản</div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex justify-center items-center">
              <span className="mr-2"><Email/></span>
              <div className="">Email: {user.email}</div>
            </div>
          </div>

          <div className="flex items-center mb-3">
            <span className="mr-2"><CreateAt/></span>
            <div className="">Thời gian tạo: {user.created_at}</div>
          </div>

          <div className="flex items-center mb-3">
            <span className="mr-2"><CreateAt/></span>
            <div className="">Thời gian cập nhật: {user.updated_at}</div>
          </div>

          <hr/>
          <br/>
          <div className="mb-1 text-base">Mật khẩu</div>
          <div className="flex items-center">
            <span className="mr-2"><Password /></span> <Link href={"#"} onClick={() => setShowModalUpdatePassword(true)}>Thay đổi mật khẩu</Link>
          </div>
          <small>Bạn nên chọn đặt mật khẩu mạnh mà chưa sử dụng ở đâu khác</small>

          <UpdatePassword visible={showModalUpdatePassword} onClose={() => setShowModalUpdatePassword(false)} />

        </main>
        )
      }
    </div>
  )
}
