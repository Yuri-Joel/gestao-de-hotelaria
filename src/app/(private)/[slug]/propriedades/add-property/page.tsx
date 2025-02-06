"use client";
import AlertDialog from "@/components/alertDialog/alertDialog";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Select from "@/components/Input/Select";
import { usePropertyStore } from "@/store/propetyAcordionStorage";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const categoryItems = ["Hotel", "Pousada", "Hostel", "Outro"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    name,
    category,
    step,
    setName,
    setCategory,
    nextStep,
    resetStore,
    firstStore,
  } = usePropertyStore();

  const handleConfirm = () => {
    router.push("/hotel-ao/propriedades");
    resetStore();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    firstStore();
  };
  useEffect(() => {
    resetStore();
    firstStore();
  }, [])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)] w-full ">
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
            setSelected={(e) => setCategory(e)}
          />

          <Button
            handleActive={() => category && name ? true : false}
            handleClick={() => nextStep()}
            className="mt-6 w-full  text-white bg-primary"
          >
            Cadastrar
          </Button>
        </div>
      )}

      {step === "second" && (
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
          <div className="w-full flex gap-4">
            <Button
              handleActive={() => true}
              handleClick={() => {
                firstStore();
              }}
              className="mt-6 w-full  text-white bg-gray-500"
            >
              Voltar
            </Button>
            <Button
              handleActive={() => true}
              handleClick={() => {
                nextStep();
                setIsModalOpen(true);
              }}
              className="mt-6 w-full  text-white bg-primary"
            >
              Confirmar
            </Button>
          </div>
        </div>
      )}

      {step === "validation" && (
        <AlertDialog
          title=""
          description={
            name
              ? "Sua propriedade foi cadastrada com sucesso"
              : "Falha ao cadastrar uma nova propriedade"
          }
          confirmTitleBtn={name ? "Ir para propriedades" : "Voltar"}
          cancelTitleBtn="Voltar"
          isOpenedModalManagement={isModalOpen}
          handleConfirm={handleConfirm}
          handleCancel={name ? handleCancel : () => firstStore()}
          typeAlert={(Math.random() * (1 - 0) + 0) < 0.4 ? "Confirmar" : "Voltar"}
          hideCloseButton
        />
      )}
    </div>
  );
};

export default Page;
