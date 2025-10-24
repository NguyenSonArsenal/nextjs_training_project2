// Là nơi chứa các hàm gọi API, xử lý dữ liệu từ server, thường dùng axios, fetch, hoặc React Query.

import {getAxiosInstance} from "@/util/axiosInstance";

export const postLogin = (data: { email: string, password: string}) => {
  return getAxiosInstance().post('creator/login', data);
};

export const postRegister = (data: any) => {
  return getAxiosInstance().post('creator/register', data);
};