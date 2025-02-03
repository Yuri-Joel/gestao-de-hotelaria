/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from "next/link"
import { TableCell } from "../Table/table-cell"
import { TableHeader } from "../Table/table-header"
import { TableRow } from "../Table/table-row"
import { IconButton } from "../iconButton"
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"
import { useState } from "react"
import { fakeProperties } from "@/data/properties"


export function PropertiesList() {
  
  const [page, setPage] = useState(()=> {

    const url = new URL(window.location.toString())

    if ( url.searchParams.has("page")) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  const [manyproperties, setManyProperties] = useState(5)
  const totalPages = Math.ceil(fakeProperties.length / 5)

  function goToFirstPage () {
    setCurrentPage(1)
    setManyProperties(5)

  }

  function goToNextPage () {
    setCurrentPage(page + 1)
    setManyProperties((prev) => prev + 5)
  }

  function goToPreviousPage () {
    setCurrentPage(page - 1)
    if(manyproperties !== 5){
      setManyProperties((prev) => prev - 5)
    }
  }

  function goToLastPage () {
    setCurrentPage(totalPages)
    setManyProperties(fakeProperties.length)

  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))

    window.history.pushState({}, "", url)
    setPage(page)
  }

  return(
    <div className="mt-5">
      <table className="w-full">
        <thead>
          <tr className="border-none">
            <TableHeader className="px-8 font-bold">Propriedades</TableHeader>
            <TableHeader className="text-right px-[5rem] font-bold">Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            fakeProperties.slice(manyproperties === 5 ? 0 : manyproperties - 5, manyproperties).map((property) => (
              <TableRow key={property.id} className="border-none">
                <TableCell className="flex flex-col gap-2">
                  <Link href=""  className="text-primary-700 font-medium">{property.name}</Link>
                  <span className="space-x-2">
                    ID: {property.id}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="mb-6">
                    {property.state === "active" ? "Disponivel para reserva" : "Indisponivel para reserva"}
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="text-right" colSpan={2}>
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
                  disabled= {page === totalPages}
                  transparent= {page === totalPages ? true : false}
                >
                  <BiChevronsRight className="size-4"/>
                </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </table>
      <div className="mt-7">
        <Link href="propriedades/nova-propriedade" className="text-primary-700 font-bold text-md">Adicionar propriedade</Link>
      </div>
    </div>
  ) 

}