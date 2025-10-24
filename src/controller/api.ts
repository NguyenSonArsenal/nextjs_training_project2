import { getAxiosInstance } from '@/util/axiosInstance';

export const me = () => {
  console.log('call api get me')
  return getAxiosInstance().get('creator/profile');
};
