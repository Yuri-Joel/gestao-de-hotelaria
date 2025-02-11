"use client";
import Link from "next/link";

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
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { TableCell } from "@/components/Table/table-cell";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/Table/table-button-navigation";
import { formatDateIsoToBr } from "@/helpers/formatDateisoToBr";
import { UsersEntity } from "@/interfaces/UsersEntity";
import { Input } from "@/components/Input/Input";
import { userStore } from "@/store/userStore";

export function UserList() {
    const router = useRouter();

    const {
        find,
        users,
        setSelecteduser,
        currentPage,
        setCurrentPage,
        totalPages,
    } = userStore();
    const [openMenuId, setOpenMenuId] = useState<any | null>(null);
    const [search, setSearch] = useState<string>("");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!find || !currentPage) return;
        (async () => {
            try {
                await find(currentPage);
            } catch (error) {
                console.error("Erro ao buscar andares:", error);
            }
        })();
    }, [currentPage, find]);

    const roleTranslations: { [key: string]: string } = {
        Admin: "Administrador",
        Manager: "Gerente",
        ReservationCreator: "Criador de Reservas",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    return (
        <div className="mt-5">
            <div className="mt-7">
                <span className="font-bold mb-2">Usuarios</span>
                <Input handleValue={handleChange} value={search} placeholder="Buscar por nome"
                    className="w-1/3 h-12"


                />
            </div>

            <Table className="w-full">
                <thead>
                    <tr className="border-none">
                        <TableHeader className="px-8 font-bold">Nome</TableHeader>
                        <TableHeader className="text-center px-[5rem] font-bold">
                            Propriedade
                        </TableHeader>
                        <TableHeader className="text-center px-[5rem] font-bold">
                            Função
                        </TableHeader>
                        <TableHeader className="text-center px-[5rem] font-bold">
                            Ultimo acesso
                        </TableHeader>
                        <TableHeader className="text-center px-[5rem] font-bold">
                            Ações
                        </TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user: UsersEntity, index: number) => (
                        <TableRow
                            className={index % 2 === 0 ? "bg-gray-90" : "bg-white "}
                            key={index}
                        >
                            <TableCell className="text-center min-w-28 ">
                                <Link href={`/hotel-ao/cadastros/andares/details/`}>
                                    <div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelecteduser(user);
                                            router.push(`/hotel-ao/cadastro/andares/details/`);
                                        }}
                                        className="p-2 w-full text-center text-primary "
                                    >
                                        {user.name}
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="p-2 w-full text-center">
                                    {user.property.length + " propriedades"}
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="p-2 w-full text-center">
                                    {roleTranslations[user.role] || "Função desconhecida"}
                                </div>

                            </TableCell>
                            <TableCell className="text-center">
                                <div className="p-2 w-full text-center">
                                    {formatDateIsoToBr(user.lastAccess)}
                                </div>
                            </TableCell>
                            <TableCell className="text-center items-center flex justify-center">
                                <div className="flex justify-center relative" ref={menuRef}>
                                    <div
                                        onClick={() => {
                                            setOpenMenuId(openMenuId == user._id ? null : user._id);
                                        }}
                                        className=" w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-colors"
                                    >
                                        {openMenuId === user._id && (
                                            <RightIcon className="text-white h-14 w-14" />
                                        )}
                                    </div>

                                    {openMenuId === user._id && (
                                        <div className="absolute  mt-8 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                            >
                                                <Button
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white  hover:bg-gray-100"
                                                    role="menuitem"
                                                    handleClick={() => true}
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
                                        disabled={currentPage === totalPages || totalPages === 1}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        <BiChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        disabled={currentPage === totalPages || totalPages === 1}
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
    );
}
