import { SettingIcon } from "@/assets/Icons/SettingIcon";
import { ActionMenu } from "@/components/ActionMenu/ActionMenu";
import { Checkbox } from "@/components/Input/CheckBox";
import { Table } from "@/components/Table/table";
import { TableCell } from "@/components/Table/table-cell";
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { DetailsSubtotal, reserveStore } from "@/store/reserveStore";
import { Types } from "mongoose";
import { useEffect, useState } from "react";

interface TableDetailsProps<T>{
  rows: T[]
  columns: (keyof T)[]
  title: string
  id: number;
}

export function TableDetails<T>({rows, title, columns,id}:TableDetailsProps<T>) {
  
  const {
    isChecked,
    setIschecked,
    isOpenedModalRefund,
    handleOpenModalRefund,
    setDetailsSubTotal,
    detailsSubTotal
  } = reserveStore()

  const [showLastColumn, setShowLastColumn] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | Types.ObjectId>("");

  function handleBrandAction() {
    setShowLastColumn(!showLastColumn)
    setIschecked("")
  }

  const subtotal = rows.reduce((acc, row) => {    
    const penultimateColumnValue = row[columns[columns.length - 1]]
    const cleanedValue = String(penultimateColumnValue).replace(/\./g, '').replace(',', '.')

    const numberValue = Number(cleanedValue)
    return acc + (isNaN(numberValue) ? 0 : numberValue)
  }, 0)

  const handleSetSelectedItem = (row: {_id: string | Types.ObjectId }, e: React.MouseEvent) => {
    e.stopPropagation();
    const id = row._id.toString();
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
  };

  const openModelRefund = (itemId: string | Types.ObjectId) => {
    setSelectedItemId(itemId || "");
    handleOpenModalRefund()
  };

  useEffect(() => {
    setDetailsSubTotal([{ subtotal, id }]);
  }, [subtotal, id]);

  return(
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-10">
        <h1 className="font-bold text-xl ">{title}</h1>
        <button onClick={() => handleBrandAction()}>
          <SettingIcon/>
        </button>
      </div>
      <Table>
        <tbody>
          {
            rows.map((row,index) => (
              <TableRow 
                className={index % 2 !== 0 ? " bg-gray-90 h-[57px] border-b text-center" : "h-[57px] border-b text-center"} 
                key={index}
                onClick={() => setOpenMenuId(null)}
              >
                {
                  columns.map((col,index) => (
                    <TableCell key={index} className={index === 2 ? "font-bold " : ""}>{String(row[col])}</TableCell>
                  ))
                }
                 {showLastColumn && (
                  <TableCell>
                    <ActionMenu
                      onRefund={openModelRefund}
                      openMenuId={openMenuId}
                      itemId={String((row as { _id: number })._id)}
                      onSelect={handleSetSelectedItem}
                      details={true}
                    />
                  </TableCell>
              )}
              </TableRow>
            ))
          }
        </tbody>
        <tfoot className="border-b">
          <TableRow className="">
            <TableCell colSpan={3} className="font-bold">
              <div className={showLastColumn ? "flex items-center justify-end gap-5 mr-10" : "flex items-center justify-end gap-5 mr-12"}>
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>    
  )
}