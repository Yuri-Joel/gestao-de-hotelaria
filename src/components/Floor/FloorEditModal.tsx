"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { useRouter } from "next/navigation";
import { Checkbox } from "../Input/CheckBox";
import { floorStore } from "@/store/floorStore";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";

import Cookies from "js-cookie";
import { modalManagementStore } from "@/store/modalManagementStore";

interface PropsModalEdit {
  dataTranported: FloorEntity
}
function FloorEditModal({ dataTranported }: PropsModalEdit) {
  const router = useRouter();


  const { selectedFloor, setSelectedFloor } =
    floorStore();
  const [isLoading, setIsLoading] = useState(false);
  const { handleOpenModalEditfloor, isOpenedModalEditfloor
  } = modalManagementStore();
  const [initializedForm, setInitialized] = useState({
    name: dataTranported?.name || "",
    isAccessible: dataTranported?.isAccessible
  })


  useEffect(() => {
    const slug = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_SLUG}`)

    if (!selectedFloor) return router.push(`/${slug}/cadastro/andares`);
  }, [selectedFloor, router]);

  useEffect(() => {
    if (!selectedFloor) return;
    setSelectedFloor(selectedFloor);
  }, [selectedFloor]);

  const handleSubmitEdit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleOpenModalEditfloor();
    }, 1000);
  };

  const handleCancelClick = () => {
    handleOpenModalEditfloor()
    if (selectedFloor) {
      setSelectedFloor(selectedFloor);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target

    setInitialized((prev) => (
      {
        ...prev,
        [name]: value
      }
    ));
  }
  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>,isAccessible: boolean)=>{
     setInitialized((prev)=>({
      ...prev,
      isAccessible: isAccessible
     }))
    }

  return (
    <>

      <Modal
        isOpen={isOpenedModalEditfloor}
        title="Atualizar o andar"
        description="Atualize os detalhes do andar conforme necessário."

        onClose={handleCancelClick}
      >
        <div className="space-y-6 max-h-screen">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <Input
              handleValue={handleChange}
              name="name"
              value={initializedForm.name}
              placeholder="Identificação, ex: 'Térreo' ou 'Primeiro andar'"
              className="w-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-3 w-full">
              Acessível
            </label>
            <div className="flex justify-start gap-2 w-full items-center ">
              <Checkbox
                index={1}
                name="isAcessible"
                isChecked={initializedForm.isAccessible === true? true: false}
              onClick={(e)=>handleClick(e, true)}
                             />
              <label htmlFor="radio-1">Sim</label>
              <Checkbox
                index={2}
                isChecked={initializedForm?.isAccessible === false? true: false}
                onClick={(e)=>handleClick(e, false)}
                         />
              <label className="" htmlFor="radio-2">Não</label>
            </div>
          </div>

          <div className="w-full *:w-full">
            <Button
              handleActive={() => true}
              handleClick={handleSubmitEdit}
              isLoading={isLoading}
            >
              Editar
            </Button>
          </div>
        </div>

      </Modal>
    </>
  );
}

export default FloorEditModal;
