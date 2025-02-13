import { useEffect, useState } from "react";
import { Modal } from "../../Modal/Modal";
import { Input } from "../../Input/Input";
import { Button } from "../../Button/Button";
import { floorStore } from "@/store/floorStore";
import { propertyStore } from "@/store/propertyStore";
import { parseCookie } from "@/helpers/cookies/authCookie";
import { Types } from "mongoose";
import { XIcon } from "@/assets/Icons/XIcon";
import { RightIcon } from "@/assets/Icons/RightIcon";
import Select from "../../Input/Select";

export const AddFloorModal = () => {
  const [floorName, setFloorName] = useState("1 Andar");
  const [selectedProperty, setSelectedProperty] = useState("67aae9b3952989eb54f20aef");
  const [isAccessible, setIsAccessible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { create, handleOpenModalNewFloor, isOpenModalNewFloor } = floorStore();
  const { properties } = propertyStore();

  const propertyNames = (properties || []).map((property) => JSON.stringify(property._id) || "");

  const handleNewFloor = async () => {
    setIsLoading(true);
    try {
      const user = parseCookie();
      const property = new Types.ObjectId(selectedProperty);
      const account = new Types.ObjectId(user?.account );
      
      const res = await create({
        name: floorName,
        account,
        property,
        isAccessible,
      });
      
      if (!res.error.value) {
        setSuccess(true);
        setFloorName("1 Andar");
      } else {
        setSuccess(false);
      }
    } catch {
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccess(null), 1000);
      handleOpenModalNewFloor();
    }
  };

  return (
    <Modal title="ADICIONAR ANDAR" description="Cadastrar um novo andar" onClose={handleOpenModalNewFloor} isOpen={isOpenModalNewFloor}>
      {success === null ? (
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="floor_name">Nome do Andar</label>
            <Input
              type="text"
              id="floor_name"
              value={floorName}
              handleValue={(e) => setFloorName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="font-medium text-sm text-black">Acessível</label>
            <Select
              setSelected={(value) => setIsAccessible(value === "Sim")}
              name="isAccessible"
              data={["Sim", "Não"]}
              selectedItem={isAccessible ? "Sim" : "Não"}
            />
          </div>
          <div className="hidden">
            <label htmlFor="property">Propriedade</label>
            <Select
              name="property"
              data={propertyNames}
              selectedItem={selectedProperty}
              setSelected={setSelectedProperty}
              placeholder="Selecione a propriedade"
            />
          </div>
          <div className="w-full *:w-full">
            <Button handleActive={() => floorName.length > 0} handleClick={handleNewFloor} isLoading={isLoading}>
              Adicionar
            </Button>
          </div>
        </div>
      ) : success ? (
        <div className="flex items-center justify-center h-54 w-full flex-col">
          <div className="rounded-full bg-green-100 p-4 mb-4">
            <RightIcon className="h-10 w-10 text-green-600" />
          </div>
          <p className="font-bold">Andar adicionado com sucesso</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-54 w-full flex-col">
          <div className="rounded-full bg-red-100 p-2 mb-4">
            <XIcon fill="red" width="42" height="42" className="text-2xl h-1 w-10 text-red-600" />
          </div>
          <p className="font-bold">Desculpa, mas não conseguimos adicionar o seu andar</p>
        </div>
      )}
    </Modal>
  );
};
