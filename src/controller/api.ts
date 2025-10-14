import { getAxiosInstance } from '@/util/axiosInstance';

export const postRegister = async (data: any) => {
  return getAxiosInstance().post('creator/register', data);
};

export const postLogin = async (data: {
  email: string,
  password: string,
}) => {
  return getAxiosInstance().post('creator/login', data);
};
