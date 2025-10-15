import { getAxiosInstance } from '@/util/axiosInstance';

export const postRegister = async (data: any) => {
  const res = await getAxiosInstance().post('creator/register', data);
  return res
};

export const postLogin = async (data: {
  email: string,
  password: string,
}) => {
  return await getAxiosInstance().post('creator/login', data);
};
