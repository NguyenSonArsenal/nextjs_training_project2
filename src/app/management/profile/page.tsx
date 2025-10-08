"use client"

import {CreateAt, Email, EyeIcon, EyeSlashIcon, IconBack, Password, Username} from "@/component/Icon";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {Modal} from "antd-mobile";
import style from './index.module.scss';
import axiosInstance from "@/util/axiosInstance";
import Required from "@/component/Required/Index";
import InputErrorMessage from "@/component/InputErrorMessage";
import FieldPassword from "@/component/Form/Password";

type ProfileProps = {
  email: string
  created_at: string
  updated_at: string
}
export default function Profile() {
  const [user, setUser] = useState<ProfileProps | null>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('creator/profile');
        const data = await res.data

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

  if (!user) return;

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <h1 className="text-2xl pb-3 font-medium">Trang cá nhân</h1>
      <hr/>
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
          <span className="mr-2"><Password /></span> <Link href={"#"}>Thay đổi mật khẩu</Link>
        </div>
        <small>Bạn nên chọn đặt mật khẩu mạnh mà chưa sử dụng ở đâu khác</small>

        <Modal
          visible={true}
          className={"modalMobile"}
          closeOnAction
          content={
            <>
              <div className="flex items-center p-4 border-b border-neutral-4 relative">
                <span className="cursor-pointer absolute left-4"><IconBack /></span>
                <h1 className="text-2xl text-center m-auto pb-3 font-medium">Thay đổi mật khẩu</h1>
              </div>
              <div className={"p-4"}>
                <div className="leading-[22px] font-normal mb-4 text-center">Bạn nên chọn đặt mật khẩu mạnh mà
                  chưa sử dụng ở đâu khác
                </div>
                <div className="form_group mb-2">
                  <label className="mb-2">Mật khẩu hiện tại <Required /></label>
                  <FieldPassword />
                </div>
                <div className="form_group mb-2">
                  <label className="mb-2">Mật khẩu mới <Required /></label>
                  <FieldPassword />
                </div>
                <div className="form_group mb-2">
                  <label className="mb-2">Xác nhận mật khẩu mới <Required /></label>
                  <FieldPassword />
                </div>

                <button type={"button"}
                        className={`rounded block bg-myRed w-full text-white py-[10px] mb-3 mt-6 opacity-50 cursor-not-allowed`}
                        disabled={true}
                >
                  Submit
                </button>
              </div>
            </>
          }
        />

      </main>
    </div>
  )
}
