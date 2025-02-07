import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Table } from "@/components/Table/table";
import { IconButton } from "@/components/Table/table-button-navigation";
import { TableCell } from "@/components/Table/table-cell";
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { delay } from "@/helpers/delay";
import { ReserversEntity } from "@/interfaces/reserve";
import whatsAppApi from "@/services/whatsApp/whatsApp";
import { reserveStore } from "@/store/reserveStore";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";

interface ReserveListProps {
  data: ReserversEntity[];
}

export function ReserveList({data}: ReserveListProps) {

  const { searchData, setSearchData, setPage, page, setReservePerPage, reservePerPage, selectedTitleHeader} = reserveStore()
  const [loading, setLoading] = useState<boolean>(false);
  
  const searchParams = useSearchParams()
  const router = useRouter();

  const totalPages = Math.ceil(searchData.length / 10)
  
  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    setPage(page)
  }

  function goToFirstPage() {
    goToPage(1)
    setReservePerPage(10)
  }

  function goToNextPage() {
    goToPage(page + 1)
    setReservePerPage(reservePerPage + 10)
  }

  function goToPreviousPage() {
    goToPage(page - 1)
    if(reservePerPage !== 10){
      setReservePerPage(reservePerPage - 10)
    }
  }

  function goToLastPage() {
    goToPage(totalPages)
    const lastPageItems = searchData.length % 10 || 10;
    setReservePerPage(searchData.length - lastPageItems + 10);
  }

  const tableHeader = [
      {
        id:1,
        label: "Hospede"
      },
      {
        id:2,
        label: "Reserva"
      },
      {
        id:3,
        label: "Referência Externa"
      },
      {
        id:4,
        label: "Check-In"
      },
      {
        id:5,
        label: "Check-Out"
      },
      {
        id:6,
        label: "Quarto"
      },
      {
        id:7,
        label: "Data"
      },
      {
        id:8,
        label: "Valor Reserva"
      },
  ]
  
  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    const initialPage = pageFromUrl ? Number(pageFromUrl) : 1;
    setPage(initialPage);
  }, []);

  useEffect(() => {
    setLoading(true); 
    
    (async()=> {  
    await delay(2000) //simula um atraso de 2 segundos
    setLoading(false)

    })();
    
  }, [selectedTitleHeader]); 
  
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
                searchData.length > 0 ? 
                  searchData.slice(reservePerPage === 10 ? 0 : reservePerPage - 10, reservePerPage).map((reserve, index) => (
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
                  data.slice(reservePerPage === 10 ? 0 : reservePerPage - 10, reservePerPage).map((reserve, index) => (
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
                    <span>Pagina {page} de {totalPages}</span>
                    <div className="flex gap-1.5">
                    <IconButton 
                      disabled= {page === 1}
                      transparent= {page != 1 ? false : true}
                      onClick= {goToFirstPage}
                    >
                      <BiChevronsLeft className="size-4"/>
                    </IconButton>
                    <IconButton 
                      onClick= {goToPreviousPage}
                      disabled = {page === 1}
                      transparent={ page === 1 ? true : false}
                    >
                      <BiChevronLeft className="size-4"/>
                    </IconButton>
                    <IconButton 
                      onClick= {goToNextPage}
                      disabled = {page === totalPages || totalPages === 0}
                      transparent={page === totalPages || totalPages === 0 ? true : false}
                    >
                      <BiChevronRight className="size-4"/>
                    </IconButton>
                    <IconButton 
                      onClick= {goToLastPage}
                      disabled= {page === totalPages || totalPages === 0}
                      transparent= {page === totalPages || totalPages === 0 ? true : false}
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