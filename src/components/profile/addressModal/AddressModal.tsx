import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

import { useState } from "react";

import { FaX } from "react-icons/fa6";

export const AddressModal = ({ close }: { close: (value: string) => void }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [active, setActive] = useState(false);
	const [street, setStreet] = useState("");
	const [state, setState] = useState("");
	const [nhood, setNHood] = useState("");
	const [country, setCountry] = useState("");
	const [cep, setCEP] = useState("");
	const [num, setNum] = useState("");
	const [city, setCity] = useState("");
	const [comp, setComp] = useState("");

	const dispatchCloseAction = (_e: React.SyntheticEvent<HTMLButtonElement>) =>
		close("");
	return (
		<div className="bg-black/30 fixed top-0 right-0 bottom-0 left-0 min-h-screen w-screen flex items-center justify-center z-[100]">
			<div className="bg-white w-[30rem] h-fit rounded-sm">
				<div className="border-b p-4 flex items-center justify-between h-full">
					<h1 className="font-bold text-xl">Endereço</h1>
					<button
						onClick={dispatchCloseAction}
						className="w-10 flex items-center justify-center"
					>
						<FaX />
					</button>
				</div>
				<div className="flex flex-col p-4 gap-2 w-full ">
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="rua">Rua</label>
							<Input
								type="text"
								disabled={isLoading}
								id="rua"
								value={street}
								handleValue={(e) => setStreet(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="cell_ad">Estado</label>
							<Input
								id="cell_add"
								disabled={isLoading}
								type="text"
								value={state}
								handleValue={(e) => setState(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="hood">Bairro</label>
							<Input
								type="text"
								disabled={isLoading}
								id="hood"
								value={nhood}
								handleValue={(e) => setNHood(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="country">País</label>
							<Input
								id="country"
								disabled={isLoading}
								type="text"
								value={country}
								handleValue={(e) => setCountry(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="cep">CEP</label>
							<Input
								type="text"
								isCEP
								disabled={isLoading}
								id="cep"
								value={cep}
								handleValue={(e) => setCEP(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="number">Número</label>
							<Input
								id="number"
								isNumber
								type="text"
								value={num}
								handleValue={(e) => setNum(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex gap-2 *:w-full">
						<div>
							<label htmlFor="city">Cidade</label>
							<Input
								type="text"
								id="city"
								value={city}
								handleValue={(e) => setCity(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="comp">Complemento</label>
							<Input
								id="comp"
								type="text"
								isNumber
								value={comp}
								handleValue={(e) => setComp(e.target.value)}
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
