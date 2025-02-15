import { infoDaily, infoExpenses, infoProducts } from "@/utils/api/reserves";
import { Box } from "./Box";
import { TableDetails } from "./TableDetails/TableDetails";
import { EditIcon } from "@/assets/Icons/EditIcon";
import { useState } from "react";
import { Input } from "@/components/Input/Input";
import { RefreshIcon } from "@/assets/Icons/RefreshIcon";
import { isNumber } from "@/helpers/validateNumber";
import { removeNonNumerics } from "@/helpers/removeNonNumerics";
import { reserveStore } from "@/store/reserveStore";
import { formatDate } from "@/helpers/formatDateReserve";

const tarefas = [
  {
    description: "Imprimir essa reserva",
  },
  {
    description: "Transferir essa reserva ",
  },
  {
    description: "Lançar Produto ",
  },
  {
    description: "Lançar despesa",
  },
  {
    description: "Vincular Agêncina",
  },
  {
    description: "Vincular Empresa",
  },
  {
    description: "Check-Out",
  },
]

export function DetailsList() {
  
  const { detailsSubTotal } = reserveStore()
  const [brandInputEdit, setBrandInputEdit] = useState(false)
  const [inputValue, setInputValue] = useState("300")
  const total = detailsSubTotal.reduce((acc, curr) => acc + curr.subtotal, 0);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  //Função para formatar a data pro tipo 14 de fev de 2025
  function formattedDate(date:Date) {
    const formatteDate = date.toLocaleDateString("pt-Br", {
      day:"2-digit",
      month:"short",
      year:"numeric"

    })

    const finalDate = formatteDate
    .replace(/\./g, '') 

    return finalDate
  }
  const formattedToday = formattedDate(today);
  const formattedTomorrow = formattedDate(tomorrow);

  function handleChange(textInput: React.ChangeEvent<HTMLInputElement>) {
    const text = textInput.target.value.toString()
    const convertToNumber = removeNonNumerics(text)
    setInputValue(convertToNumber)
  }

  function handleUpdate() {
    inputValue 
    && setBrandInputEdit(false)
  }

  // Calculo das subtotais
  return(
    <div className="grid grid-cols-[23rem_auto] gap-3 w-full">
      <div id="boxes" className="flex flex-col gap-y-5 w-[23rem]">
        <Box title="Tarefas Rapidas">
          <ul className="flex flex-col gap-y-3 text-primary-700">
            {
              tarefas.map((tarefas,index) => (
                <li className="text-md cursor-pointer" key={index}>
                  {tarefas.description}
                </li>
              ))
            }
          </ul>
        </Box>

        <Box title="Nº da reserva: 411655218">
          <div className="flex flex-col gap-y-3">
            <p className="font-bold">Referência Externa</p>
            {
              !brandInputEdit ? (
                <div className="flex items-center gap-2">
                  <p>{inputValue}</p>
                  <button onClick={() => setBrandInputEdit(true)}>
                    <EditIcon/>
                  </button>
                </div>
              ) : 
              (
                <div className="flex items-center gap-2  w-[12rem]">
                  <Input 
                    type="text" 
                    className="border outline w-full h-[2rem] rounded-md"
                    value={inputValue}
                    handleValue={handleChange}
                  />
                  <button onClick={handleUpdate} className="h-[2rem] bg-primary-700 text-white px-2 rounded-md flex items-center gap-1">
                    <RefreshIcon/>Atualizar
                  </button>
                </div>
              )
            }
            <p className="font-bold">{formattedToday} -  {formattedTomorrow}</p>
            <span>(1 diaria/s)</span>
            <h1 className="font-semibold">Quarto</h1>
            <span>101</span>
          </div>
        </Box>

        <Box title="Informações de chegada" className="h-[170px] overflow-y-scroll">
          <div className="flex flex-col gap-y-3">
            <span>Hospede chega as 14:00</span>
          </div>
        </Box>
      </div>
      <div id="tables" className=" flex flex-col shadow-lg shadow-b-gray-200 py-7 gap-8">
        <TableDetails 
          rows={infoDaily}
          columns={["name","createdAt","payment"]}
          title="Informações de Diarias"
          id={1}
        />
        <TableDetails 
          rows={infoProducts}
          columns={["name","createdAt","payment"]}
          title="Informações de Produtos"
          id={2}
        />
        <TableDetails 
          rows={infoExpenses}
          columns={["name","createdAt","payment"]}
          title="Informações de Despesas"
          id={3}
        />
        <div className="mt-4 font-bold text-xl w-full flex items-center justify-end px-5 gap-5">
          <h1 className=" font-bold text-2xl">Total</h1> 
          <span className="text-red-700">{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )

}