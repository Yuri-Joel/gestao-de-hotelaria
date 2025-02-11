import React, { useEffect, useState, useRef } from "react";
import { floorStore } from "@/store/floorStore";
import { FloorEntity } from "@/interfaces/FloorEntity";
import { useRouter } from "next/navigation";
import FloorEditModal from "./FloorEditModal";
import { BiChevronDown } from "react-icons/bi";
import { Button } from "../Button/Button";

function FloorDetails() {
  const [openMenuId, setOpenMenuId] = useState<boolean>(false);
  const [editedFloor, setEditedFloor] = useState<FloorEntity | null>(null);
  const menuRef2 = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { setEditFloorModal, EditFloorModal, selectedFloor } = floorStore();

  useEffect(() => {
    if (!selectedFloor) return router.push(`/hotel-ao/cadastro/andares`);
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef2.current &&
        !menuRef2.current.contains(event.target as Node)
      ) {
        setOpenMenuId(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [floor, setF] = useState<FloorEntity>();

  useEffect(() => {
    if (!selectedFloor) return;
    setF(selectedFloor);
    setEditedFloor(selectedFloor);
  }, [selectedFloor]);

  return (
    <>
      <div className="flex justify-start relative" ref={menuRef2}>
        <div
          onClick={() => setOpenMenuId(!openMenuId)}
          className="cursor-pointer flex items-center justify-between gap-2 transition-colors"
        >
          <span className="text-primary text-xl font-bold">Ações</span>
          <BiChevronDown className="text-primary h-12 w-12" />
        </div>

        {openMenuId && (
          <div className="absolute top-full w-24 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
            <div className=" bg-white" role="menu" aria-orientation="vertical">
              <Button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100"
                role="menuitem"
                handleClick={() => setEditFloorModal(true)}
                handleActive={() => true}
              >
                Editar
              </Button>
              <Button
                className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                role="menuitem"
                handleClick={() => setEditFloorModal(false)}
                handleActive={() => true}
              >
                Excluir
              </Button>
            </div>
          </div>
        )}
      </div>

      {EditFloorModal ? (
        <FloorEditModal />
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

export default FloorDetails;
