import {EyeIcon, EyeSlashIcon} from "@/component/Icon";
import {useState} from "react";
import InputErrorMessage from "@/component/InputErrorMessage";

interface PasswordInputProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
  className?: string
}

export default function FieldPassword({
                                        value,
                                        onChange,
                                        error,
                                        placeholder = '******',
                                        className = ''
                                      }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return <div className={`relative ${className}`}>
    <input type={showPassword ? 'text' : 'password'}
           className="pr-10 text-[17px] px-3 py-[10px] form_control"
           value={value}
           onChange={onChange}
           placeholder={placeholder}
    />
    <div
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[18px]"
      onClick={() => setShowPassword(p => !p)}
    >
      {showPassword ? <EyeSlashIcon/> : <EyeIcon/>}
    </div>
    <InputErrorMessage message={error}/>
  </div>
}
