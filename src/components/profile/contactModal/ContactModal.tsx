import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { profileStore } from "@/store/profile/profileStore";
import { useState } from "react";

import { FaX } from "react-icons/fa6";

export const ContactModal = ({ close }: { close: (value: string) => void }) => {
	const { user } = profileStore();
	const [currentCell, setCurrentCell] = useState(user?.phone || "");
	const [alternateCell, setAlternateCell] = useState(
		user?.alternatePhone || "",
	);
	// estado para ser utilizado quando for implementado um rota para o update dos dados
	const [isLoading, setIsLoading] = useState(false);

	const handleSaveActive = () => {
		if (currentCell.length !== 0) return true;
		return false;
	};
	const dispatchCloseAction = (_e: React.SyntheticEvent<HTMLButtonElement>) =>
		close("");
	return (
		<div className="bg-black/30 fixed top-0 right-0 bottom-0 left-0 min-h-screen w-screen flex items-center justify-center z-[100]">
			<div className="bg-white w-[30rem] h-fit rounded-sm">
				<div className="border-b p-4 flex items-center justify-between">
					<h1 className="font-bold text-xl">
						Informações de Contacto
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
						<label htmlFor="cell">Celular</label>
						<Input
							type="text"
							id="cell"
							isCellPhone
							value={currentCell}
							disabled={isLoading}
							handleValue={(e) => setCurrentCell(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="cell_ad">Celular Adicional</label>
						<Input
							id="cell_add"
							type="text"
							isCellPhone
							value={alternateCell}
							disabled={isLoading}
							handleValue={(e) =>
								setAlternateCell(e.target.value)
							}
						/>
					</div>
					<div className="*:w-full">
						<Button
							handleActive={() => isLoading || handleSaveActive()}
						>
							Salvar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
