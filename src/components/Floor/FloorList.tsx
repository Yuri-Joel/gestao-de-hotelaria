"use client";

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
import FloorEditModal from "./FloorEditModal";
import { AddFloorModal } from "./AddFloor/AddFloorModal";

import Cookies from "js-cookie";
import { modalManagementStore } from "@/store/modalManagementStore";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import AlertDialog from "../AlertDialog/AlertDialog";
import { Types } from "mongoose";

export function FloorList() {
  const router = useRouter();
  const [IsLoading, setLoading] = useState<boolean>(false);
  const [loadingfloor, setloadingfloor] = useState(false)
    
const {handleOpenModalDeletefloor, handleOpenModalNewfloor, handleOpenModalEditfloor, isOpenedModalDeletefloor, isOpenedModalNewfloor, isOpenedModalEditfloor} = modalManagementStore()
  const slug = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_SLUG}`)

  const {
    find,
    floors,
    setSelectedFloor,
    selectedFloor,
    currentPage,
    setCurrentPage,
    totalPages,
    Deletefloor
    
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
      const handleDeleteSubmit = async()=>{
  
        setloadingfloor(true);
          try {
              
              await Deletefloor(selectedFloor?._id as Types.ObjectId);
              handleOpenModalDeletefloor();
  
          } catch (error){
              
          }finally{
         setloadingfloor(false)
  
          }
        }
  
  
      const handleClickAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, floor: FloorEntity) => {
          e.stopPropagation();
          setSelectedFloor(floor);
      }

  return (
    <>
     
      <div className="mt-5">
        <div className="mt-7">
          <button
            className="text-primary-700 font-bold text-md"
            onClick={handleOpenModalNewfloor}
          >
            Adicionar novo andar
          </button>
        </div>

        <Table className="w-full" onClick={() => setOpenMenuId(null)}>
          <thead>
            <tr className="border-none">
              <TableHeader className="text-center px-[5rem] font-bold">
                Nome
              </TableHeader>
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
            {IsLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i} className="p-2 bg-white">
                    <TableCell colSpan={5}>
                      <Skeleton className="h-12 w-FULL" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              Array.isArray(floors) &&
              floors?.map((floor, index) => (
                <TableRow
                  className={index % 2 === 0 ? "bg-gray-90" : "bg-white "}
                  key={index}
                >
                  <TableCell className="text-center min-w-28 ">
                    <div
                      onClick={(e)=>handleClickAction(e, floor)}
                      className=" w-full text-center text-primary cursor-pointer"
                    >
                      {floor.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      {floor.isAccessible ? "Acessivel" : "Não acessível"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      -
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      -
                    </div>
                  </TableCell>
                  <TableCell className="text-center flex items-center  justify-center">
                    <div
                      className="flex justify-center items-center mt-2  relative w-6 h-6"
                      ref={menuRef}
                    >
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
                        <div className="absolute top-full w-24 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
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
                    handleOpenModalEditfloor();
                  }}
                  handleActive={() => true}
                >
                              Editar
                            </Button>
                            <Button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                              role="menuitem"
                              handleClick={() =>{
                                    setSelectedFloor(floor);
                                    handleOpenModalDeletefloor();

                              }}
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
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <TableCell colSpan={5}>
                <div className="flex items-center justify-end gap-8">
                  <span>Pagina {currentPage} de {totalPages}</span>
                  <div className="flex gap-1.5">
                    <IconButton
                      disabled={currentPage === 1}
                      transparent={currentPage != 1 ? false : true}
                      onClick={() => {
                        setCurrentPage(1)
                      }}
                    >
                      <BiChevronsLeft className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setCurrentPage(currentPage - 1)
                      }
                      }
                      disabled={currentPage === 1}
                      transparent={currentPage === 1 ? true : false}
                    >
                      <BiChevronLeft className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setCurrentPage(currentPage + 1)
                      }}
                      disabled={currentPage === totalPages || totalPages === 0}
                      transparent={currentPage === totalPages || totalPages === 0 ? true : false}
                    >
                      <BiChevronRight className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setCurrentPage(totalPages)
                      }
                      }
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
        </Table>
        {isOpenedModalNewfloor &&  <AddFloorModal />}
        {isOpenedModalEditfloor && selectedFloor && <FloorEditModal  dataTranported={selectedFloor} />}
        <AlertDialog
          typeAlert="cancel"
          title="Tem certeza que deseja eliminar este andar?"
          description="Ao confirmar, este andar será eliminado."
          confirmTitleBtn="Sim, tenho certeza"
          cancelTitleBtn="Cancelar"
          hideTypeAlertIcon
          isOpenedModalManagement={isOpenedModalDeletefloor}
          handleConfirm={handleDeleteSubmit}
          handleCancel={handleOpenModalDeletefloor}
          isBtnLoading={loadingfloor}
          />

      </div>
    </>
  );
      
    }
