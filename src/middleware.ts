// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_KEY } from '@/config/system';

const MG_PREFIX = process.env.NEXT_PUBLIC_MANAGEMENT_PREFIX ?? '/management';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(`${MG_PREFIX}/auth`)) {
    return NextResponse.next();
  }

  if (!pathname.startsWith(MG_PREFIX)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

  console.log(token, "// token")

  if (!token) {
    const loginUrl = new URL(`${MG_PREFIX}/auth/login`, request.url);

    if (pathname === loginUrl.pathname) {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/management/:path*'], // chỉ bảo vệ vùng management
};
