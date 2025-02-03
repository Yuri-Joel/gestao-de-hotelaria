/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps) {
  return (
    <div className="border w-full border-gray/10 overflow-y-scroll max-h-[60vh] rounded-lg flex-1">
      <table {...props} className={twMerge('w-full', props.className)} />
    </div>
  )
}
