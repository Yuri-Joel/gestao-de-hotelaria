"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie";

import { ChevronRightIcon } from "@/assets/Icons/ChevronRightIncon"
import { ChevronsRightIcon } from "@/assets/Icons/ChevronsRightIcon"
import { ChevronLeftIcon } from "@/assets/Icons/ChevronLeftIcon"
import { ChevronsLeftIcon } from "@/assets/Icons/ChevronsLeftIcon"

import { Table } from "../Table/table"
import { TableRow } from "../Table/table-row"
import { TableCell } from "../Table/table-cell"
import { TableHeader } from "../Table/table-header"
import { IconButton } from "../Table/table-button-navigation"
import { propertyStore } from "@/store/propertyStore"
import { PropertyEntity } from "@/interfaces/EntitiesForNewAPI/PropertyEntity"
import { Skeleton } from "../Skeleton/Skeleton"
import { delay } from "@/helpers/delay"
import { Types } from "mongoose";
import { Input } from "../Input/Input";

interface PropertiesProps {
  data: PropertyEntity[] | null
}

export function PropertiesList({ data }: PropertiesProps) {
  const {
    searchData,
    searchInput,
    setSearchData,
    setSearchInput,
    setCurrentPage,
    propertyPerPage,
    totalPages,
    currentPage,
    rejectSkeleton,
    setRejectSkeleton
  } = propertyStore()

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const handleConfigProperty = (propertyId: Types.ObjectId, propertySlug: string) => {
    if (!data) return;

    Cookies.set(
      process.env.NEXT_PUBLIC_PROPERTY_ID as string,
      String(propertyId),
      {
        expires: 2,
        sameSite: "None",
        secure: true,
      },
    );

    Cookies.set(
      process.env.NEXT_PUBLIC_PROPERTY_SLUG as string,
      propertySlug,
      {
        expires: 2,
        sameSite: "None",
        secure: true,
      },
    );

    router.push(`/${propertySlug}/home`);
  }

  useEffect(() => {
    (async () => {
      setSearchData(data)
      if (!rejectSkeleton) {
        await delay(2000)
        setLoading(true)
      }
    })()
  }, [data, pathName])

  return (
    <>
     <div className="flex flex-col items-start">
       <div className="w-[300px] space-y-4">
         <h1 className="font-semibold">Todas as Propriedades</h1>
         <Input
          value={searchInput}
           placeholder="Nome ou ID da propriedade"
           handleValue={()=> true}
         />          
       </div>
         <div className="bg-black h-[1.5px] w-full mt-12"></div>
     </div>

      {loading || searchData === null || (Array.isArray(searchData) && searchData.length < 1) && (
        <div className="space-y-2">
          <Skeleton className="h-[48px] w-full rounded-none" />

          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white">
              <Skeleton className="h-[30px] w-full rounded-none" />
            </div>
          ))}

          <div className="flex justify-between">
            <Skeleton className="h-[15px] w-[10rem] mt-10 rounded-none" />
            <Skeleton className="h-[29px] w-[12rem] rounded-none" />
          </div>
        </div>
      )}


      {loading && data !== null && (Array.isArray(searchData) && data.length > 1) && (
        <Table className="w-full">
          {data && data.length > 0 && (
            <thead>
              <tr className="border-none">
                <TableHeader className="px-8 font-bold">Propriedade</TableHeader>
                <TableHeader className="text-right px-[5rem] font-bold">Status</TableHeader>
              </tr>
            </thead>
          )}

          <tbody>
            {Array.isArray(searchData) && (searchData && searchData.length > 0) &&
              searchData.slice(propertyPerPage === 10 ? 0 : propertyPerPage - 10, propertyPerPage).map((property, index) => (
                <TableRow className={index % 2 === 0 ? "bg-gray-90" : "bg-white"} key={index}>
                  <TableCell className="flex flex-col gap-2">
                    <div
                      className="text-primary-700 font-medium cursor-pointer"
                      onClick={() => handleConfigProperty(property?._id as Types.ObjectId, property?.slug as string)}
                    >{property.name}</div>

                    <span className="space-x-2">
                      ID: {property.id}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="mb-6">
                      {index % 2 === 0 ? "Disponivel para reserva" : "Indisponivel para reserva"}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            }
          </tbody>

          {
            data && data.length > 0 && (
              <tfoot>
                <tr>
                  <TableCell colSpan={2}>
                    <div className="flex items-center justify-end gap-8">
                      <span>Pagina {currentPage} de {totalPages}</span>
                      <div className="flex gap-1.5">
                        <IconButton
                          disabled={currentPage === 1}
                          transparent={currentPage != 1 ? false : true}
                          onClick={() => {
                            setRejectSkeleton(true)
                            setCurrentPage(1)
                          }}
                        >
                          <ChevronsLeftIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setRejectSkeleton(true)
                            setCurrentPage(currentPage - 1)
                          }
                          }
                          disabled={currentPage === 1}
                          transparent={currentPage === 1 ? true : false}
                        >
                          <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setRejectSkeleton(true)
                            setCurrentPage(currentPage + 1)
                          }}
                          disabled={currentPage === totalPages || totalPages === 0}
                          transparent={currentPage === totalPages || totalPages === 0 ? true : false}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setRejectSkeleton(true)
                            setCurrentPage(totalPages)
                          }
                          }
                          disabled={currentPage === totalPages || totalPages === 0}
                          transparent={currentPage === totalPages || totalPages === 0 ? true : false}
                        >
                          <ChevronsRightIcon />
                        </IconButton>
                      </div>
                    </div>
                  </TableCell>
                </tr>
              </tfoot>
            )
          }
        </Table>
      )}

      {loading && (
        <div className="mt-7">
          <Link
            href="propriedades/add-property"
            className="text-primary-700 font-bold text-md"
          >Adicionar propriedade</Link>
        </div>
      )}
    </>
  )

}