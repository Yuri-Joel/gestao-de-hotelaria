"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Select from "@/components/Input/Select";

import { propetyAcordionStore } from "@/store/propetyAcordionStore";
import { propertyStore } from "@/store/propertyStore";

import { EnumCategory, PropertyEntity } from "@/interfaces/EntitiesForNewAPI/PropertyEntity";

import { parseCookie } from '@/helpers/cookies/authCookie'
import { Types } from "mongoose";

const categoryItems = ["Hotel", "Pousada", "Hostel", "Outro"];

const AddPropety: React.FC = () => {
  const router = useRouter();

  const {
    name,
    category,
    step,
    setName,
    setCategory,
    nextStep,
    resetStore,
    firstStore,
  } = propetyAcordionStore();

  const {
    create,
  } = propertyStore()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMoreProperty = () => {
    resetStore();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalCancelOpen(false);
    firstStore();
  };

  const handleGoToProperties = () => {
    setIsLoading(true);

    try {
      router.push("/propriedades");
      resetStore();
      setIsModalOpen(false);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const cookieData = parseCookie();

      const payload: PropertyEntity = {
        name: name,
        category: category as EnumCategory,
        account: cookieData?.account as Types.ObjectId,
      }

      const { error } = await create(payload);

      if (!error.value) {
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsModalCancelOpen(true);
    } finally {
      setIsLoading(false);
    }

    nextStep();
  }

  useEffect(() => {
    resetStore();
    firstStore();
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)] w-full">
      {step === "first" && (
        <div className=" w-[600px]  bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] flex flex-col p-10">
          <h1 className="font-bold text-xl w-full text-center">
            Vamos cadastrar a sua propriedade?
          </h1>
          <span className="text-sm  w-full text-center">
            Informe o nome da sua propriedade e em seguida, o tipo.
          </span>

          <Input
            type="text"
            placeholder="Insira o nome"
            value={name}
            handleValue={(e) => setName(e.target.value)}
            className="mt-6 w-full  outline-none border  text-black"
          />

          <Select
            name="category"
            className=" mt-2 w-full  outline-none  "
            placeholder="Insira o tipo"
            data={categoryItems}
            selectedItem={category}
            setSelected={(e) => setCategory(e as EnumCategory)}
          />

          <Button
            handleActive={() => (category && name ? true : false)}
            handleClick={() => nextStep()}
            className="mt-6 w-full  text-white bg-primary"
          >
            Cadastrar
          </Button>
        </div>
      )}

      {(step === "second" || step === "validation") && (
        <div className=" w-[600px] shadow-[0_0_10px_rgba(0,0,0,0.3)]  bg-white flex flex-col p-10">
          <h1 className="font-bold text-xl w-full text-center">
            Dados da Propriedade
          </h1>

          <span className="mt-6 w-full outline-none  text-black">
            Nome: {name}
          </span>

          <span className="mt-3 w-full  outline-none  text-black">
            Tipo: {category}
          </span>

          <div className="w-full flex gap-4 mt-6">
            <Button
              label="Voltar"
              handleActive={() => !isLoading}
              handleClick={firstStore}
              className="w-full bg-gray-500"
            />

            <Button
              label="Confirmar"
              isLoading={isLoading}
              handleActive={() => true}
              handleClick={handleSubmit}
              className="w-full"
            />
          </div>
        </div>
      )}

      {step === "validation" && (
        <AlertDialog
          typeAlert={"confirm"}
          title="Sucesso"
          description="Sua propriedade foi cadastrada com sucesso"

          confirmTitleBtn="Ir para propriedades"
          cancelTitleBtn="Adicionar mais propriedade"

          isOpenedModalManagement={isModalOpen}
          handleConfirm={handleGoToProperties}
          handleCancel={handleAddMoreProperty}
          hideCloseTopButton
        />
      )}

      {step === "validation" && (
        <AlertDialog
          typeAlert={"cancel"}
          title="Erro"
          description="Falha ao cadastrar uma nova propriedade"

          cancelTitleBtn="Voltar"

          isOpenedModalManagement={isModalCancelOpen}
          handleCancel={handleCancel}
          hideCloseTopButton
        />
      )}
    </div>
  );
};

export default AddPropety;
