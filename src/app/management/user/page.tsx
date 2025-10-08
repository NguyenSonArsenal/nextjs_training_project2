"use client"

import {IconRight} from "@/component/Icon";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import axiosInstance from "@/util/axiosInstance";
import {delay, getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import LoadingScroll from "@/component/LoadingScroll";

interface User {
  id: number
  username: string
  email: string
  phone: string
  birthday: string
  address: string
}
export default function ListUser() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        delay(50000)
        const res = await axiosInstance.get('user');
        const data = await res.data
        if (!data.success) {
          toast.error('Không thể tải danh sách user')
          return
        }

        setUsers(data.data)
      } catch (err) {
        toast.error('Lỗi kết nối máy chủ')
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Danh sách user"} backHref={getManagementPath('')}/>
      <br/>
      <br/>
      <input type="text" className={"form_control h-[30px] bg-[#e5e5e5]"} placeholder="Username, email, phone ..."/>
      
      {
        users.length <= 0 ? (
          <LoadingScroll />
        ) : (
        <main className={"pt-4"}>
          {users.map(user => (
            <div key={user.id} className={'flex items-center justify-between p-2 rounded border border-[#e5e5e5] mb-4'}>
              <div>
                <div className={'text-[16px] text-[#333333] font-semibold'}>{user.email}</div>
                <div className={'flex text-[13px] text-[#999999]'}>
                  <div className={'mr-2'}>{user.phone}</div>
                  <div>{user.username}</div>
                </div>
              </div>
              <div>
                <Link href={'#'}><IconRight /></Link>
              </div>
            </div>
          ))}
        </main>
        )
      }
    </div>
  )
}
