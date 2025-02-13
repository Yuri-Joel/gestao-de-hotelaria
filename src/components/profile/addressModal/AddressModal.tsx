import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

import { FaX } from "react-icons/fa6";

export const AddressModal = ({
	close,
}: {
	close: (value: string) => void;
}) => {
	const dispatchCloseAction = (_e: React.SyntheticEvent<HTMLButtonElement>) =>
		close("");
	return (
		<div className="bg-black/30 fixed top-0 right-0 bottom-0 left-0 min-h-screen w-screen flex items-center justify-center z-[100]">
			<div className="bg-white w-[30rem] h-fit rounded-sm">
				<div className="border-b p-4 flex items-center justify-between h-full">
					<h1 className="font-bold text-xl">Endereço</h1>
					<button onClick={dispatchCloseAction} className="w-10 flex items-center justify-center">
						<FaX />
					</button>
				</div>
				<div className="flex flex-col p-4 gap-2 w-full ">
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="rua">Rua</label>
							<Input
								type="text"
								id="rua"
								value={"Belo Horizonte, Rio de Janeiro 290"}
								handleValue={(e) => {}}
							/>
						</div>

						<div>
							<label htmlFor="cell_ad">Estado</label>
							<Input
								id="cell_add"
								type="text"
								isCellPhone
								value={"(99) 9999-9999"}
								handleValue={(e) => {}}
							/>
						</div>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="hood">Bairro</label>
							<Input
								type="text"
								id="hood"
								value={"Águas de Lindóia"}
								handleValue={(e) => {}}
							/>
						</div>

						<div>
							<label htmlFor="country">País</label>
							<Input
								id="country"
								type="text"
								isCellPhone
								value={"(99) 9999-9999"}
								handleValue={(e) => {}}
							/>
						</div>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="cep">CEP</label>
							<Input
								type="text"
								id="cep"
								value={"00000-00"}
								handleValue={(e) => {}}
							/>
						</div>

						<div>
							<label htmlFor="number">Número</label>
							<Input
								id="number"
								type="text"
								isCellPhone
								value={"(99) 9999-9999"}
								handleValue={(e) => {}}
							/>
						</div>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="city">Cidade</label>
							<Input
								type="text"
								id="city"
								value={"Belo Horizonte, Rio de Janeiro 290"}
								handleValue={(e) => {}}
							/>
						</div>

						<div>
							<label htmlFor="comp">Complemento</label>
							<Input
								id="comp"
								type="text"
								isCellPhone
								value={"(99) 9999-9999"}
								handleValue={(e) => {}}
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
