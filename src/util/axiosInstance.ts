// lib/axiosInstance.ts
import axios, {AxiosResponse} from 'axios';
import {deleteCookie, getCookie} from "@/util/helper";
import {ACCESS_TOKEN_KEY} from "@/config/system";

const token = getCookie(ACCESS_TOKEN_KEY)

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // optional: timeout sau 10s
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
})

// Gắn interceptor để xử lý lỗi 401 → redirect về login
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {

    console.log(error, '// error');


    if (error.response?.status === 401) {
      console.log(error.response, 'axiosInstance')
      deleteCookie(ACCESS_TOKEN_KEY)
      window.location.href = process.env.NEXT_PUBLIC_MANAGEMENT_PREFIX + '/login'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance;
