"use client";
import React, { useEffect, useState, useRef } from "react";
import { FloorEntity } from "@/interfaces/FloorEntity";
import { BiChevronDown } from "react-icons/bi";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import InputTextArea from "@/components/Input/InputTextArea";
import { floorStore } from "@/store/floorStore"

function FloorEditModal() {
  const [openMenuId, setOpenMenuId] = useState<any | null>(null);
  const [editedFloor, setEditedFloor] = useState<FloorEntity | null>(null);
  const menuRef2 = useRef<HTMLDivElement>(null);
  const { setEditFloorModal , EditFloorModal , selectedFloor } = floorStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef2.current &&
        !menuRef2.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [floor, setF] = useState<FloorEntity>();
  useEffect(() => {
    if (!selectedFloor) return;
    (() => {
      try {
        setF(selectedFloor);
        setEditedFloor(selectedFloor);
      } catch (error) {
        console.error("Erro ao buscar o andar:", error);
      }
    })();
  }, [selectedFloor]);

  const handleEditClick = () => {
    setEditFloorModal(true);
  };

  const handleSaveClick = () => {
    setEditFloorModal(false);
  };

  const handleCancelClick = () => {
    setEditFloorModal(false);
    if (floor) {
      setEditedFloor(floor);
    }
  };

  return (
          <>
            <div className="flex justify-start relative" ref={menuRef2}>
              <div
                onClick={() => {
                  setOpenMenuId(openMenuId ? null : true);
                }}
                className="cursor-pointer flex items-center justify-between gap-2 transition-colors"
              >
                <span className="text-primary text-xl font-bold">Ações</span> <BiChevronDown className="text-primary h-12 w-12" />
              </div>

              {openMenuId === true && (
                <div className="absolute top-full mt-1  w-48 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1 bg-white" role="menu" aria-orientation="vertical">
                    <Button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white  hover:bg-gray-100"
                      role="menuitem"
                      handleClick={handleEditClick}
                      handleActive={()=> true}
                    >
                      Editar
                    </Button>
                    <Button
                      className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                      role="menuitem"
                      handleClick={handleEditClick}
                      handleActive={()=> true}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              )}
            </div>
           
            {EditFloorModal ? (
               <div
               className={`bg-gray-600/25 shadow-lg fixed top-0 left-0 right-0 bottom-0 z-[1000] ${EditFloorModal ? "h-full" : "h-0 overflow-hidden"
                 } flex items-center justify-center`}
              >
              <div className="w-[600px]  bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] flex flex-col gap-3 p-4">
                <h1 className="font-bold text-2xl  w-full text-center">Editar Andar </h1>
                <div>
                  <label className="font-bold">Status</label>
                  <Input
                    value={editedFloor?.status || ""}
                    type="text"
                    handleValue={(e) => setEditedFloor({ ...editedFloor, status: e.target.value } as FloorEntity)}
                    onChange={(e) => setEditedFloor({ ...editedFloor, status: e.target.value } as FloorEntity)}
                    className="w-full "
                  />
                </div>
                <div>
                  <label className="font-bold">Nome</label>
                  <Input
                    handleValue={(e) => setEditedFloor({ ...editedFloor, title: e.target.value } as FloorEntity)}
                    type="text"
                    value={editedFloor?.title || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, title: e.target.value } as FloorEntity)}
                    className="w-full "
                  />
                </div>
                <div>
                  <label className="font-bold">Acessibilidade</label>
                  <Input
                    handleValue={(e) => setEditedFloor({ ...editedFloor, accessibility: e.target.value } as FloorEntity)}
                    type="text"
                    value={editedFloor?.accessibility || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, accessibility: e.target.value } as FloorEntity)}
                    className="w-full "
                  />
                </div>
                <div>
                  <label className="font-bold">Descrição</label>
                  <InputTextArea
                    handleValue={(e) => setEditedFloor({ ...editedFloor, description: e.target.value } as FloorEntity)}
                    value={editedFloor?.description || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, description: e.target.value } as FloorEntity)}
                    className="w-full "
                  />
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    handleActive={() => true}
                    handleClick={handleSaveClick}
                    className="px-4 bg-primary text-white rounded"
                  >
                    Salvar
                  </Button>
                  <Button
                    handleActive={() => true}
                    handleClick={handleCancelClick}
                    className="px-4 bg-gray-500 text-white rounded"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
              </div>
            ) : (
              <ul className="bg-white text-gray-900 p-4 max-w-96 shadow-md border border-gray-90">
                <li>
                  <h1 className="font-bold">Status</h1>
                  <div>{floor?.status}</div>
                </li>
                <li>
                  <h1 className="font-bold">Nome</h1>
                  <div>{floor?.title}</div>
                </li>
                <li>
                  <h1 className="font-bold">Acessibilidade</h1>
                  <div>{floor?.accessibility}</div>
                </li>
                <li>
                  <h1 className="font-bold">Descrição</h1>
                  <div>{floor?.description}</div>
                </li>
              </ul>
            )}
          </>
   
  );
}

export default FloorEditModal;