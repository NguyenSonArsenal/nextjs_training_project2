"use client"

import {IconRight} from "@/component/Icon";
import Link from "next/link";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import LoadingScroll from "@/component/LoadingScroll";
import {useQuery} from "@tanstack/react-query";
import {listUser} from "@/util/api/user";
import {DeleteOutline, RightOutline} from "antd-mobile-icons";
import UpdatePassword from "@/component/Modal/UpdatePassword";
import ConfirmDelete from "@/component/Modal/ConfirmDelete";
import {useState} from "react";

interface User {
  id: number
  username: string
  email: string
  phone: string
  birthday: string
  address: string
}

export default function ListUser() {

  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: listUser,
  })

  const handleDelete = (userId: number) => {
    console.log('user id', userId);
    setShowModalConfirmDelete(true)
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Danh sách user"} backHref={getManagementPath('')}/>
      <br/>
      <br/>
      <input type="text" className={"form_control h-[30px] bg-[#e5e5e5]"} placeholder="Username, email, phone ..."/>

      {
        isError && (
          <div className="text-red-500 mt-4">Lỗi: {(error as Error).message}</div>
        )
      }

      {
        isLoading ? (
          <LoadingScroll />
        ) : (
        <main className={"pt-4"}>
          {users?.map(user => (
            <div key={user.id} className={'flex items-center justify-between p-2 rounded border border-[#e5e5e5] mb-4'}>
              <div>
                <div className={'text-[16px] text-[#333333] font-semibold'}>{user.email}</div>
                <div className={'flex text-[13px] text-[#999999]'}>
                  <div className={'mr-2'}>{user.phone}</div>
                  <div>{user.username}</div>
                </div>
              </div>
              <div className={"flex items-center"}>
                <DeleteOutline
                  className={"mr-2 cursor-pointer text-red-500 hover:text-red-700"}
                  onClick={() => handleDelete(user.id)}
                />
                <Link href={{ pathname: 'user/show', query: { id: user.id } }}>
                  <RightOutline className={"text-black"}/>
                </Link>
              </div>
            </div>
          ))}


          <ConfirmDelete visible={showModalConfirmDelete} onClose={() => setShowModalConfirmDelete(false)} />
        </main>
        )
      }
    </div>
  )
}
