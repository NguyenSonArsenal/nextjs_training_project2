import Link from "next/link";
import Required from "@/component/Required";

export default function Home() {
    return (
        <div className="min-h-screen max_w_414px m-auto bg-white w-full h-full pt-[30px] md:px-[15px]">
            <h1 className="mb-2">Đăng nhập</h1>
            <div className="mb-6">Bạn chưa có tài khoản?<Link href={"#"} className="text-myRed"> Đăng ký</Link></div>

            <form action="">
                <div className="form_group mb-2">
                    <label className="font-semibold mb-1">Email <Required /></label>
                    <input type="email" className="text-[17px] px-3 py-[10px] form_control"/>
                    <div className={'text-myRed mt-1 text-[12px]'}>error email</div>
                </div>
                <div className="form_group mb-2">
                    <label className="font-semibold mb-1">Password <Required /></label>
                    <input type="password" className="text-[17px] px-3 py-[10px] form_control"/>
                    <div className={'text-myRed mt-1 text-[12px]'}>error password</div>
                </div>
                <button className="rounded block bg-myRed w-full text-white py-[10px] mb-3 mt-6 ">Đăng nhập</button>
                <Link href={"#"} className="text-myRed text-right block">Quên mật khẩu</Link>
            </form>
        </div>
    )
}