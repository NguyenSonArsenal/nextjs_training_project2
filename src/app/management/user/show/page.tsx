"use client"

import {Email, Phone, Username} from "@/component/Icon";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import {useQuery} from "@tanstack/react-query";
import {getUserDetail} from "@/util/api/user";
import {useSearchParams} from "next/navigation";
import {Skeleton} from "antd-mobile";

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
    queryKey: ['get_user_detail', id],
    queryFn: () => getUserDetail(Number(id)),
    enabled: !!id, // chỉ gọi khi có id
  })

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Thông tin cá nhân"} backHref={getManagementPath('user')}/>
      <br/>
      <div>
        <div className="form-group border-b mb-3 pb-[2px]">
          <div className={"flex items-center mb-[2px]"}>
            <Username />
            <span className={"ml-2"}>Tên đăng nhập</span>
          </div>
          <div className={"text-[#bfbfbf] h-[15px]"}>
            {user?.username ? user.username : <Skeleton animated style={{ width: "50%", height: 15 }} />}
          </div>
        </div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Email />
            <span className={"ml-2"}>Email</span>
          </div>
          <div className={"text-[#bfbfbf] h-[15px]"}>
            {user?.email ? user.email : <Skeleton animated style={{ width: "50%", height: 15 }} />}
          </div>
        </div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Phone />
            <span className={"ml-2"}>SĐT</span>
          </div>
          <div className={"text-[#bfbfbf]"}>
            {user?.phone ? user.phone : <Skeleton animated style={{ width: "50%", height: 15 }} />}
          </div>
        </div>
      </div>
    </div>
  )
}
