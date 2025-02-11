import React, { ReactNode } from "react";
import { Button } from "@/components/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
  showActions?: boolean;
  saveButtonText?: string;
  cancelButtonText?: string;
}

export function EditModal({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  showActions = true,
  saveButtonText = "Salvar",
  cancelButtonText = "Cancelar",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-600/25 shadow-lg fixed top-0 left-0 right-0 bottom-0 z-[1000] flex items-center justify-center">
      <div className="w-[600px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] flex flex-col gap-3 p-4">
        <h1 className="font-bold text-2xl w-full text-center">{title}</h1>

        {children}

        {showActions && (
          <div className="flex justify-end gap-2 ">
            {onSave && (
              <Button
                handleActive={() => true}
                handleClick={onSave}
                className="px-4 bg-primary text-white rounded"
              >
                {saveButtonText}
              </Button>
            )}
            <Button
              handleActive={() => true}
              handleClick={onClose}
              className="px-4 bg-gray-500 text-white rounded"
            >
              {cancelButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
