import { Box } from "./Box";


export function DetailsList() {

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
  ]
  
  return(
    <div className="flex flex-col gap-y-5">
      <Box title="Tarefas Rapidas">
        <ul className="flex flex-col gap-y-3">
          {
            tarefas.map((tarefas,index) => (
              <li className="text-md cursor-pointer" key={index}>
                {tarefas.description}
              </li>
            ))
          }
        </ul>
      </Box>

      <Box title="3 de fev de 2025 -  4 de fev de 2025">
        <div className="flex flex-col gap-y-3">
          <span>(1 diaria/s)</span>
          <h1 className="font-semibold">Quarto</h1>
          <span>101</span>
        </div>
      </Box>

      <Box title="Informações de chegada">
        <div className="flex flex-col gap-y-3">
          <span>(1 diaria/s)</span>
          <h1 className="font-semibold">Quarto</h1>
          <span>101</span>
        </div>
      </Box>
    </div>
  )

}