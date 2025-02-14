"use client";

import {
    BiChevronLeft,
    BiChevronRight,
    BiChevronsLeft,
    BiChevronsRight,
} from "react-icons/bi";

import { useEffect, useRef, useState } from "react";
import { RightIcon } from "@/assets/Icons/RightIcon";
import { useRouter } from "next/navigation";
import { Table } from "@/components/Table/table";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Button } from "@/components/Button/Button";
import { UhStore } from "@/store/UhStore";
import { modalManagementStore } from "@/store/modalManagementStore";
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { TableCell } from "@/components/Table/table-cell";
import { IconButton } from "@/components/Table/table-button-navigation";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { UHEntity } from "@/interfaces/EntitiesForNewAPI/UHEntity";
import { EditUhModal } from "./UhEditModal";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { Types } from "mongoose";
import { NewUhModal } from "./newUh";


export const UhList = () => {
    const [IsLoading, setLoading] = useState<boolean>(false);

    const {
        find,
        UH,
        currentPage,
        totalPages,
        setCurrentPage,
        setSelectedUh,
        selectedUh,
        DeleteUH
    } = UhStore();

    const { handleOpenModalNewUh, handleOpenModalEditUh, isOpenedModalEditUh, isOpenedModalNewUh, handleOpenModalDeleteUh, isOpenedModalDeleteUh} = modalManagementStore()
    const [openMenuId, setOpenMenuId] = useState<any | null>(null);
    const [loadingRoom, setLoadingRoom] = useState(false)
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

    const handleClickAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, uh:UHEntity) => {
        e.stopPropagation();
        setSelectedUh(uh);
    }

    const handleDeleteSubmit = async()=>{

        setLoadingRoom(true);
        try {
            
            await DeleteUH(selectedUh?._id as Types.ObjectId);
            handleOpenModalDeleteUh();

        } catch (error) {
            
        }finally{
            setLoadingRoom(false)

        }

            }
    return (
        <>

            <div className="mt-5">
                <div className="mt-7">
                    <button
                        className="text-primary-700 font-bold text-md"
                        onClick={handleOpenModalNewUh}
                    >
                        Adicionar novo quarto
                    </button>
                </div>

                <Table className="w-full" onClick={() => setOpenMenuId(null)}>
                    <thead>
                        <tr className="border-none">
                            <TableHeader className="px-8 font-bold">
                                Nome
                            </TableHeader>
                            <TableHeader className="text-center px-[5rem] font-bold">
                                Localização
                            </TableHeader>
                            <TableHeader className="text-center px-[5rem] font-bold">
                                Acessibilidade
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
                            Array.isArray(UH) && UH?.map((uh, index) => (
                                <TableRow
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-90"
                                            : "bg-white "
                                    }
                                    key={index}
                                >
                                    <TableCell className="text-center min-w-28 ">
                                        <div
                                            onClick={(e)=>handleClickAction(e,uh)}
                                            className="p-2 w-full text-center text-primary cursor-pointer"
                                        >
                                            {uh.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="p-2 w-full text-center">
                                            {(uh.floor as FloorEntity).name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="p-2 w-full text-center">
                                            {(uh.floor as FloorEntity).isAccessible ? "sim" : "não"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="p-2 w-full text-center">
                                            -
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center items-center flex justify-center">
                                        <div
                                            className="flex justify-center relative"
                                            ref={menuRef}
                                        >
                                            <div
                                                onClick={(e?: any) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(
                                                        openMenuId == uh._id
                                                            ? null
                                                            : uh._id,
                                                    );
                                                }}
                                                className=" w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-colors"
                                            >
                                                {openMenuId === uh._id && (
                                                    <RightIcon className="text-white h-14 w-14" />
                                                )}
                                            </div>

                                            {openMenuId === uh._id && (
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
                                                                setSelectedUh(
                                                                    uh,
                                                                );
                                                                handleOpenModalEditUh()
                                                            }}
                                                            handleActive={() =>
                                                                true
                                                            }
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                                                            role="menuitem"
                                                            handleClick={()=>{ setSelectedUh(
                                                                uh,
                                                            );handleOpenModalDeleteUh()}    
                                                            }
                                                            handleActive={() =>
                                                                true
                                                            }
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
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                        >
                                            <BiChevronLeft className="size-4" />
                                        </IconButton>
                                        <IconButton
                                            disabled={
                                                currentPage === totalPages ||
                                                totalPages === 1
                                            }
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                        >
                                            <BiChevronRight className="size-4" />
                                        </IconButton>
                                        <IconButton
                                            disabled={
                                                currentPage === totalPages ||
                                                totalPages === 1
                                            }
                                            onClick={() =>
                                                setCurrentPage(totalPages)
                                            }
                                        >
                                            <BiChevronsRight className="size-4" />
                                        </IconButton>
                                    </div>
                                </div>
                            </TableCell>
                        </tr>
                    </tfoot>
                </Table>
                {isOpenedModalEditUh && selectedUh && <EditUhModal  dataTranported={selectedUh}/>}
                {isOpenedModalNewUh && <NewUhModal />}
                
        <AlertDialog
          typeAlert="cancel"
          title="Tem certeza que deseja eliminar este quarto?"
          description="Ao confirmar, este quarto será eliminado."
          confirmTitleBtn="Sim, tenho certeza"
          cancelTitleBtn="Cancelar"
          hideTypeAlertIcon
          isOpenedModalManagement={isOpenedModalDeleteUh}
          handleConfirm={handleDeleteSubmit}
          handleCancel={handleOpenModalDeleteUh}
          isBtnLoading={loadingRoom}
          />

            </div>
        </>
    );
}
