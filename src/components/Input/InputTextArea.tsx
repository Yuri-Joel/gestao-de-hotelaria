'use client'
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'textarea'> {
  value: string
  handleValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  borderInputColorClass?: string
}

const InputTextArea: React.FC<InputProps> = ({
  value,
  handleValue,
  borderInputColorClass = 'border-primary',
  ...props
}) => {
  return (
    <div className="relative bg-white w-full flex">
      <textarea
        {...props}
        onChange={handleValue}
        className={twMerge(
          `bg-gray-50 resize-none px-2 appearance-none outline-none w-full h-[145px] pt-3 text-base text-black border rounded-lg transition-all duration-300 focus:border-primary focus:bg-transparent ${!props.disabled && value ? borderInputColorClass : 'border-gray-300'}`,
          props.className,
          props.disabled && ' bg-gray-100 pointer-events-none',
        )}
        value={value || ''}
      />
    </div>
  )
}

export default InputTextArea
