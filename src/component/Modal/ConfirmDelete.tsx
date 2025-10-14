import { Modal } from 'antd-mobile'
import Header from "@/component/Header";
import Required from "@/component/Required";
import FieldPassword from "@/component/Form/FieldPassword";

interface ChangePasswordModalProps {
  visible: boolean
  onClose: () => void
  onSubmit?: (data: FormValues) => void
}

interface FormValues {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

export default function ConfirmDelete({ visible, onClose }: ChangePasswordModalProps) {
  return (
    <Modal
      visible={visible}
      closeOnAction
      onClose={onClose}
      showCloseButton
      content={
        <div className="p-4">
          {/* Tiêu đề */}
          <div className="flex items-center justify-center mb-4">
            <span className="text-[18px] font-semibold text-[#333]">Xóa bình luận</span>
          </div>

          {/* Nội dung */}
          <div className="text-center text-[15px] text-[#555] mb-6">
            Bạn có chắc chắn muốn xóa bình luận này không?
          </div>

          {/* Nút xác nhận */}
          <button
            className="w-full bg-[#EE3244] text-white py-2 rounded text-[16px] font-medium hover:bg-[#d6283b] transition"
          >
            Xác nhận xóa
          </button>

          {/* Nút hủy */}
          <div
            onClick={onClose}
            className="text-[16px] text-[#EE3244] text-center mt-4 cursor-pointer hover:underline"
          >
            Hủy bỏ
          </div>
        </div>
      }
    />

  )
}
