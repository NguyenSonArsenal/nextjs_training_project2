import { Modal } from 'antd-mobile'
import FieldPassword from "@/component/Form/FieldPassword";
import Required from "@/component/Required/Index";
import { useForm } from 'react-hook-form'
import {delay} from "@/util/helper";
import toast from "react-hot-toast";
import Header from "@/component/Header";

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

export default function UpdatePassword({ visible, onClose }: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
  })

  const submitHandler = async (data: FormValues) => {
    try {
      console.log(data, '// data')
      await delay(1000)
      reset({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      })

      toast.success('Try - update password')
    } catch (error) {
      toast.error('Catch - update password')
    }
  }

  return (
    <Modal
      visible={visible}
      className="modalMobile"
      closeOnAction
      onClose={onClose}
      content={
        <form onSubmit={handleSubmit(submitHandler)}>
          <Header backHref={""} title={"Thay đổi mật khẩu"} onClose={onClose}/>

          <div className="p-4">
            <div className="leading-[22px] font-normal mb-4 text-center">
              Bạn nên chọn đặt mật khẩu mạnh mà chưa sử dụng ở đâu khác
            </div>

            <div className="form_group mb-2">
              <label className="mb-2">Mật khẩu hiện tại <Required /></label>
              <FieldPassword
                error={errors.current_password?.message}
                {...register('current_password', {
                  required: 'Vui lòng nhập mật khẩu hiện tại',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải từ 6 ký tự',
                  },
                })}
              />
            </div>

            <div className="form_group mb-2">
              <label className="mb-2">Mật khẩu mới <Required /></label>
              <FieldPassword
                error={errors.new_password?.message}
                {...register('new_password', {
                  required: 'Vui lòng nhập mật khẩu hiện tại',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải từ 6 ký tự',
                  },
                })}
              />
            </div>

            <div className="form_group mb-2">
              <label className="mb-2">Xác nhận mật khẩu mới <Required /></label>
              <FieldPassword
                error={errors.new_password_confirmation?.message}
                {...register('new_password_confirmation', {
                  required: 'Vui lòng xác nhận mật khẩu',
                  validate: (val) =>
                    val === watch('new_password') || 'Mật khẩu xác nhận không khớp',
                })}
              />
            </div>

            <button type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`rounded block bg-myRed w-full text-white py-[10px] mb-3 mt-6 
                  ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
                `}>
              Submit
            </button>
          </div>
        </form>
      }
    />
  )
}
