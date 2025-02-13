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
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { TableCell } from "@/components/Table/table-cell";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/Table/table-button-navigation";
import { formatDateIsoToBr } from "@/helpers/formatDateisoToBr";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { Input } from "@/components/Input/Input";
import { userStore } from "@/store/userStore";
import AddUser from "./Add-user/AddUser";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { parseCookie } from "@/helpers/cookies/authCookie";
import { Types } from "mongoose";
import { Skeleton } from "@/components/Skeleton/Skeleton";

export function UserList() {
  const cookie = parseCookie();
  const router = useRouter();

  const {
    find,
    users,
    setAddUserModal,
    setSelecteduser,
    currentPage,
    setCurrentPage,
    totalPages,
    handleOpenAlertDialogDeleteUser,
    isOpenedModalDeleteUser,
    remove,
  } = userStore();

  const [IsLoading, setLoading] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<any | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<Types.ObjectId | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    if (!users || !currentPage || !find) return;
    (async () => {
      try {
        await find(currentPage);
      } catch (error) {
        console.error("Erro ao buscar usuarios:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage , find]);

  const roleTranslations: { [key: string]: string } = {
    Admin: "Administrador",
    Manager: "Gerente",
    ReservationCreator: "Criador de Reservas",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleConfirmCancel = async () => {
    if (selectedUserId) {
      handleOpenAlertDialogDeleteUser();
      try {
        await remove(selectedUserId, cookie.account);
        console.log("Usuario deletado com sucesso");
      } catch (error) {
        console.error("Erro ao deletar usuario:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openModelDeleteUser = (user: Types.ObjectId) => {
    setSelectedUserId(user ? user : null);
    handleOpenAlertDialogDeleteUser();
  };

  const verifyUserLogged = (
    user: UserEntity,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    user._id == cookie._id
      ? router.push(`/settings/perfil`)
      : "";
  };

  const handleSetSelectedUser = (user: UserEntity, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openMenuId === user._id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(user._id);
    }
    setSelecteduser(user);
  }

  return (
    <div className="transition-all duration-200 ease-in-out">
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
          <AddUser />
          <div className="flex justify-between items-center w-full">
            <div className="mt-7 w-full">
              <span className="font-bold mb-2">Usuários</span>
              <Input
                handleValue={handleChange}
                value={search}
                placeholder="Buscar por nome"
                className="w-1/3 h-12"
              />
            </div>
            <Button
              handleActive={() => true}
              handleClick={() => setAddUserModal(true)}
              className="text-primary-700 font-bold text-md w-60 mt-7 bg-white"
            >
              Adicionar novo usuário
            </Button>
          </div>

          <Table className="w-full">
            <thead>
              <tr className="border-none">
                <TableHeader className="px-8 font-bold">Nome</TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Propriedade
                </TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Email
                </TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Ultimo acesso
                </TableHeader>
                <TableHeader className="text-center px-[5rem] font-bold">
                  Sector
                </TableHeader>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: UserEntity, index: number) => (
                <TableRow
                  className={index % 2 === 0 ? "bg-gray-90" : "bg-white "}
                  key={index}
                >
                  <TableCell className="text-center min-w-28 ">
                    <div
                      onClick={(e) => verifyUserLogged(user, e)}
                      className="p-2 w-full text-center text-primary  cursor-pointer"
                    >
                      {user.firstName + " " + user.lastName}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      {user.properties.length + " propriedades"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="p-2 w-full text-center">{ " - "}</div>
                  </TableCell>
                  <TableCell className="text-center items-center flex justify-center">
                    <div
                      className="flex justify-center relative  "
                      ref={menuRef}
                    >
                      <div onClick={(e) => handleSetSelectedUser(user, e)}
                        className="w-6 h-6 bg-white border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-colors"
                      >
                        {openMenuId === user._id && (
                          <RightIcon className="text-white h-14 w-14" />
                        )}
                      </div>

                      {openMenuId === user._id && (
                        <div className="absolute top-full w-24 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
                          <div
                            className=" bg-white"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <Button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100"
                              role="menuitem"
                              handleClick={() => true}
                              handleActive={() => true}
                            >
                              Editar
                            </Button>
                            <Button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                              role="menuitem"
                              handleClick={() => {
                                openModelDeleteUser(user._id as Types.ObjectId);
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
              ))}
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={5}>
                  <div className="flex items-center justify-end gap-8">
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
                          currentPage === totalPages ||
                          totalPages === currentPage - 1
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
          <AlertDialog
            typeAlert="cancel"
            title="Tem certeza que deseja cancelar?"
            description="Ao confirmar, perderá todas as informações deste usuário."
            confirmTitleBtn="Sim, tenho certeza"
            cancelTitleBtn="Não, quero cancelar"
            isOpenedModalManagement={isOpenedModalDeleteUser}
            handleConfirm={handleConfirmCancel}
            handleCancel={handleOpenAlertDialogDeleteUser}
          />
        </div>
      )}
    </div>
  );
}
