import { useState } from "react";

import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { floorStore } from "@/store/floorStore";

import { parseCookie } from "@/helpers/cookies/authCookie";
import { Types } from "mongoose";
import { XIcon } from "@/assets/Icons/XIcon";
import { RightIcon } from "@/assets/Icons/RightIcon";

export const AddFloorModal = () => {
	const [floorName, setFloorName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isAccessible, setIsAccessible] = useState(1);
	const [success, setSuccess] = useState<boolean | null>(null);
	const { create } = floorStore();
	const handleSelectChange = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		setIsAccessible(Number(e.currentTarget.value));
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		(async () => {
			try {
				const user = parseCookie();
				//alterar para o id real
				const property = user?.account as Types.ObjectId ;
				const res = await create({
					name: floorName,
					account: user?.account as Types.ObjectId,
					property,
					isAccessible: isAccessible === 1 ? true : false,
				});
				if (!res.error.value) {
					setSuccess(true);
					setFloorName("");
				} else {
					setSuccess(false);
				}
			} catch {
				setSuccess(false);
			} finally {
				setIsLoading(false);
				setTimeout(() => {
					setSuccess(null);
				}, 1500);
			}
		})();
	};
	const handleAddActive = () => {
		if (floorName.length === 0) return false;
		return true;
	};
	return (
		<Modal title="ADICIONAR ANDAR" description="Cadastrar um novo andar">
			{success === null ? (
				<form
					method="post"
					className="flex flex-col gap-2"
					onSubmit={handleSubmit}
				>
					<div>
						<label htmlFor="floor_name">Nome do Andar</label>
						<Input
							type="text"
							id="floor_name"
							value={floorName}
							handleValue={(e) => setFloorName(e.target.value)}
							disabled={isLoading}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="acess">Acessível</label>
						<select
							name="acess"
							id="acess"
							className="border h-14 rounded-sm px-1"
							disabled={isLoading}
							onChange={handleSelectChange}
						>
							<option value={1}>Sim</option>
							<option value={0}>Não</option>
						</select>
					</div>
					<div className="w-full *:w-full">
						<Button
							handleActive={() => isLoading || handleAddActive()}
							isLoading={isLoading}
						>
							Adicionar
						</Button>
					</div>
				</form>
			) : success === true ? (
				<div className="flex items-center justify-center h-54 w-full flex-col">
					<div className="rounded-full bg-green-100 p-4 mb-4">
						<RightIcon className="h-10 w-10 text-green-600" />
					</div>
					<p className="font-bold">Andar adicionado com sucesso</p>
				</div>
			) : (
				<div className="flex items-center justify-center h-54 w-full flex-col">
					<div className="rounded-full bg-red-100 p-2 mb-4">
						<XIcon
							fill="red"
							width="42"
							height="42"
							className="text-2xl  h-1 w-10 text-red-600"
						/>
					</div>
					<p className="font-bold">
						Desculpa, mas não conseguimos adicionar o seu andar
					</p>
				</div>
			)}
		</Modal>
	);
};
