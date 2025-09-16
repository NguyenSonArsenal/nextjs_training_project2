import Link from "next/link";

export const metadata = {
  title: 'Trang chủ',
  description: 'Lorem',
}

export default function Home() {
  return (
    <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
      <Link href="login" className="text-myRed">Login</Link>
    </div>
  )
}