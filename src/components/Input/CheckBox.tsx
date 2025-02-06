import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  index: number;
  setIsChecked: (T: boolean) => void;
  isChecked: boolean;
}

export const Checkbox: React.FC<InputProps> = ({ index, setIsChecked, isChecked ,...props }) => {
  return (
      <div className={`  rounded-full flex items-center justify-center`}>
          <input
              {...props}
              type="radio"
              id={`radio-${index}`}
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)} // Aqui aplicamos corretamente
              className='size-[20px] cursor-pointer'
          />
      </div>
  )
}