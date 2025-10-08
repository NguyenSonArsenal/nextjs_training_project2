import { SpinLoading } from "antd-mobile";

export default function LoadingScroll() {
  return (
    <div className="flex justify-center items-center mb-10">
      <SpinLoading color="primary" style={{'--size': '24px'}} />
    </div>
  )
}