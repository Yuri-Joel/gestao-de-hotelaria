/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends ComponentProps<'tr'> { }

export function TableRow(props: TableRowProps) {
    return (
        <tr {...props} className={twMerge("border-b border-gray/10 hover:bg-gray-90", props.className)} />
    )
}