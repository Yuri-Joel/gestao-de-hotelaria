import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";
import { delay } from "@/helpers/delay";
import { modalManagementStore } from "@/store/modalManagementStore";
import { useState } from "react";

export function FormRefund() {

   const {
      isOpenedModalRefund,
      handleOpenModalRefund
    } = modalManagementStore()
  const [inputReason, setInputReason] = useState("")
  const [inputPassword, setInputPassWord] = useState("")
	const [isLoading, setIsLoading] = useState(false);

  function handleChangeReason(textInput: React.ChangeEvent<HTMLInputElement>) {
      const text = textInput.target.value.toString()
      setInputReason(text)
  }

  function handleChangePassword(textInput: React.ChangeEvent<HTMLInputElement>) {
    const text = textInput.target.value.toString()
    setInputPassWord(text)
  }

  async function handleClick(){
    setIsLoading(true)
    await delay(1000)
    setIsLoading(false)
    handleOpenModalRefund()
  }

  return(
      <Modal
        title="Autorização de Estorno"
        description="Para realizar o estorno, é necessário inserir a senha de um administrador e o motivo. Após confirmar, a ação será irreversível."
        isOpen={isOpenedModalRefund}
        onClose={handleOpenModalRefund}
      >
        <div className="flex flex-col">
          <div className="flex flex-col justify-center w-full  py-4 gap-3">
            <div className="flex flex-col border rounded-md px-2 py-1">
              <label htmlFor="" className="text-sm font-semibold text-gray-500">Motivo</label>
              <Input
                handleValue={handleChangeReason}
                value={inputReason}
                className="border-none"
              />
            </div>
            <div className="flex flex-col border rounded-md overflow-hidden px-2 py-1">
              <label htmlFor="" className="text-sm font-bold text-gray-500">Senha</label>
              <Input
                handleValue={handleChangePassword}
                value={inputPassword}
                className="border-none h-[2rem]"
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-20">
          <Button
            handleActive={() => true}
            handleClick={handleOpenModalRefund}
            className="px-10 rounded-md bg-red"
          >
            Cancelar
          </Button>
          <Button
            handleActive={() => inputPassword && inputReason ? true : false}
            handleClick={handleClick}
            isLoading={isLoading}
            className={isLoading ? "px-14 rounded-md" : "px-10 rounded-md"}
          >
            Avançar
          </Button>
          </div>
        </div>
      </Modal>
  )
}