import { getAxiosInstance } from '@/util/axiosInstance';

export const postRegister = (data: any) => {
  const res = getAxiosInstance().post('creator/register', data);
  return res
};

export const postLogin = (data: {
  email: string,
  password: string,
}) => {
  return getAxiosInstance().post('creator/login', data);
};

export const me = () => {
  console.log('call api get me')
  return getAxiosInstance().get('creator/profile');
};
