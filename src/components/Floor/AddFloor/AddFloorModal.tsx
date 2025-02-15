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
import { modalManagementStore } from "@/store/modalManagementStore";

export const AddFloorModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
  const {handleOpenModalNewfloor, isOpenedModalNewfloor}= modalManagementStore()

  const { create } = floorStore();
  const {
    acessible,
    name,
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

      const {error} = await create({
        name: name,
        account: account,
        property: new Types.ObjectId(propetyId as string),
        isAccessible: acessible,
      });

      
      if (!error.value) {
        setIsModalOpen(true);
      }

    } catch {
      setIsModalCancelOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMoreFloor = () => {
    setIsModalOpen(false);
    resetStore();
    //handleOpenModalNewfloor();
    
  };

  const handleCancel = () => {
    setIsModalCancelOpen(false)    
  };

  const handleGoToFloor = () => {
    handleOpenModalNewfloor();
    resetStore();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Cadastrar andar"
        description="Cadastrar um novo andar"
        onClose={handleOpenModalNewfloor}
        isOpen={isOpenedModalNewfloor}
      >
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
              <label htmlFor="radio-1">Sim</label>
              <Checkbox
                index={2}
                isChecked={acessible ? false : true}
                onClick={() => setAcessible(false)}
              />
              <label htmlFor="radio-2">Não</label>
            </div>
          </div>
          <Button
            isLoading={isLoading}
            handleActive={() => name.length > 0}
            handleClick={handleNewFloor}
          >
            Cadastrar
          </Button>
        </div>

      </Modal>
      <AlertDialog
        typeAlert={"confirm"}
        title="Sucesso"
        description="Sua andar foi cadastrado com sucesso"
        confirmTitleBtn="Ir para andares"
        cancelTitleBtn="Adicionar mais andares"
        isOpenedModalManagement={isModalOpen}
        handleConfirm={handleGoToFloor}
        handleCancel={handleAddMoreFloor}
        hideCloseTopButton
      />
      <AlertDialog
        typeAlert={"cancel"}
        title="Erro"
        description="Erro ao cadastrar um novo andar"
        cancelTitleBtn="Voltar"
        isOpenedModalManagement={isModalCancelOpen}
        handleCancel={handleCancel}
        hideCloseTopButton
      />
    </>
  );
};
