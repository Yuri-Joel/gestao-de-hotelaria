"use client";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

import { useLoginFormStore } from "@/store/loginFormStore";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { email } = useLoginFormStore();
	const handleNextClick = () => {
		setIsLoading(true);
		router.push("/login/confirm");
	};
	return (
		<section className="flex flex-col gap-4">
			<h1 className="font-bold text-2xl text-center">Hoteli Apps</h1>
			<div className="flex flex-col gap-2 mt-4">
				<div className="font-bold text-xl">
					<h1>Iniciar sessão</h1>
				</div>
				<div className="h-12 mb-4">
					<Input
						className="h-12 rounded-md"
						type="email"
						placeholder="email"
						value={email}
						handleValue={(e) => {
							useLoginFormStore.setState({
								email: e.target.value,
							});
						}}
					/>
				</div>
			</div>
			<div className="w-full h-12 flex justify-end">
				<Button
					width="108px"
					height="100%"
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

export default LoginPage;
