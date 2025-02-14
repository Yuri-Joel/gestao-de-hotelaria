import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";
import { floorStore } from "@/store/floorStore";
import { floorAcordionStore } from "@/store/floorAcordionStore";
import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { Checkbox } from "@/components/Input/CheckBox";
import Cookies from "js-cookie";
import { parseCookie } from "@/helpers/cookies/authCookie";
import { Types } from "mongoose";

export const AddFloorModal = () => {
  const [AlertTrue, setAlertTrue] = useState(false);
  const [AlertFalse, setAlertFalse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { create, handleOpenModalNewFloor, isOpenModalNewFloor } = floorStore();
  const {
    acessible,
    firstStore,
    name,
    step,
    nextStep,
    resetStore,
    setAcessible,
    setName,
  } = floorAcordionStore();

  const handleNewFloor = async () => {
    setIsLoading(true);
    try {
      const user = parseCookie();
      const propetyId = Cookies.get(
        process.env.NEXT_PUBLIC_PROPERTY_ID as string
      );

      const account = user?.account;

      const res = await create({
        name: name,
        account: account,
        property: new Types.ObjectId(propetyId as string),
        isAccessible: acessible,
      });

      if (!res.error.value) {
        nextStep();
      } 
        setAlertFalse(false);
        setAlertTrue(true);
      
    } catch {
      setAlertFalse(true);
      setAlertTrue(false);
    } finally{
      setIsLoading(false);
    }
  };

    const handleAddMoreFloor = () => {
      resetStore();
      setAlertTrue(false);
    };
  
    const handleCancel = () => {
      firstStore();
      setAlertFalse(false);
    };
  
    const handleGoToFloor = () => {
  
        resetStore();
        setAlertTrue(false);
        setIsLoading(false);
        handleOpenModalNewFloor();
      }
  

  return (
    <Modal
      title="Cadastrar andar"
      description="Cadastrar um novo andar"
      onClose={handleOpenModalNewFloor}
      isOpen={isOpenModalNewFloor}
    >
      {step === "first" && (
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="floor_name">Nome</label>
            <Input
              type="text"
              placeholder="Insira o nome"
              value={name}
              handleValue={(e) => setName(e.target.value)}
              className="mt-6 w-full  outline-none border  text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 w-full">
              Acessível
            </label>
            <div className="flex justify-start gap-2 w-full items-center ">
              <Checkbox
                index={1}
                isChecked={acessible ? true : false}
                onClick={() => setAcessible(true)}
              />
              <label>Sim</label>
              <Checkbox
                index={1}
                isChecked={acessible ? false : true}
                onClick={() => setAcessible(false)}
              />
              <label>Não</label>
            </div>
          </div>
          <Button handleActive={() => name.length > 0} handleClick={nextStep}>
            Cadastrar
          </Button>
        </div>
      )}
      {step === "second" && (
        <div className="bg-white flex flex-col p-10">
          <h1 className="font-bold text-xl w-full text-center">
            Dados do Andar
          </h1>
          <span className="mt-6 w-full outline-none text-black">
            Nome: {name}
          </span>
          <span className="mt-3 w-full outline-none text-black">
            Acessibilidade: {acessible ? "Acessível" : "Não acessível"}
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
              handleClick={handleNewFloor}
              className="w-full"
            />
          </div>
        </div>
      )}
      {AlertTrue && (
        <AlertDialog
          typeAlert={"confirm"}
          title="Sucesso"
          description="Sua andar foi cadastrado com sucesso"
          confirmTitleBtn="Confirmar"
          cancelTitleBtn="Adicionar mais andares"
          isOpenedModalManagement={true}
          handleConfirm={handleGoToFloor}
          handleCancel={handleAddMoreFloor}
          hideCloseTopButton
        />
      )}
      {AlertFalse && (
        <AlertDialog
          typeAlert={"cancel"}
          title="Erro"
          description="Erro ao cadastrar uma nova propriedade"
          cancelTitleBtn="Voltar"
          isOpenedModalManagement={isOpenModalNewFloor}
          handleCancel={handleCancel}
          hideCloseTopButton
        />
      )}
    </Modal>
  );
};
