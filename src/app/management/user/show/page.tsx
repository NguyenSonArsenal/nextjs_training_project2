"use client"

import {Email, Phone, Username} from "@/component/Icon";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import {useQuery} from "@tanstack/react-query";
import {showUser} from "@/util/api/user";
import {useSearchParams} from "next/navigation";

interface User {
  id: number
  username: string
  email: string
  phone: string
  birthday: string
  address: string
}

export default function UserDetail() {
  const id = useSearchParams().get('id')

  const {
    data: user,
  } = useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => showUser(Number(id)),
    enabled: !!id, // chỉ gọi khi có id
  })

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Thông tin cá nhân"} backHref={getManagementPath('user')}/>
      <br/>
      <div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Username />
            <span className={"ml-2"}>Tên đăng nhập</span>
          </div>
          <div className={"text-[#bfbfbf]"}>{user?.username}</div>
        </div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Email />
            <span className={"ml-2"}>Email</span>
          </div>
          <div className={"text-[#bfbfbf]"}>{user?.email}</div>
        </div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Phone />
            <span className={"ml-2"}>SĐT</span>
          </div>
          <div className={"text-[#bfbfbf]"}>{user?.phone}</div>
        </div>
      </div>
    </div>
  )
}
