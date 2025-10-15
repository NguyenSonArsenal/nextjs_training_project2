import { Modal } from 'antd-mobile'

interface ConfirmDeleteProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

export default function ConfirmDelete({ visible, onClose, onConfirm, isDeleting  }: ConfirmDeleteProps) {
  return (
    <Modal
      closeOnAction
      showCloseButton
      visible={visible}
      onClose={onClose}
      content={
        <div className="p-4">
          <div className="flex items-center justify-center mb-4">
            <span className="text-[18px] font-semibold text-[#333]">Xóa bình luận</span>
          </div>

          <div className="text-center text-[15px] text-[#555] mb-6">
            Bạn có chắc chắn muốn xóa không?
          </div>

          <button
            onClick={onConfirm}
            className={`w-full py-2 rounded text-[16px] font-medium transition ${
              isDeleting ? 'bg-gray-400 text-white' : 'bg-[#EE3244] text-white hover:bg-[#d6283b]'
            }`}
          >
            {isDeleting ? 'Đang xóa...' : 'Xác nhận xóa'}
          </button>

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
