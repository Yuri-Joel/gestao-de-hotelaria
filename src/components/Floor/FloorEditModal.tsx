"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { useRouter } from "next/navigation";
import { floorStore } from "@/store/floorStore";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import Select from "../Input/Select";

function FloorEditModal() {
  const router = useRouter();

  const { setEditFloorModal, EditFloorModal, selectedFloor, setSelectedFloor } =
    floorStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedFloor) return router.push(`/hotel-ao/cadastro/andares`);
  }, [selectedFloor, router]);

  useEffect(() => {
    if (!selectedFloor) return;
    setSelectedFloor(selectedFloor);
  }, [selectedFloor]);

  const handleSaveClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEditFloorModal(false);
    }, 1000);
  };

  const handleCancelClick = () => {
    setEditFloorModal(false);
    if (selectedFloor) {
      setSelectedFloor(selectedFloor);
    }
  };

  const renderModalContent = () => (
    <div className="space-y-6 max-h-screen">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <Input
          handleValue={() => selectedFloor?.name}
          onChange={(e) =>
            setSelectedFloor({
              ...selectedFloor,
              name: e.target.value,
            } as FloorEntity)
          }
          type="text"
          value={selectedFloor?.name || ""}
          placeholder="Identificação, ex: 'Térreo' ou 'Primeiro andar'"
          className="w-full"
        />
      </div>

      <div className="flex flex-col items-center">
       
        <div className="w-full">
            <label className="font-medium text-sm text-black">Acessível</label>
            <Select
              setSelected={(value) => setSelectedFloor({
                ...selectedFloor,
                isAccessible: value === "Sim"
              } as FloorEntity)}
              name="isAccessible"
              data={["Sim", "Não"]}
              selectedItem={selectedFloor?.isAccessible ? "Sim" : "Não"}
            />
        </div>
      </div>

      <div className="w-full *:w-full">
        <Button
          handleActive={() => true}
          handleClick={handleSaveClick}
          isLoading={isLoading}
        >
          Editar
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {EditFloorModal && (
        <Modal
          isOpen={EditFloorModal}
          description={"Editar o andar selecionado"}
          onClose={handleCancelClick}
          title={"EDITAR ANDAR"}
          children={renderModalContent()}
        />
      )}
    </>
  );
}

export default FloorEditModal;
