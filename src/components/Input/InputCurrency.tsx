/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatCurrency } from '@/helpers/formatCurrency'
import { IInput } from '@/types/Input/InputType'
// import React, { ChangeEvent, useEffect } from 'react'
import React, { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'

interface TInputCurrency extends IInput {
    handleCurrency: (T: string) => void;
}

export const InputCurrency: React.FC<TInputCurrency> = ({
    
    label,
    type,
    IconLeft,
    isSelected,
    isDate = false,
    isCellPhone = false,
    isDocument = false,
    arrayType,
    array,
    callback,
    handleSelected,
    handleBlur,
    handleCurrency,
    togglePasswordVisibility,
    value,
    IconRight,
    iconLeftTopPosition,
    ...props
}) => {

    function handleOnChange(ev: ChangeEvent<HTMLInputElement>) {
        const value = ev.target.value.replace(/[^\d]/g, '');
        if (value) {
            const numericValue = Number(value) / 100;

            handleCurrency(formatCurrency(numericValue));
        } else {
            handleCurrency(formatCurrency(0));
        }
    }

    return (
        <>
            <div className="relative bg-white w-full flex">
                <input
                    {...props}
                    onSelect={handleSelected}
                    onChange={handleOnChange}
                    onBlur={handleBlur}
                    type="text"
                    className={twMerge(
                        `bg-gray-50 px-2 appearance-none outline-none h-14 w-full text-black rounded-lg border focus:border-primary ${!props.disabled && value ? 'border-primary' : ''} `,
                        IconLeft && "pl-[38px]",
                        props.className,
                        props.disabled && ' bg-gray-100 pointer-events-none',
                    )}
                    value={value || ''}
                />
            </div>
        </>
    )
}
