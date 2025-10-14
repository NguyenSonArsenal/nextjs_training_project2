import { getAxiosInstance } from '@/util/axiosInstance';

export const listUser = async () => {
  const res = await getAxiosInstance().get('user')
  const data = res.data

  if (!data.success) {
    throw new Error('Không thể tải danh sách user')
  }

  return data.data
}

export const showUser = async (id: number) => {
  const res = await getAxiosInstance().get(`user/${id}`)
  const data = res.data
  if (!data.success) {
    throw new Error('Không thể tải thông tin user')
  }

  return data.data
}