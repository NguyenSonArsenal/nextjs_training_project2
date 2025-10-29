import Link from 'next/link';
import {getManagementPath} from "@/util/helper";

export default function Intro() {
  return (
    <div className="min-h-screen max-w-[414px] m-auto bg-white w-full h-full pt-[30px] md:px-[15px] flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-[#333] mb-4">👋 Welcome to Next.js</h1>
      <p className="text-sm text-[#666] mb-6">Khám phá sức mạnh của React + Next.js cùng bạn nhé!</p>
      <Link
        href={getManagementPath('auth/login')}
        className="px-4 py-2 bg-myRed text-white rounded hover:bg-myRed_hover transition"
      >
        Đăng nhập ngay
      </Link>
    </div>
  );
}
