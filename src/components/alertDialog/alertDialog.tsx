import type React from "react";
import { Button } from "@/components/Button/Button";
import { XIcon } from "@/assets/Icons/XIcon";
import { RightIcon } from "@/assets/Icons/RightIcon";
import { usePropertyStore } from "@/store/propetyAcordionStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IAlertDialog {
  title: string;
  cancelTitleBtn: string;
  isOpenedModalManagement: boolean;
  isBtnLoading?: any | boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  typeAlert: "Confirmar" | "Voltar";
  hideCloseButton?: boolean;
}

const AlertDialog: React.FC<IAlertDialog> = ({
  isOpenedModalManagement,
  handleCancel,
  typeAlert = "Voltar",
  hideCloseButton = false,
}) => {
  const { resetStore, firstStore } = usePropertyStore();
  const Route = useRouter();
  const [Isloading, setIsloading] = useState(false);

  const handleAddPropety = () => {
    resetStore();
  };

  const handleCheckConfirm = () => {
    setIsloading(true);
    try {
      Route.push("/hotel-ao/propriedades");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div
      className={`bg-gray-600/25 shadow-lg fixed top-0 left-0 right-0 bottom-0 z-[1000] ${
        isOpenedModalManagement ? "h-full" : "h-0 overflow-hidden"
      } flex items-center justify-center`}
    >
      <div className="w-[450px] bg-white h-auto flex flex-col p-7 gap-5">
        <div className="flex flex-col items-center relative">
          {!hideCloseButton && (
            <div
              className="cursor-pointer absolute right-0"
              onClick={handleCancel}
            >
              <XIcon fill="#000" />
            </div>
          )}

          {typeAlert === "Confirmar" ? (
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <RightIcon className="h-10 w-10 text-green-600" />
            </div>
          ) : (
            <div className="rounded-full bg-red-100 p-2 mb-4">
              <XIcon
                fill="red"
                width="42"
                height="42"
                className="text-2xl  h-1 w-10 text-red-600"
              />
            </div>
          )}
          <h2 className="text-lg font-semibold text-black">
            {typeAlert === "Confirmar" ? "Sucesso" : "Erro"}
          </h2>
          {typeAlert == "Confirmar" ? (
            <p className="text-md text-gray-600 ">
              {"Sua propriedade foi cadastrada com sucesso"}
            </p>
          ) : (
            <p className="text-md text-gray-600 ">
              {"Falha ao cadastrar uma nova propriedade"}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-end gap-2">
          <Button
            handleClick={
              typeAlert === "Confirmar"
                ? () => handleCheckConfirm()
                : () => firstStore()
            }
            handleActive={() => true}
            width="100%"
            isLoading={Isloading}
            backgroundColor={
              typeAlert === "Confirmar" ? "primary" : "rgb(200 30 30)"
            }
          >
            {typeAlert === "Confirmar" ? "Ir para propriedades" : "Voltar"}
          </Button>
          {typeAlert == "Confirmar" && (
            <Button
              handleClick={handleAddPropety}
              handleActive={() => true}
              width="100%"
              backgroundColor={
                typeAlert === "Confirmar" ? "primary" : "rgb(200 30 30)"
              }
            >
              {" Adicionar mais propriedade"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
