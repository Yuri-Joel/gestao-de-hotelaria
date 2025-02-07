"use client";

import Link from "next/link";
import { TableCell } from "../Table/table-cell";
import { TableHeader } from "../Table/table-header";
import { TableRow } from "../Table/table-row";
import { IconButton } from "../Table/table-button-navigation";
import { BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import { useEffect } from "react";
import { Table } from "../Table/table";
import { Search } from "./Search";
import { useFloorListStore } from "@/store/FloorListStore";
import { FloorListEntity } from "@/interfaces/FloorListEntity";
import { useSearchParams, useRouter } from "next/navigation";
import Dropdown from "../Dropdown/Dropdown";

interface PropertiesProps {
  data: FloorListEntity[];
}

export function FloorList({ data }: PropertiesProps) {
  const {
    searchInput,
    setSearchData,
    setSearchInput,
    searchData,
    setPage,
    setFloorsPerPage,
    floorsPerPage,
    page,
  } = useFloorListStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(searchData.length / 10);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    setPage(page);
  }

  function goToFirstPage() {
    goToPage(1);
    setFloorsPerPage(10); 
  }

  function goToNextPage() {
    goToPage(page + 1);
    setFloorsPerPage(floorsPerPage + 10);
  }

  function goToPreviousPage() {
    goToPage(page - 1);
    if (floorsPerPage !== 10) {
      setFloorsPerPage(floorsPerPage - 10);
    }
  }

  function goToLastPage() {
    goToPage(totalPages);
    const lastPageItems = searchData.length % 10 === 0 ? 10 : searchData.length % 10;
    setFloorsPerPage(searchData.length - lastPageItems + 10);
  }

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    const initialPage = pageFromUrl ? Number(pageFromUrl) : 1;
    setPage(initialPage);
  }, []);

  useEffect(() => {
    setSearchData(data);
  }, [data, setSearchData]);

  return (
    <div className="mt-5">
      { false && (
      <Search
        data={data}
        setPage={setPage}
        setSearchData={setSearchData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    )}
    <div className="mt-7">
        <Link href="propriedades/add-floor" className="text-primary-700 font-bold text-md">Adicionar novo andar</Link>
     </div>

      <Table className="w-full">
        <thead>
          <tr className="border-none">
            <TableHeader className="px-8 font-bold">Nome</TableHeader>
            <TableHeader className="text-right px-[5rem] font-bold">Acessibilidade</TableHeader>
            <TableHeader className="text-right px-[5rem] font-bold">Status</TableHeader>
            <TableHeader className="text-right px-[5rem] font-bold">Descrição</TableHeader>
            <TableHeader className="text-right px-[5rem] font-bold">Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {searchData.slice(floorsPerPage - 10, floorsPerPage).map((floor, index) => (
            <TableRow className={index % 2 === 0 ? "bg-gray-90" : "bg-white "} key={floor.id}>
              <TableCell className="flex flex-col gap-2">
                <Link href="/hotel-ao/home" className="text-primary-700 p-2 font-medium">{floor.name}</Link>
                {/* <span className="space-x-2">ID: {floor.id}</span> */}
              </TableCell>
              <TableCell className="text-center">
                <div className="p-2">
                  {floor.Accessibility}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="p-2">
                  {floor.Status}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="p-2">
                  {floor.Description}
                </div>
              </TableCell>
              <TableCell className="text-right items-center flex justify-center">
                <div className="flex justify-center relative items-center w-14 h-14 p-2">
                 <Dropdown
                 IconVisible= {false}
                 id="2"
                 data={[{id: "1", title: "Editar"},{id: "2", title: "Excluir"}]}
                 selectedId="true"
                 IsLeft ={false}
                 />
                 </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={5}>
              <div className="flex items-center justify-end gap-8">
                <span>Página {page} de {totalPages}</span>
                <div className="flex gap-1.5">
                  <IconButton disabled={page === 1} onClick={goToFirstPage}>
                    <BiChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === 1} onClick={goToPreviousPage}>
                    <BiChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === totalPages || totalPages === 0} onClick={goToNextPage}>
                    <BiChevronRight className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === totalPages || totalPages === 0} onClick={goToLastPage}>
                    <BiChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
      
    </div>
  );
}
