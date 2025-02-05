import type React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/Button/Button";
import { XIcon } from "@/assets/Icons/XIcon";

interface IAlertDialog {
  title: string;
  description: string;
  confirmTitleBtn: string;
  cancelTitleBtn: string;
  isOpenedModalManagement: boolean;
  isBtnLoading?: any | boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  typeAlert: "Confirmar" | "Voltar";
  mapUhTypeBg?: string;
}

const AlertDialog: React.FC<IAlertDialog> = ({
  description,
  confirmTitleBtn,
  isOpenedModalManagement,
  handleConfirm,
  handleCancel,
  typeAlert = "Voltar",
  mapUhTypeBg,
}) => {
  return (
    <div
      className={`${mapUhTypeBg ? mapUhTypeBg : "bg-gray-600/25"} shadow-lg fixed top-0 left-0 right-0 bottom-0 z-[1000] ${
        isOpenedModalManagement ? "h-full" : "h-0 overflow-hidden"
      } flex items-center justify-center`}
    >
      <div className="w-[450px] bg-white h-auto flex flex-col p-7 gap-5">
        <div className="flex flex-col items-center relative">
          <div
            className="cursor-pointer absolute right-0"
            onClick={handleCancel}
          >
            <XIcon
              fill="#000"
            />
          </div>
          {typeAlert === "Confirmar" ? (
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
          ) : (
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <X className="h-10 w-10 text-red-600" />
            </div>
          )}
          <h2 className="text-lg font-semibold text-black">
            {typeAlert === "Confirmar" ? "Sucesso" : "Erro"}
          </h2>
          {description && (
            <p className="text-md text-gray-600 ">{description}</p>
          )}
        </div>

        <div className="flex flex-col justify-end gap-2">
          <Button
            handleClick={() => handleConfirm()}
            handleActive={() => true}
            width="100%"
            backgroundColor={
              typeAlert === "Confirmar" ? "primary" : "rgb(200 30 30)"
            }
          >
            {confirmTitleBtn}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
