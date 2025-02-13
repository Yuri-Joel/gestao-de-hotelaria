"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import InputTextArea from "../Input/InputTextArea";
import { EditModal } from "../EditModal/EditModal";
import { useRouter } from "next/navigation";
import Select from "../Input/Select";
import { Checkbox } from "../Input/CheckBox";
import { floorStore } from "@/store/floorStore";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";

function FloorEditModal() {
  const [editedFloor, setEditedFloor] = useState<FloorEntity | null>(null);
  const router = useRouter();

  const { setEditFloorModal, EditFloorModal, selectedFloor } = floorStore();

  useEffect(() => {
    if (!selectedFloor) return router.push(`/hotel-ao/cadastro/andares`);
  }, [selectedFloor, router]);

  useEffect(() => {
    if (!selectedFloor) return;
    setEditedFloor(selectedFloor);
  }, [selectedFloor]);

  const handleSaveClick = () => {
    setEditFloorModal(false);
  };

  const handleCancelClick = () => {
    setEditFloorModal(false);
    if (selectedFloor) {
      setEditedFloor(selectedFloor);
    }
  };

  const renderModalContent = () => (
    <div className="space-y-2 max-h-screen ">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <Input
          handleValue={(e) =>
            setEditedFloor({
              ...editedFloor,
              title: e.target.value,
            } as FloorEntity)
          }
          type="text"
          value={editedFloor?.name || ""}
          placeholder="Identificação, ex: 'Térreo' ou 'Primeiro andar'"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Condição do andar
        </label>
        <Select
          name="Status"
          className="w-full"
          selectedItem={editedFloor?.name || ""}
          data={["Disponível", "Indisponível"]}
          setSelected={(value) =>
            setEditedFloor({ ...editedFloor, status: value } as FloorEntity)
          }
        />
      </div>

      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700 mb-3 w-full">
          Acessível
        </label>
        <div className="flex justify-start gap-8 w-full">
          <div className="flex items-center gap-2">
            <Checkbox
              index={1}
              isChecked={editedFloor?.isAccessible || false}
              onChange={() => {
                setEditedFloor({
                  ...editedFloor,
                  isAccessible: true,
                } as FloorEntity);
              }}
            />
            <span className="text-sm text-gray-600">Sim</span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              index={2}
              isChecked={editedFloor?.isAccessible || false}
              onChange={() => {
                setEditedFloor({
                  ...editedFloor,
                  isAccessible: true,
                } as FloorEntity);
              }}
            />
            <span className="text-sm text-gray-600">Não</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <InputTextArea
          handleValue={(e) =>
            setEditedFloor({
              ...editedFloor,
              description: e.target.value,
            } as FloorEntity)
          }
          value={""}
          placeholder="Adicione uma descrição para o andar"
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <>
      {EditFloorModal && (
        <EditModal
          isOpen={EditFloorModal}
          onClose={handleCancelClick}
          onSave={handleSaveClick}
          title="Editar Andar"
        >
          {renderModalContent()}
        </EditModal>
      )}
    </>
  );
}

export default FloorEditModal;
