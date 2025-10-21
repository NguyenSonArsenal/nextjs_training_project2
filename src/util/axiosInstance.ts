import axios from 'axios';
import { getCookie, deleteCookie } from '@/util/helper';
import { ACCESS_TOKEN_KEY } from '@/config/system';

export const getAxiosInstance = () => {
  const token = getCookie(ACCESS_TOKEN_KEY);

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        deleteCookie([ACCESS_TOKEN_KEY]);
        window.location.href = process.env.NEXT_PUBLIC_MANAGEMENT_PREFIX + '/auth/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};