import axiosInstance from '@/util/axiosInstance';

export const postRegister = async (data: any) => {
  return axiosInstance.post('creator/register', data);
};

export const postLogin = async (data: {
  email: string,
  password: string,
}) => {
  return axiosInstance.post('creator/login', data);
};
