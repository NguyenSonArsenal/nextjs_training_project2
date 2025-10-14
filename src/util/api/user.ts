import { getAxiosInstance } from '@/util/axiosInstance';

export const fetchUsers = async () => {
  const res = await getAxiosInstance().get('user')
  const data = res.data

  if (!data.success) {
    throw new Error('Không thể tải danh sách user')
  }

  return data.data
}