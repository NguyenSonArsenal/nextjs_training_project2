"use client"

import {Email, IconRight, Phone, Username} from "@/component/Icon";
import Link from "next/link";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import LoadingScroll from "@/component/LoadingScroll";
import {useQuery} from "@tanstack/react-query";
import {fetchUsers} from "@/util/api/user";

interface User {
  id: number
  username: string
  email: string
  phone: string
  birthday: string
  address: string
}

export default function UserDetail() {
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
          <div className={"text-[#bfbfbf]"}>Nguyen van A</div>
        </div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Email />
            <span className={"ml-2"}>Email</span>
          </div>
          <div className={"text-[#bfbfbf]"}>email@gmail.com</div>
        </div>
        <div className="form-group border-b mb-3 pb-2">
          <div className={"flex items-center mb-[2px]"}>
            <Phone />
            <span className={"ml-2"}>SĐT</span>
          </div>
          <div className={"text-[#bfbfbf]"}>0964047000</div>
        </div>
      </div>
    </div>
  )
}
