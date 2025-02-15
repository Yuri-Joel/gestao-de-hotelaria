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

      const res = await create({
        name: name,
        account: account,
        property: new Types.ObjectId(propetyId as string),
        isAccessible: acessible,
      });

      if (!res.error.value) {
      }
      setAlertFalse(false);
      setAlertTrue(true);
    } catch {
      setAlertFalse(true);
      setAlertTrue(false);
    } finally {
      setIsLoading(false);
      handleOpenModalNewFloor();
    }
  };

  const handleAddMoreFloor = () => {
    resetStore();
    handleOpenModalNewFloor();
    setAlertFalse(false);
    setAlertTrue(false);
  };

  const handleCancel = () => {
    handleOpenModalNewFloor();
    setAlertFalse(false);
  };

  const handleGoToFloor = () => {
    resetStore();
    setAlertTrue(false);
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        title="Cadastrar andar"
        description="Cadastrar um novo andar"
        onClose={handleOpenModalNewFloor}
        isOpen={isOpenModalNewFloor}
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
                <label>Sim</label>
                <Checkbox
                  index={1}
                  isChecked={acessible ? false : true}
                  onClick={() => setAcessible(false)}
                />
                <label>Não</label>
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
          isOpenedModalManagement={AlertTrue}
          handleConfirm={handleGoToFloor}
          handleCancel={handleAddMoreFloor}
          hideCloseTopButton
        />
        <AlertDialog
          typeAlert={"cancel"}
          title="Erro"
          description="Erro ao cadastrar um novo andar"
          cancelTitleBtn="Voltar"
          isOpenedModalManagement={AlertFalse}
          handleCancel={handleCancel}
          hideCloseTopButton
        />
    </>
  );
};
