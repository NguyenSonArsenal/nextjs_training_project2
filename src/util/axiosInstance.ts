// lib/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // optional: timeout sau 10s
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
