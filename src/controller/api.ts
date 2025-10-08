import axiosInstance from '@/util/axiosInstance';

export const postRegister = async (data: any) => {
  return axiosInstance.post('creator/register', data);
};
