import { Modal } from 'antd-mobile'
import {IconBack, IconWarning} from "@/component/Icon";

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
      showCloseButton={false}
      visible={visible}
      onClose={onClose}
      content={
        <div className={'pb-2'}>
          <IconWarning className={"text-center m-auto block mb-1"} width={48} height={48}/>
          <div className="flex items-center justify-center mb-4">
            <span className="text-[18px] font-semibold text-[#333]">Xóa bình luận</span>
          </div>

          <div className="text-center text-[15px] text-[#555] mb-6">
            Bạn có chắc chắn muốn xóa không?
          </div>

          <button
            onClick={() => {
              if (!isDeleting) // chặn double click
                onConfirm()
            }}
            className={`w-full py-2 rounded text-[16px] font-medium transition py-3 ${
              isDeleting ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#EE3244] text-white hover:bg-[#d6283b]'
            }`}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Đang xóa...
              </div>
            ) : (
              'Xác nhận xóa'
            )}
          </button>

          <div
            onClick={onClose}
            className="text-[16px] text-[#EE3244] text-center mt-4 cursor-pointer"
          >
            Hủy bỏ
          </div>
        </div>
      }
    />
  )
}
