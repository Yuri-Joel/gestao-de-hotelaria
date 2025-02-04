/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps) {
  return (
    <div className=" w-full mt-4">
      <table {...props} className={twMerge('w-full', props.className)} />
    </div>
  )
}
