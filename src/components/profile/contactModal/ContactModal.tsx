import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

import { FaX } from "react-icons/fa6";

export const ContactModal = ({
	close,
}: {
	close: (value: string) => void;
}) => {
	const dispatchCloseAction = (_e: React.SyntheticEvent<HTMLButtonElement>) =>
		close("");
	return (
		<div className="bg-black/30 fixed top-0 right-0 bottom-0 left-0 min-h-screen w-screen flex items-center justify-center z-[100]">
			<div className="bg-white w-[30rem] h-fit rounded-sm">
				<div className="border-b p-4 flex items-center justify-between">
					<h1 className="font-bold text-xl">
						Informações de Contacto
					</h1>
					<button onClick={dispatchCloseAction} className="w-10 flex items-center justify-center">
						<FaX />
					</button>
				</div>
				<div className="flex flex-col p-4 gap-2">
					<div>
						<label htmlFor="cell">Celular</label>
						<Input
							type="text"
							id="cell"
							isCellPhone
							value={"(99) 9999-9999"}
							handleValue={(e) => {}}
						/>
					</div>
					<div>
						<label htmlFor="cell_ad">Celular Adicional</label>
						<Input
							id="cell_add"
							type="text"
							isCellPhone
							value={"(99) 9999-9999"}
							handleValue={(e) => {}}
						/>
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
