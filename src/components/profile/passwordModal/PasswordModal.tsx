import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useState } from "react";

import { FaX } from "react-icons/fa6";

export const PasswordModal = ({
	close,
}: {
	close: (value: string) => void;
}) => {
	// estado para ser utilizado quando for implementado um rota para o update dos dados
	const [isLoading, setIsLoading] = useState(false);

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleSaveActive = () => {
		if (
			currentPassword.length !== 0 &&
			newPassword.length !== 0 &&
			confirmPassword.length !== 0
		)
			return true;
		return false;
	};
	const dispatchCloseAction = (_e: React.SyntheticEvent<HTMLButtonElement>) =>
		close("");
	return (
		<div className="bg-black/30 fixed top-0 right-0 bottom-0 left-0 min-h-screen w-screen flex items-center justify-center z-[100]">
			<div className="bg-white w-[30rem] h-fit rounded-sm">
				<div className="border-b p-4 flex items-center justify-between">
					<h1 className="font-bold text-xl">Senha e Email</h1>
					<button
						onClick={dispatchCloseAction}
						className="w-10 flex items-center justify-center"
					>
						<FaX />
					</button>
				</div>
				<div className="flex flex-col p-4 gap-2">
					<div>
						<label htmlFor="senha_atual">*Senha Atual</label>
						<Input
							type="password"
							id="senha_atual"
							disabled={isLoading}
							value={currentPassword}
							handleValue={(e) =>
								setCurrentPassword(e.target.value)
							}
						/>
					</div>
					<div>
						<label htmlFor="new_senha">*Nova Senha</label>
						<Input
							type="password"
							id="new_senha"
							disabled={isLoading}
							value={newPassword}
							handleValue={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="confirm_new_senha">
							*Confirmar Nova Senha
						</label>
						<Input
							type="password"
							id="confirm_new_senha"
							value={confirmPassword}
							disabled={isLoading}
							handleValue={(e) =>
								setConfirmPassword(e.target.value)
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
