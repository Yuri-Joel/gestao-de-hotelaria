import type React from "react";
import { Button } from "@/components/Button/Button";
import { XIcon } from "@/assets/Icons/XIcon";
import { RightIcon } from "@/assets/Icons/RightIcon";

interface IAlertDialog {
  title: string;
  description?: string;
  confirmTitleBtn?: string;
  cancelTitleBtn?: string;
  isOpenedModalManagement: boolean;
  isBtnLoading?: any | boolean;
  handleConfirm?: () => void;
  handleCancel?: () => void;
  typeAlert: "confirm" | "cancel";
  hideTypeAlertIcon?: boolean;
  hideCloseTopButton?: boolean;
  modeLogout?: boolean
}

const AlertDialog: React.FC<IAlertDialog> = ({
  title,
  description,
  confirmTitleBtn,
  cancelTitleBtn,
  isOpenedModalManagement,
  handleConfirm,
  handleCancel,
  isBtnLoading = false,
  typeAlert = "cancel",
  hideTypeAlertIcon = false,
  hideCloseTopButton = true,
  modeLogout = false
}) => {

  return (
    <div
      className={`bg-gray-600/25 shadow-lg fixed top-0 left-0 right-0 bottom-0 z-[1000] ${isOpenedModalManagement ? "h-full" : "h-0 overflow-hidden"
        } flex items-center justify-center`}
    >
      <div className="w-[450px] bg-white h-auto flex flex-col p-7 gap-5">
        <div className="flex flex-col items-center relative">
          {!hideCloseTopButton && (
            <div
              className="cursor-pointer absolute right-0"
              onClick={handleCancel}
            >
              <XIcon fill="#000" />
            </div>
          )}

          {(typeAlert === "confirm" && !hideTypeAlertIcon) && (
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <RightIcon className="h-10 w-10 text-green-600" />
            </div>
          )}

          {(typeAlert === "cancel" && !hideTypeAlertIcon) && (
            <div className="rounded-full bg-red-100 p-2 mb-4">
              <XIcon
                fill="red"
                width="42"
                height="42"
                className="text-2xl  h-1 w-10 text-red-600"
              />
            </div>
          )}

          {modeLogout && (
            <div>
              <h2 className="text-lg font-semibold text-black">
                {title}
              </h2>

              {description && (
                <p className="text-md text-gray-600 ">
                  {description}
                </p>
              )}
            </div>
          )}

          {!modeLogout && (
            <>
              <h2 className="text-lg font-semibold text-black">
                {title}
              </h2>

              {description && (
                <p className="text-md text-gray-600 ">
                  {description}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col justify-end gap-2">
          {confirmTitleBtn && (
            <Button
              handleClick={handleConfirm}
              handleActive={() => true}
              isLoading={isBtnLoading}
              width="100%"
              backgroundColor={typeAlert === "confirm" ? "#5954FB" : "rgb(200 30 30)"}
            >
              {confirmTitleBtn}
            </Button>
          )}

          {(cancelTitleBtn && confirmTitleBtn) && (
            <Button
              handleClick={handleCancel}
              handleActive={() => !isBtnLoading}
              isLoading={false}
              width="100%"
              color={typeAlert === "confirm" ? "#5954fb" : "#5954fb"}
              backgroundColor="#fff"
              border={typeAlert === "confirm" ? "1px solid #5954fb" : "1px solid #5954FB"}
            >
              {cancelTitleBtn}
            </Button>
          )}

          {(cancelTitleBtn && !confirmTitleBtn) && (
            <Button
              handleClick={handleCancel}
              handleActive={() => !isBtnLoading}
              isLoading={false}
              width="100%"
              backgroundColor={"rgb(200 30 30)"}
            >
              {cancelTitleBtn}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
