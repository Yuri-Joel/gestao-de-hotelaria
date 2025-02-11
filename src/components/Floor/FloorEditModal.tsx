import React, { useEffect, useState, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import InputTextArea from "../Input/InputTextArea";
import { floorStore } from "@/store/floorStore";
import { FloorEntity } from "@/interfaces/FloorEntity";
import { EditModal } from "../EditModal/EditModal";
import { useRouter } from "next/navigation";

function FloorEditModal() {
  const [openMenuId, setOpenMenuId] = useState<boolean>(false);
  const [editedFloor, setEditedFloor] = useState<FloorEntity | null>(null);
  const menuRef2 = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { setEditFloorModal, EditFloorModal, selectedFloor } = floorStore();


  useEffect(() => {
    if (!selectedFloor) return router.push(`/hotel-ao/cadastro/andares`);
    function handleClickOutside(event: MouseEvent) {
      if (menuRef2.current && !menuRef2.current.contains(event.target as Node)) {
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

  const renderModalContent = () => (
    <>
      <div>
        <label className="font-bold">Status</label>
        <Input
          value={editedFloor?.status || ""}
          type="text"
          handleValue={(e) => setEditedFloor({ ...editedFloor, status: e.target.value } as FloorEntity)}
          onChange={(e) => setEditedFloor({ ...editedFloor, status: e.target.value } as FloorEntity)}
          className="w-full"
        />
      </div>
      <div>
        <label className="font-bold">Nome</label>
        <Input
          handleValue={(e) => setEditedFloor({ ...editedFloor, title: e.target.value } as FloorEntity)}
          type="text"
          value={editedFloor?.title || ""}
          onChange={(e) => setEditedFloor({ ...editedFloor, title: e.target.value } as FloorEntity)}
          className="w-full"
        />
      </div>
      <div>
        <label className="font-bold">Acessibilidade</label>
        <Input
          handleValue={(e) => setEditedFloor({ ...editedFloor, accessibility: e.target.value } as FloorEntity)}
          type="text"
          value={editedFloor?.accessibility || ""}
          onChange={(e) => setEditedFloor({ ...editedFloor, accessibility: e.target.value } as FloorEntity)}
          className="w-full"
        />
      </div>
      <div>
        <label className="font-bold">Descrição</label>
        <InputTextArea
          handleValue={(e) => setEditedFloor({ ...editedFloor, description: e.target.value } as FloorEntity)}
          value={editedFloor?.description || ""}
          onChange={(e) => setEditedFloor({ ...editedFloor, description: e.target.value } as FloorEntity)}
          className="w-full"
        />
      </div>
    </>
  );

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
          <div className="absolute top-full w-48 bg-white shadow-md border border-gray-90 rounded-lg shadow-mdring-1 ring-black ring-opacity-5 z-10">
            <div className=" bg-white" role="menu" aria-orientation="vertical">
              <Button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-white hover:bg-gray-100"
                role="menuitem"
                handleClick={handleEditClick}
                handleActive={() => true}
              >
                Editar
              </Button>
              <Button
                className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white hover:bg-gray-100"
                role="menuitem"
                handleClick={handleEditClick}
                handleActive={() => true}
              >
                Excluir
              </Button>
            </div>
          </div>
        )}
      </div>

      {EditFloorModal ? (
        <EditModal
          isOpen={EditFloorModal}
          onClose={handleCancelClick}
          onSave={handleSaveClick}
          title="Editar Andar"
        >
          {renderModalContent()}
        </EditModal>
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