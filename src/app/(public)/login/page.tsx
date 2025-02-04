"use client";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { isValidEmail } from "@/helpers/isValidEmail";

import { useLoginFormStore } from "@/store/loginFormStore";
import Link from "next/link";

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
	const handleNextActive = () => {
		if (isValidEmail(email)) return true;
		return false;
	}
	return (
		<section className="flex flex-col gap-4">
			<h1 className="font-bold text-xl">Hoteli Apps</h1>
			<div className="flex flex-col gap-2">
				<div className="font-medium text-xl">
					<h1>Iniciar sessão</h1>
				</div>
				<div className="h-10 mb-2">
					<Input
						className="h-10 rounded-sm"
						type="email"
						placeholder="Seu email"
						value={email}
						handleValue={(e) => {
							useLoginFormStore.setState({
								email: e.target.value,
							});
						}}
					/>
				</div>
				<Link
					href="#"
					className="text-primary hover:underline text-sm mb-16"
				>
					Esqueceu sua senha?
				</Link>
			</div>
			<div className="w-full h-10 flex justify-end">
				<Button
					width="108px"
					height="100%"
					handleClick={handleNextClick}
					isLoading={isLoading}
					border="solid"
					className="rounded-none"
					handleActive={handleNextActive}
				>
					Avançar
				</Button>
			</div>
		</section>
	);
};

export default LoginPage;
