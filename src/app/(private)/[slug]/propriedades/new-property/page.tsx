"use client";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Select from "@/components/Input/Select";
import { usePropertyStore } from "@/store/propetyAcordionStorage";
import React from "react";

const page = () => {
  const categoryItems = ["Hotel", "Pousada", "Hostel", "Outro"];

  const {
    name,
    category,
    step,
    setName,
    setCategory,
    nextStep,
    resetStore,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = usePropertyStore();

  return (
    <div className="flex items-center justify-center relative">
      {step === "first" && (
        <div className="mt-10 w-[600px]  bg-white shadow-xl flex flex-col p-10">
          <h1 className="font-bold text-xl">
            Vamos cadastrar a sua propriedade?
          </h1>
          <span className="text-sm ">
            <span className="bg-primary absolute top-5 left-1/2 transform -translate-x-1/2 z-10 text-white font-bold p-4 rounded-full flex items-center justify-center text-center h-12 w-12">
              1
            </span>
            Informe o nome da sua propriedade e em seguida, o tipo.
          </span>

          <Input
            type="text"
            placeholder="Insira o nome"
            value={name}
            handleValue={(e) => setName(e.target.value)}
            className="mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black"
          />

          <Select
            name="category"
            className="cursor-pointer mt-2 w-full h-10 p-2 outline-none border rounded-sm"
            placeholder="Insira o tipo"
            data={categoryItems}
            selectedItem={category}
            setSelected={(e) => setCategory(e)}
          />

          <Button
            handleActive={() => true}
            handleClick={() => nextStep()}
            disabled={!name || !category}
            className="mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-primary disabled:opacity-50"
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
            <span className="bg-primary absolute top-5 left-1/2 transform -translate-x-1/2 z-10 text-white font-bold p-4 rounded-full flex items-center justify-center text-center h-12 w-12">
              2
            </span>
            Verifique as informações antes de continuar.
          </span>

          <span className="mt-6 w-full bg-gray-50 h-10 p-2 outline-none border rounded-sm text-black">
            {name}
          </span>

          <span className="mt-6 w-full bg-gray-50 h-10 p-2 outline-none border rounded-sm text-black">
            {category}
          </span>

          <Button
            handleActive={() => true}
            handleClick={() => nextStep()}
            className="mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-primary"
          >
            Confirmar
          </Button>
        </div>
      )}

      {step === "validation" && (
        <div className="mt-10 w-[600px] bg-white shadow-xl flex flex-col p-10">
          <h1 className="font-bold w-full text-center text-xl">
            Resultado do Cadastro
          </h1>
          <span className="bg-primary absolute top-5 left-1/2 transform -translate-x-1/2 z-10 text-white font-bold p-4 rounded-full flex items-center justify-center text-center h-12 w-12">
            3
          </span>

          {!name ? (
            <h1 className="w-full text-destructive text-center font-bold text-2xl text-red-500">
              Não foi possível cadastrar a propriedade
            </h1>
          ) : (
            <>
              <h1 className="w-full text-center font-bold text-2xl text-green-500">
                Cadastro Concluído
              </h1>
              <span className="mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black">
                Nome: {name}
              </span>
              <span className="mt-6 w-full h-10 p-2 outline-none border rounded-sm text-black">
                Categoria: {category}
              </span>
            </>
          )}

          <Button
            handleActive={() => true}
            handleClick={() => resetStore()}
            className="mt-6 w-full h-10 p-2 outline-none border rounded-md text-white bg-primary"
          >
            OK
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
