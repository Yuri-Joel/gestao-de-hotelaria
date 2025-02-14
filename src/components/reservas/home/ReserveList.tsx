import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Table } from "@/components/Table/table";
import { IconButton } from "@/components/Table/table-button-navigation";
import { TableCell } from "@/components/Table/table-cell";
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { ReserveEntity } from "@/interfaces/ReserveEntity";
import whatsAppApi from "@/services/whatsApp/whatsApp";
import { reserveStore } from "@/store/reserveStore";
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

interface ReserveListProps {
  data: ReserveEntity[] | null;
  loading: boolean;
}

export function ReserveList({ data, loading }: ReserveListProps) {

  const { searchData, setCurrentPage, currentPage, totalPages, } = reserveStore()


  if (loading || searchData === null) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-[48px] w-full rounded-none" />
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white">
            <Skeleton className="h-[30px] w-full rounded-none" />
          </div>
        ))}
        <div className="flex justify-end">
          <Skeleton className="h-[29px] w-[12rem] rounded-none" />
        </div>
      </div>
    );
  }

  
  return (
    <>

      <div className="flex flex-1 overflow-hidden">
        <Table className="w-full mb-5">
          <thead>
            <tr className="border-none">
              <TableHeader className="font-bold text-left">Hospede</TableHeader>
              <TableHeader className="font-bold text-left">Reserva</TableHeader>
              <TableHeader className="font-bold text-left">Referência Externa</TableHeader>
              <TableHeader className="font-bold text-left">Check-In</TableHeader>
              <TableHeader className="font-bold text-left">Check-Out</TableHeader>
              <TableHeader className="font-bold text-left">Quarto</TableHeader>
              <TableHeader className="font-bold text-left">Data</TableHeader>
              <TableHeader className="font-bold text-left">Valor Reserva</TableHeader>
            </tr>
          </thead>
          <tbody>
            {
              searchData && searchData.length > 0 ?
                searchData.map((reserve, index) => (
                  <TableRow className={index % 2 === 0 ? "bg-gray-90" : "bg-white"} key={String(reserve._id)}>
                    <TableCell className="flex gap-1 items-center">
                      {
                        reserve.guest.phoneNumber && (
                          <button onClick={() => whatsAppApi()}>
                            <BsWhatsapp className="text-green-600 cursor-pointer" />
                          </button>
                        )
                      }
                      {reserve.guest.name}
                    </TableCell>
                    <TableCell className="text-left">
                      {String(reserve._id)}
                    </TableCell>
                    <TableCell className="text-left">
                      {reserve.externReference}
                    </TableCell>
                    <TableCell className="text-left">
                      {new Date(reserve.checkIn).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-left">
                      {new Date(reserve.checkOut).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-left">
                      {reserve.room.name}
                    </TableCell>
                    <TableCell className="text-left">
                      {reserve.createdAt && new Date(reserve.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-left font-bold">
                      BRL {reserve.payment}
                    </TableCell>
                  </TableRow>
                )) :
                 <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">Nenhuma reserva encontrada</TableCell>
                </TableRow>


            }

          </tbody>

          {
            searchData && searchData?.length > 0 && (
              <tfoot>
                <tr>
                  <TableCell colSpan={9}>
                    <div className="flex items-center justify-end gap-8">
                      <span>Pagina {currentPage} de {totalPages}</span>
                      <div className="flex gap-1.5">
                        <IconButton
                          disabled={currentPage === 1}
                          transparent={currentPage != 1 ? false : true}
                          onClick={() => setCurrentPage(1)}
                        >
                          <BiChevronsLeft className="size-4" />
                        </IconButton>
                        <IconButton
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          transparent={currentPage === 1 ? true : false}
                        >
                          <BiChevronLeft className="size-4" />
                        </IconButton>
                        <IconButton
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages || totalPages === 0}
                          transparent={currentPage === totalPages || totalPages === 0 ? true : false}
                        >
                          <BiChevronRight className="size-4" />
                        </IconButton>
                        <IconButton
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages || totalPages === 0}
                          transparent={currentPage === totalPages || totalPages === 0 ? true : false}
                        >
                          <BiChevronsRight className="size-4" />
                        </IconButton>
                      </div>
                    </div>
                  </TableCell>
                </tr>
              </tfoot>
            )
          }
        </Table>
      </div>


    </>


  )

}