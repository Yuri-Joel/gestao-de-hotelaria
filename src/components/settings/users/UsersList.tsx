"use client";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Table } from "@/components/Table/table";
import { TableHeader } from "@/components/Table/table-header";
import { TableRow } from "@/components/Table/table-row";
import { TableCell } from "@/components/Table/table-cell";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/Table/table-button-navigation";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { Input } from "@/components/Input/Input";
import { userStore } from "@/store/userStore";
import AddUser from "./Add-user/AddUser";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { parseCookie } from "@/helpers/cookies/authCookie";
import { Types } from "mongoose";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { ActionMenu } from "@/components/ActionMenu/ActionMenu";

interface UsersProps {
  data: UserEntity[] | null;
}

export function UserList({ data }: UsersProps) {
  const router = useRouter();
  const cookie = parseCookie();

  const {
    setAddUserModal,
    setSelecteduser,
    currentPage,
    setCurrentPage,
    totalPages,
    handleOpenAlertDialogDeleteUser,
    isOpenedModalDeleteUser,
    remove,
    isDataLoading,
  } = userStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<Types.ObjectId | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleConfirmCancel = async () => {
    setOpenMenuId(null);
    if (!cookie) return;

    if (selectedUserId) {
      handleOpenAlertDialogDeleteUser();
      try {
        await remove(selectedUserId, cookie?.account);
        console.log("Usuario deletado com sucesso");
      } catch (error) {
        console.error("Erro ao deletar usuario:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openModelDeleteUser = (userId: Types.ObjectId) => {
    setSelectedUserId(userId || null);
    handleOpenAlertDialogDeleteUser();
  };

  const verifyUserLogged = (
    user: UserEntity,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    user._id == cookie?._id ? router.push(`/settings/perfil`) : "";
  };

  const handleSetSelectedUser = (user: { _id: string | Types.ObjectId }, e: React.MouseEvent) => {
    e.stopPropagation();
    const id = user._id.toString();
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
    setSelecteduser(user as UserEntity);
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      {isDataLoading ? (
        <div className="py-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="py-2 bg-white">
              <Skeleton className="h-12 w-FULL" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <AddUser />

          <div className="flex justify-between items-center w-full">
            <div className="mt-7 w-full">
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
                <TableHeader className="text-center font-bold">
                  Propriedade
                </TableHeader>
                <TableHeader className="text-center font-bold">
                  Email
                </TableHeader>
                <TableHeader className="text-center font-bold">
                  Ultimo acesso
                </TableHeader>
                <TableHeader className="text-center font-bold">
                  Sector
                </TableHeader>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(data) &&
                data?.map((user, index) => (
                  <TableRow
                    className={index % 2 === 0 ? "bg-gray-90" : "bg-white"}
                    key={index}
                  >
                    <TableCell className="text-center min-w-28">
                      <div
                        onClick={(e) => verifyUserLogged(user, e)}
                        className="py-2 w-full text-primary max-w-full truncate cursor-pointer"
                      >
                        {user.firstName + " " + user.lastName}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="py-2 w-full text-center max-w-full truncate">
                        {user.properties.length + " propriedades"}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="py-2 w-full text-center max-w-full truncate">
                        {user.email}
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="py-2 w-full text-center max-w-full truncate">{" - "}</div>
                    </TableCell>

                    <TableCell className="text-center items-center flex justify-center">
                      <ActionMenu
                        details={false}
                        itemId={user._id!}
                        openMenuId={openMenuId}
                        onSelect={handleSetSelectedUser}
                        onDelete={openModelDeleteUser}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </tbody>

            {data && data.length > 0 && (
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
                          disabled={currentPage === totalPages || totalPages === 1}
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
            )}
          </Table>

          <AlertDialog
            typeAlert="cancel"
            title="Tem certeza que deseja cancelar?"
            description="Ao confirmar, perderá todas as informações deste usuário."
            confirmTitleBtn="Sim, tenho certeza"
            cancelTitleBtn="Não, quero cancelar"
            isOpenedModalManagement={isOpenedModalDeleteUser}
            handleConfirm={handleConfirmCancel}
            handleCancel={() => {
              handleOpenAlertDialogDeleteUser();
              setOpenMenuId(null);
            }}
          />
        </div>
      )}
    </div>
  );
}