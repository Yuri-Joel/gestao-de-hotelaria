"use client";
import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "@/components/Wrapper";
import { floorStore } from "@/store/floorStore";
import { FloorEntity } from "@/interfaces/FloorEntity";
import { BiChevronDown } from "react-icons/bi";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import InputTextArea from "@/components/Input/InputTextArea";

function page() {
  const [openMenuId, setOpenMenuId] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFloor, setEditedFloor] = useState<FloorEntity | null>(null);
  const menuRef2 = useRef<HTMLDivElement>(null);

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
  const { selectedFloor } = floorStore();
  const [floor, setF] = useState<FloorEntity>();
  useEffect(() => {
    if (!selectedFloor) return;
    (() => {
      try {
        setF(selectedFloor);
        setEditedFloor(selectedFloor);
      } catch (error) {
        console.error("Erro ao buscar andares:", error);
      }
    })();
  }, [selectedFloor]);

  const handleEditClick = () => {
    setIsEditing(true);
    setOpenMenuId(null);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (floor) {
      setEditedFloor(floor);
    }
  };

  return (
    <div className="p-8">
      <Wrapper
        key={"3"}
        title="Andar - INFORMAÇÕES"
        description="Informacoes gerais do andar"
        children={
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
                <div className="absolute top-full mt-1 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
            {isEditing ? (
              <div className="bg-white  text-gray-900 p-4 max-w-96 shadow-md border border-gray-90">
                <div>
                  <label className="font-bold">Status</label>
                  <Input
                    value={floor?.status || ""}
                    type="text"
                    handleValue={()=> floor?.status || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, status: e.target.value } as FloorEntity)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold">Nome</label>
                  <Input
                    handleValue={()=> floor?.title || ""}
                    type="text"
                    value={floor?.title || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, title: e.target.value } as FloorEntity)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold">Acessibilidade</label>
                  <Input
                    handleValue={()=> floor?.accessibility || ""}
                    type="text"
                    value={floor?.accessibility || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, accessibility: e.target.value } as FloorEntity)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold">Descrição</label>
                  <InputTextArea
                    handleValue={()=> floor?.description || ""}
                    value={floor?.description || ""}
                    onChange={(e) => setEditedFloor({ ...editedFloor, description: e.target.value } as FloorEntity)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    handleActive={()=> true}
                    handleClick={handleSaveClick}
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Salvar
                  </Button>
                  <Button
                    handleActive={()=> true}
                    handleClick={handleCancelClick}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="bg-white  text-gray-900 p-4 max-w-96 shadow-md border border-gray-90">
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
        }
      ></Wrapper>
    </div>
  );
}

export default page;