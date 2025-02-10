"use client";
import Link from "next/link";
import { TableCell } from "../Table/table-cell";
import { TableHeader } from "../Table/table-header";
import { TableRow } from "../Table/table-row";
import { IconButton } from "../Table/table-button-navigation";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { Table } from "../Table/table";
import { floorStore } from "@/store/floorStore";
import { useEffect, useRef, useState } from "react";
import { RightIcon } from "@/assets/Icons/RightIcon";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import { Skeleton } from "../Skeleton/Skeleton";

export function FloorList() {
  const router = useRouter();
  const [IsLoading, setLoading] = useState<boolean>(false);

  const {
    find,
    floors,
    setSelectedFloor,
    currentPage,
    setCurrentPage,
    totalPages,
    setEditFloorModal,
  } = floorStore();
  const [openMenuId, setOpenMenuId] = useState<any | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await find(currentPage);
      } catch (error) {
        console.error("Erro ao buscar andares:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, find]);

  return (
    <>
      {IsLoading ? (
        <div className="p-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-2 bg-white">
              <Skeleton className="h-12 w-FULL" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <div className="mt-7">
            <Link
              href="propriedades/add-floor"
              className="text-primary-700 font-bold text-md"
            >
              Adicionar novo andar
            </Link>
          </div>

          <Table className="w-full" onClick={() => setOpenMenuId(null)}>
            <thead>
              <tr className="border-none">
                <TableHeader className="px-8 font-bold">Nome</TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Acessibilidade
                </TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Status
                </TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Descrição
                </TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Ações
                </TableHeader>
              </tr>
            </thead>
            <tbody>
              {floors?.map((floor: any, index: number) => (
                <TableRow
                  className={index % 2 === 0 ? "bg-gray-90" : "bg-white "}
                  key={index}
                >
                  <TableCell className="text-center min-w-28 ">
                    <div
                      onClick={(e?: any) => {
                        e.stopPropagation();
                        setSelectedFloor(floor);
                        router.push(`/hotel-ao/cadastro/andares/details`);
                      }}
                      className="p-2 w-full text-center text-primary cursor-pointer"
                    >
                      {floor.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      {floor.accessibility}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">{floor.status}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      {floor.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-center items-center flex justify-center">
                    <div className="flex justify-center relative" ref={menuRef}>
                      <div
                        onClick={(e?: any) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId == floor._id ? null : floor._id
                          );
                        }}
                        className=" w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-colors"
                      >
                        {openMenuId === floor._id && (
                          <RightIcon className="text-white h-14 w-14" />
                        )}
                      </div>

                      {openMenuId === floor._id && (
                        <div className="absolute top-full mt-1  w-48 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
                          <div
                            className=" bg-white"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <Button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white  hover:bg-gray-100"
                              role="menuitem"
                              handleClick={() => {
                                setSelectedFloor(floor);
                                setEditFloorModal(true);
                                router.push(
                                  `/hotel-ao/cadastro/andares/details`
                                );
                              }}
                              handleActive={() => true}
                            >
                              Editar
                            </Button>
                            <Button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                              role="menuitem"
                              handleClick={() => true}
                              handleActive={() => true}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={5}>
                  <div className="flex  items-center justify-end gap-8">
                    <span>
                      Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex gap-1.5">
                      <IconButton
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                      >
                        <BiChevronsLeft className="size-4" />
                      </IconButton>
                      <IconButton
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <BiChevronLeft className="size-4" />
                      </IconButton>
                      <IconButton
                        disabled={
                          currentPage === totalPages || totalPages === 1
                        }
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <BiChevronRight className="size-4" />
                      </IconButton>
                      <IconButton
                        disabled={
                          currentPage === totalPages || totalPages === 1
                        }
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        <BiChevronsRight className="size-4" />
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </tr>
            </tfoot>
          </Table>
        </div>
      )}
    </>
  );
}
