/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Link from "next/link"
import { usePropertyStore } from "@/store/propetyAcordionStorage"
import { TableCell } from "../Table/table-cell"
import { TableHeader } from "../Table/table-header"
import { TableRow } from "../Table/table-row"
import { IconButton } from "../Table/table-button-navigation"
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi"
import { useEffect, useState } from "react"
import { fakeProperties } from "@/data/properties"
import { Table } from "../Table/table"
import { Search } from "./Search"
import { Input } from "../Input/Input"
import { propertyStore } from "@/store/propertyStore"
import { Properties } from "@/interfaces/Properties"

interface PropertiesProps {
  data: Properties[]
}

export function PropertiesList({data}: PropertiesProps) {
  const { resetStore } = usePropertyStore();
  const [page, setPage] = useState(()=> {
    const url = new URL(window.location.toString())

    if ( url.searchParams.has("page")) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })
  const { 
    searchData, 
    searchInput, 
    setSearchData, 
    setSearchInput
  } = propertyStore()
  const [manyproperties, setManyProperties] = useState(10)
  const totalPages = Math.ceil(searchData.length / 10)

  function goToFirstPage() {
    setCurrentPage(1)
    setManyProperties(10)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
    setManyProperties((prev) => prev + 10)
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
    if(manyproperties !== 10){
      setManyProperties((prev) => prev - 10)
    }
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
    setManyProperties(fakeProperties.length)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))

    window.history.pushState({}, "", url)
    setPage(page)
  }

  useEffect(() => {
    setSearchData(data)
  }, [])
  
  return(
    <div className="mt-5">
      <Search
        data={data}
        setPage={setPage}
        searchData={searchData}
        setSearchData={setSearchData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setManyProperties={setManyProperties}
      />

      <Table className="w-full">
        <thead>
          <tr className="border-none">
            <TableHeader className="px-8 font-bold">Propriedade</TableHeader>
            <TableHeader className="text-right px-[5rem] font-bold">Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {
            searchData.length > 0 ? 
              searchData.slice(manyproperties === 10 ? 0 : manyproperties - 10, manyproperties).map((property, index) => (
                <TableRow className={index % 2 === 0 ? "bg-gray-90" : "bg-white"} key={property.id}>
                  <TableCell className="flex flex-col gap-2">
                    <Link href="/hotel-ao/home"  className="text-primary-700 font-medium">{property.name}</Link>
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
              )) :
              data.slice(manyproperties === 10 ? 0 : manyproperties - 10, manyproperties).map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="flex flex-col gap-2">
                    <Link href="/hotel-ao/home"  className="text-primary-700 font-medium">{property.name}</Link>
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
      <div onClick={resetStore} className="mt-7">
        <Link href="propriedades/add-property" className="text-primary-700 font-bold text-md">Adicionar propriedade</Link>
      </div>
    </div>
  ) 

}