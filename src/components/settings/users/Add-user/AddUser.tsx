"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { twMerge } from "tailwind-merge";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { userStore } from "@/store/userStore";
import { parseCookie } from "@/helpers/cookies/authCookie";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { Types } from "mongoose";
import { Modal } from "@/components/Modal/Modal";

const AddUser: React.FC = () => {
  const { AddUserModal, setAddUserModal, create } = userStore();

  const [isLoading, setIsLoading] = useState(false);
  const [AlertTrue, setAlertTrue] = useState(false);
  const [AlertFalse, setAlertFalse] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    properties: [],
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

  const handleBack = () => {
    setAddUserModal(true);
    setAlertFalse(false);
  };
  const handleGoToUsers = () => {
    setAddUserModal(false);
    setAlertTrue(false);
  };

  const handleAddMoreUser = () => {
    resetFormData();
    setAddUserModal(true);
    setAlertTrue(false);
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
      setAlertTrue(true);
      resetFormData();
    } catch (error) {
      console.error(error);
      setAlertFalse(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clorseAddUserModal = () => {
    resetFormData();
    setAddUserModal(false);
  };

  return (
    <>
      {AddUserModal && (
        <div>
          <Modal
            title="Cadastrar novo usuário"
            description="Preencha os dados abaixo para cadastrar um novo usuário"
            isOpen={AddUserModal}
            onClose={clorseAddUserModal}
          >
            <div>
              <div className="flex flex-col gap-1 mb-2">
                <span className="font-medium text-sm text-black">
                  Primeiro Nome
                </span>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  handleValue={handleInputChange}
                  className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm border focus:border-primary"
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
                  className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm border focus:border-primary"
                  placeholder="Insira o sobrenome"
                />
              </div>

              <div className="flex flex-col gap-1 mb-2">
                <span className="font-medium text-sm text-black">Email</span>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  handleValue={handleInputChange}
                  className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm border focus:border-primary"
                  placeholder="Insira o email"
                />
              </div>

              <div className="flex flex-col gap-1 mb-2">
                <span className="font-medium text-sm text-black">Senha</span>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  handleValue={handleInputChange}
                  className="bg-transparent px-3 py-3 appearance-none h-14 w-full text-black text-sm border focus:border-primary"
                  placeholder="Insira a senha"
                />
              </div>

              <Button
                type="button"
                isLoading={isLoading}
                handleActive={() =>
                  formData.firstName &&
                  formData.lastName &&
                  formData.email &&
                  formData.password
                    ? true
                    : false
                }
                handleClick={handleAddNewUser}
                className="mt-4 w-full"
              >
                Cadasttrar Usuário
              </Button>
            </div>
          </Modal>
        </div>
      )}

      <AlertDialog
        typeAlert={"confirm"}
        title="Sucesso"
        description="Usuário foi cadastrado com sucesso"
        confirmTitleBtn="Ir para usuários"
        cancelTitleBtn="Adicionar mais usuários"
        isOpenedModalManagement={AlertTrue}
        handleConfirm={handleGoToUsers}
        handleCancel={handleAddMoreUser}
        hideCloseTopButton
      />

      <AlertDialog
        typeAlert={"cancel"}
        title="Erro"
        description="Erro ao cadastrar um novo usuario"
        cancelTitleBtn="Voltar"
        isOpenedModalManagement={AlertFalse}
        handleCancel={handleBack}
        hideCloseTopButton
      />
    </>
  );
};

export default AddUser;
