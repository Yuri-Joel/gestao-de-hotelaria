/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'> { }

export function TableRow(props: TableRowProps) {
    return (
        <tr {...props} />
    )
}