// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_KEY } from '@/config/system';

const MANAGEMENT_PREFIX = process.env.NEXT_PUBLIC_MANAGEMENT_PREFIX ?? '/management';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

  const isAuthPage = pathname.startsWith(`${MANAGEMENT_PREFIX}/auth`)
  const isLoginPage = pathname === `${MANAGEMENT_PREFIX}/auth/login`

  // ✅ Nếu là trang login và đã có token → redirect về /management
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL(MANAGEMENT_PREFIX, request.url))
  }

  // ✅ Nếu là trang auth (login/register) → cho qua
  if (isAuthPage) {
    return NextResponse.next()
  }

  // ✅ Nếu chưa có token → redirect về login
  if (!token) {
    const loginUrl = new URL(`${MANAGEMENT_PREFIX}/auth/login`, request.url)

    // Nếu đang ở login rồi thì cho qua
    if (pathname === loginUrl.pathname) {
      return NextResponse.next()
    }

    return NextResponse.redirect(loginUrl)
  }

  // ✅ Nếu có token và không phải login → cho qua
  return NextResponse.next()
}

export const config = {
  matcher: ['/management/:path*'], // chỉ bảo vệ vùng management
};
