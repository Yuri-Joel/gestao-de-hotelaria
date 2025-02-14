import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { delay } from "@/helpers/delay";
import { reserveStore } from "@/store/reserveStore";
import { useState } from "react";

export function FormRefund() {

  const { handleOpenModalRefund } = reserveStore()
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
    <div className="inset-0 fixed bg-gray/20 z-50 visible opacity-100 flex items-center justify-center">
      <div className="bg-white w-[678px] py-5 rounded-md">
        <div className="flex flex-col px-5 gap-2">
          <h1 className="font-bold text-2xl">Autorização de Estorno</h1>
          <p className="w-[80%] text-gray-500 ml-2 text-sm">Para realizar o estorno, é necessário inserir a senha de um administrador e o motivo. Após confirmar, a ação será irreversível.</p>
        </div>

        <div className="flex flex-col justify-center w-full px-20 py-4 gap-3">
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
    </div>
  )
}