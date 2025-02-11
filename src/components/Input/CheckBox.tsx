import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  index: number;
  isChecked: boolean;
}

export const Checkbox: React.FC<InputProps> = ({ index, type, isChecked ,...props }) => {
  return (
      <div className={`  rounded-full flex items-center justify-center`}>
          <input
              {...props}
              type={"radio"}
              id={`radio-${index}`}
              checked={isChecked}
              onChange={() => isChecked} // Aqui aplicamos corretamente
              className='size-[20px] cursor-pointer'
          />
      </div>
  )
}