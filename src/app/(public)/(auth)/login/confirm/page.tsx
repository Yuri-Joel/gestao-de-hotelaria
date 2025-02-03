"use client";

import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLoginFormStore } from "@/store/loginFormStore";

const ConfirmLoginPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { password, email } = useLoginFormStore();
	const handleNextClick = () => {
		setIsLoading(true);
		router.push("/login/confirm");
	};
	return (
		<section className="flex flex-col gap-4">
			<h1 className="font-bold text-xl">Hoteli Apps</h1>
			<div>
				<h1>{email}</h1>
			</div>
			<div>
				<Input
					className="h-12 rounded-none"
					type="password"
					placeholder="Senha"
					value={password}
					handleValue={(e) => {
						useLoginFormStore.setState({
							password: e.target.value,
						});
					}}
				/>
			</div>
			<div className="w-full h-12 flex justify-end">
				<Button
					width="108px"
					height="100%"
					toolTipTitle="Acessar a sua conta"
					handleClick={handleNextClick}
					isLoading={isLoading}
					border="solid"
					className="rounded-none"
					handleActive={() => {
						return true;
					}}
				>
					Avançar
				</Button>
			</div>
		</section>
	);
};

export default ConfirmLoginPage;
