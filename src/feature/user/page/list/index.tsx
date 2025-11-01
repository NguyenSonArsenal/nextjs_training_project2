"use client"

import Link from "next/link";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import LoadingScroll from "@/component/LoadingScroll";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteUser, getUserList} from "@/util/api/user";
import {DeleteOutline, RightOutline} from "antd-mobile-icons";
import ConfirmDelete from "@/component/Modal/ConfirmDelete";
import {useState} from "react";
import DebugPanel from "@/component/DebugPanel";
import toast from 'react-hot-toast'

interface User {
  id: number
  username: string
  email: string
  phone: string
  birthday: string
  address: string
}

export default function UserList() {
  const queryClient = useQueryClient()

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[]>({
    queryKey: ['get_user_list'],
    queryFn: getUserList,
  })

  const openDeleteModal = (userId: number) => {
    setShowModalConfirmDelete(true)
    setSelectedUserId(userId)
  }

  const { mutate: confirmDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onMutate: () => {
      console.log('click when deleting')
      if (isDeleting) return // Nếu đang xóa mà click tiếp btn xóa thì sẽ vào đây
    },
    onSuccess: () => {
      toast.success('Đã xóa user thành công')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setShowModalConfirmDelete(false)
      resetDeleteState()
    },
    onError: () => {
      toast.error('Xóa thất bại')
      resetDeleteState()
    },
  })

  const resetDeleteState = () => {
    setShowModalConfirmDelete(false)
    setSelectedUserId(null)
  }

  const handleConfirmDelete = () => {
    if (!selectedUserId) return
    confirmDelete(selectedUserId)
  }

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Danh sách user"} backHref={getManagementPath('dashboard')}/>
      <br/>

      <div className="flex justify-end mb-4">
        <Link
          href="user/create"
          className="px-4 py-2 bg-myRed text-white rounded hover:bg-myRed_hover transition font-medium"
        >
          Thêm mới
        </Link>
      </div>

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
                    onClick={() => openDeleteModal(user.id)}
                  />
                  <Link href={{ pathname: 'user/edit', query: { id: user.id } }}>
                    <RightOutline className={"text-black"}/>
                  </Link>
                </div>
              </div>
            ))}

            <ConfirmDelete
              visible={showModalConfirmDelete}
              onConfirm={handleConfirmDelete}
              onClose={() => setShowModalConfirmDelete(false)}
              isDeleting={isDeleting}
            />
          </main>
        )
      }


      {/* DebugPanel chỉ hiển thị ở dev */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel data={{ selectedUserId, showModalConfirmDelete }} />
      )}
    </div>
  )
}
