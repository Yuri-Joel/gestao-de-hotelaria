import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Table } from "@/components/Table/table";
import { IconButton } from "@/components/Table/table-button-navigation";
import { TableCell } from "@/components/Table/table-cell";
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { ReserverEntity } from "@/interfaces/reserveEntity";
import whatsAppApi from "@/services/whatsApp/whatsApp";
import { reserveStore } from "@/store/reserveStore";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

interface ReserveListProps {
  data: ReserverEntity[] | null;
  loading: boolean;
}

export function ReserveList({data, loading}: ReserveListProps) {

  const { searchData, setSearchData, setCurrentPage, reservePerPage, currentPage, totalPages} = reserveStore()

  
  useEffect(() => {
    setSearchData(data)
  }, [data])
  
  return(
    <>
    {
      loading ? (
        <div className="space-y-2 py-5">
          <Skeleton className="h-[48px] w-full" />
          {[...Array(10)].map((_, i) => (
            <div key={i}  className=" bg-white">
              <Skeleton className="h-[30px] w-full" />
            </div>
          ))}
          <div className="flex justify-end">
            <Skeleton className="h-[29px] w-[12rem] " />
          </div>
        </div>
      ) : (
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
                    <TableRow className={index % 2 === 0 ? "bg-gray-90" : "bg-white"} key={reserve.id}>
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
                        {reserve.id}
                      </TableCell>
                      <TableCell className="text-left">
                        {reserve.externReference}
                      </TableCell>
                      <TableCell className="text-left">
                        {new Date(reserve.checkIn).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-left">
                        {new Date(reserve.checkOut).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-left">
                        {reserve.room.name}
                      </TableCell>
                      <TableCell className="text-left">
                        {new Date(reserve.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-left">
                        {reserve.payment}
                      </TableCell>
                    </TableRow>
                  )) :
                  data && data.slice(reservePerPage === 10 ? 0 : reservePerPage - 10, reservePerPage).map((reserve, index) => (
                    <TableRow className={index % 2 === 0 ? "bg-gray-90" : "bg-white"} key={reserve.id}>
                      <TableCell className="flex gap-1 items-center ">
                        {
                          reserve.guest.phoneNumber && (
                            <button onClick={() => whatsAppApi()} >
                              <BsWhatsapp className="text-green-600 cursor-pointer" />
                            </button>
                          )
                        }
                        {reserve.guest.name}
                      </TableCell>
                      <TableCell className="text-left">
                        {reserve.id}
                      </TableCell>
                      <TableCell className="text-left">
                        {reserve.externReference}
                      </TableCell>
                      <TableCell className="text-left">
                        {new Date(reserve.checkIn).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-left">
                        {new Date(reserve.checkOut).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-left">
                        {reserve.room.name}
                      </TableCell><TableCell className="text-left">
                        {new Date(reserve.createdAt).toLocaleDateString()}
                      </TableCell><TableCell className="text-left">
                        {reserve.payment}
                      </TableCell>
                    </TableRow>
                  ))
              }
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={9}>
                  <div className="flex items-center justify-end gap-8">
                    <span>Pagina {currentPage} de {totalPages}</span>
                    <div className="flex gap-1.5">
                    <IconButton 
                      disabled= {currentPage === 1}
                      transparent= {currentPage != 1 ? false : true}
                      onClick= {() => setCurrentPage(1)}
                    >
                      <BiChevronsLeft className="size-4"/>
                    </IconButton>
                    <IconButton 
                      onClick= {() => setCurrentPage(currentPage - 1)}
                      disabled = {currentPage === 1}
                      transparent={ currentPage === 1 ? true : false}
                    >
                      <BiChevronLeft className="size-4"/>
                    </IconButton>
                    <IconButton 
                      onClick= {() => setCurrentPage(currentPage + 1)}
                      disabled = {currentPage === totalPages || totalPages === 0}
                      transparent={currentPage === totalPages || totalPages === 0 ? true : false}
                    >
                      <BiChevronRight className="size-4"/>
                    </IconButton>
                    <IconButton 
                      onClick= {() => setCurrentPage(totalPages)}
                      disabled= {currentPage === totalPages || totalPages === 0}
                      transparent= {currentPage === totalPages || totalPages === 0 ? true : false}
                    >
                      <BiChevronsRight className="size-4"/>
                    </IconButton>
                    </div>
                  </div>
                </TableCell>
              </tr>
            </tfoot>
          </Table>
        </div>
      )
    }
    
    </>
    
      
  )

}