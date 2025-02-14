import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

import { useRef, useState } from "react";
import { FaX } from "react-icons/fa6";

export const WorkInfoModal = ({
	close,
}: {
	close: (value: string) => void;
}) => {
	// estado para ser utilizado quando for implementado um rota para o update dos dados
	const [isLoading, setIsLoading] = useState(false);
	const [meta, setMeta] = useState("");
	const [comission, setComission] = useState("");
	const [salary, setSalary] = useState("");
	const [initialTime, setInitialTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const dispatchCloseAction = (_e: React.SyntheticEvent<HTMLButtonElement>) =>
		close("");
	return (
		<div className="bg-black/30 fixed top-0 right-0 bottom-0 left-0 min-h-screen w-screen flex items-center justify-center z-[100]">
			<div className="bg-white w-[30rem] h-fit rounded-sm">
				<div className="border-b p-4 flex items-center justify-between h-full">
					<h1 className="font-bold text-xl">
						Informações do trabalho
					</h1>
					<button
						onClick={dispatchCloseAction}
						className="w-10 flex items-center justify-center"
					>
						<FaX />
					</button>
				</div>
				<div className="flex flex-col p-4 gap-2">
					<div>
						<label htmlFor="meta">Meta Salarial</label>
						<Input
							type="text"
							id="meta"
							isNumber
							value={meta}
							disabled={isLoading}
							handleValue={(e) => {
								setMeta(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="comissao">Comissão</label>
						<Input
							type="text"
							id="comissao"
							disabled={isLoading}
							isNumber
							value={comission}
							handleValue={(e) => {
								setComission(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="salario">Salário</label>
						<Input
							type="text"
							id="salario"
							value={salary}
							disabled={isLoading}
							isNumber
							handleValue={(e) => {
								setSalary(e.target.value);
							}}
						/>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="horario_i">
								Horário do trabalho (Início)
							</label>
							<Input
								type="text"
								id="horario_i"
								disabled={isLoading}
								isTime
								value={initialTime}
								handleValue={(e) => {
									setInitialTime(e.target.value);
								}}
							/>
						</div>

						<div>
							<label htmlFor="horario_f">
								Horário do trabalho (Fim)
							</label>
							<Input
								id="horario_f"
								type="text"
								disabled={isLoading}
								isTime
								value={endTime}
								handleValue={(e) => {
									setEndTime(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="*:w-full">
						<Button
							handleActive={() => {
								return true;
							}}
						>
							Salvar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
