import { getAxiosInstance } from '@/util/axiosInstance';
import {delay} from "@/util/helper";

export const getUserList = async () => {
  const res = await getAxiosInstance().get('user')
  const data = res.data

  if (!data.success) {
    throw new Error('Không thể tải danh sách user')
  }

  return data.data
}

export const getUserDetail = async (id: number) => {
  const res = await getAxiosInstance().get(`user/${id}`)
  const data = res.data
  if (!data.success) {
    throw new Error('Không thể tải thông tin user')
  }

  return data.data
}

export const deleteUser = async (id: number) => {
  const res = await getAxiosInstance().delete(`user/${id}`)
  return res.data.success
}