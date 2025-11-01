"use client"

import {Email, Phone, Username} from "@/component/Icon";
import {getManagementPath} from "@/util/helper";
import Header from "@/component/Header";
import {useQuery} from "@tanstack/react-query";
import {getUserDetail} from "@/util/api/user";
import {useSearchParams} from "next/navigation";
import {Radio, Skeleton, Space} from "antd-mobile";
import Required from "@/component/Form/Required";
import {GENDER} from "@/config/system";

interface User {
  id: number
  username: string
  email: string
  phone: string
  birthday: string
  address: string
  gender: string // '1' hoặc '2'
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

  console.log(user, '// user')

  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[15px] md:px-[15px] pb-[6px]">
      <Header title={"Thông tin cá nhân"} backHref={getManagementPath('user')}/>
      <br/>
      <div>
        <div className="form-group border-b mb-3 pb-[2px]">
          <div className={"flex items-center mb-[6px]"}>
            <Username/>
            <span className={"ml-2"}>Tên đăng nhập</span>
          </div>
          <div className={"text-[#bfbfbf] h-[18px]"}>
            {user?.username ? user.username : <Skeleton animated style={{width: "50%", height: 15}}/>}
          </div>
        </div>
        <div className="form-group border-b mb-3 pb-[2px]">
          <div className={"flex items-center mb-[6px]"}>
            <Email/>
            <span className={"ml-2"}>Email</span>
          </div>
          <div className={"text-[#bfbfbf] h-[18px]"}>
            {user?.email ? user.email : <Skeleton animated style={{width: "50%", height: 15}}/>}
          </div>
        </div>
        <div className="form-group border-b mb-3 pb-[2px]">
          <div className={"flex items-center mb-[6px]"}>
            <Phone/>
            <span className={"ml-2"}>SĐT</span>
          </div>
          <div className={"text-[#bfbfbf] h-[18px]"}>
            {user?.phone ? user.phone : <Skeleton animated style={{width: "50%", height: 15}}/>}
          </div>
        </div>
        <div className="form_group mb-2">
          <div className="flex items-center">
            <label className="font-semibold mr-4">Giới tính <Required/></label>
            <Radio.Group
              // value={watch('gender') ?? user?.gender} // ✅ Ưu tiên giá trị form, fallback từ DB
              // onChange={(val) => setValue('gender', val, { shouldValidate: true })}
            >
              <Space direction='horizontal'>
                {Object.entries(GENDER).map(([value, label]) => (
                  <Radio key={value} value={value}>
                    {label}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>


        <button type="button" className="w-full bottom-0 text-white text-base font-bold h-[42px] cursor-pointer rounded-lg bg-myRed">
          Lưu
        </button>
      </div>
    </div>
  )
}
