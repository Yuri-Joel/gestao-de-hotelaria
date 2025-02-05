"use client";
import AlertDialog from "@/components/alertDialog/alertDialog";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Select from "@/components/Input/Select";
import { usePropertyStore } from "@/store/propetyAcordionStorage";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const categoryItems = ["Hotel", "Pousada", "Hostel", "Outro"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isloading, setIsloading] = useState(false);

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
    setIsloading(true);
    if (name) {
      router.push("/hotel-ao/propriedades");
    } else {
      resetStore();
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetStore();
  };

  return (
    <div className="flex items-center justify-center relative">
      {step === "first" && (
        <div className="mt-10 w-[600px]  bg-white shadow-xl flex flex-col p-10">
          <h1 className="font-bold text-xl">
            Vamos cadastrar a sua propriedade?
          </h1>
          <span className="text-sm ">
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
            handleActive={() => true}
            handleClick={() => nextStep()}
            className="mt-6 w-full  text-white bg-primary"
          >
            Cadastrar
          </Button>
        </div>
      )}

      {step === "second" && (
        <div className="mt-10 w-[600px] bg-white shadow-xl flex flex-col p-10">
          <h1 className="font-bold text-xl">
            Confirme os dados da sua propriedade
          </h1>
          <span className="text-sm">
            Verifique as informações antes de continuar.
          </span>

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
          isBtnLoading={isloading}
          description={
            name
              ? "Sua propriedade foi cadastrada com sucesso"
              : "Falha ao cadastrar uma nova propriedade"
          }
          confirmTitleBtn={name ? "Ok" : "Voltar"}
          cancelTitleBtn="Voltar"
          isOpenedModalManagement={isModalOpen}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          typeAlert={name ? "Confirmar" : "Voltar"}
          mapUhTypeBg={name ? "bg-gray-200/50" : "bg-gray-200/50"}
        />
      )}
    </div>
  );
};

export default Page;
