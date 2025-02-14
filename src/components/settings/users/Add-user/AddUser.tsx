"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { XIcon } from "@/assets/Icons/XIcon";
import { twMerge } from "tailwind-merge";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { userStore } from "@/store/userStore";
import { parseCookie } from "@/helpers/cookies/authCookie";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { Types } from "mongoose";
import { Modal } from "@/components/Modal/Modal";

const AddUser: React.FC = () => {
  const { AddUserModal, setAddUserModal, create } = userStore();

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    properties: [] as string[],
    account: "",
  });

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      properties: [],
      account: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmCancel = async () => {
    setIsAlertDialogOpen(false);
    setAddUserModal(false);
    resetFormData();
  };

  const handleAddNewUser = async () => {
    setIsLoading(true);
    try {
      const cookie = parseCookie();

      const setData: UserEntity = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        properties: [],
        account: cookie?.account as Types.ObjectId,
      };

      await create(setData);

      setAddUserModal(false);
      resetFormData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

 

  const clorseAddUserModal = () => {
    if (
      formData.firstName.length > 0 ||
      formData.lastName.length > 0 ||
      formData.email.length > 0 ||
      formData.password.length > 0 ||
      formData.properties.length > 0
    ) {
      setIsAlertDialogOpen(true);
    } else {
      setAddUserModal(false);
    }
  };

  return (
    <>
      {AddUserModal && (
        <div>
        <Modal
         title="Cadastrar Novo Usuário"
         description="Preencha os dados abaixo para cadastrar um novo usuário"
         isOpen={AddUserModal}
         onClose={ clorseAddUserModal}
         children={
            <div
              className={twMerge(
                "w-full max-h-[calc(100vh-100px)] bg-white flex flex-col gap-4 overflow-y-auto no-scrollbar transition-all duration-400 ease-in-out"
              )}
            >
 
               
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="font-medium text-sm text-black">
                      Primeiro Nome
                    </span>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira o primeiro nome"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <span className="font-medium text-sm text-black">
                      Sobrenome
                    </span>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira o sobrenome"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <span className="font-medium text-sm text-black">
                      Email
                    </span>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira o email"
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <span className="font-medium text-sm text-black">
                      Senha
                    </span>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      handleValue={handleInputChange}
                      className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm rounded-lg border focus:border-primary"
                      placeholder="Insira a senha"
                    />
                  </div>

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    handleActive={() => true}
                    handleClick={handleAddNewUser}
                    width="100%"
                    height="45px"
                    className="mt-4"
                  >
                    Adicionar Usuário
                  </Button>
                   </div>
      
          </div>
 
          }
        />
          <AlertDialog
            typeAlert="cancel"
            title="Tem certeza que deseja cancelar?"
            description="Ao confirmar, perderá todas as alterações feitas nos campos atuais."
            confirmTitleBtn="Sim, tenho certeza"
            cancelTitleBtn="Não, quero continuar editando"
            isOpenedModalManagement={isAlertDialogOpen}
            handleConfirm={handleConfirmCancel}
            handleCancel={() => setIsAlertDialogOpen(false)}
          />
          
        </div>
      )}
    </>
  );
};

export default AddUser;
