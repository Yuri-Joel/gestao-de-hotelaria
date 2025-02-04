import { ComponentProps, FC } from 'react'
import { Ticon } from '../icon/iconType'

export type TinpuType = 'text' | 'email' | 'search' | 'password' | "date"

export interface IInput extends ComponentProps<'input'> {
  value: string
  handleValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  isSelected?: boolean
  isDate?: boolean
  isCellPhone?: boolean
  isDocument?: boolean
  isCardCredit?: boolean
  isNumber?: boolean
  isCEP?: boolean
  isTime?: boolean
  arrayType?: unknown
  array?: unknown
  callback?: (arg: unknown) => unknown
  handleSelected?: () => void
  handleBlur?: () => void
  togglePasswordVisibility?: () => void
  type?: TinpuType
  IconLeft?: FC<Ticon>
  IconRight?: FC<Ticon>
  iconLeftTopPosition?: string;
  inputCheckedFocusDisable?: boolean;
  arrayLoading?: boolean;
}
