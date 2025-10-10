/**
 * Lấy giá trị của cookie theo tên
 * @param name Tên cookie cần lấy
 * @returns Giá trị cookie hoặc null nếu không tồn tại
 */
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null // tránh lỗi khi chạy server-side

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export const setCookie = (name: string, value: string, maxAgeSeconds = 3600) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`
}

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0`
}

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getManagementPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_MANAGEMENT_PREFIX || ''}${path}`
