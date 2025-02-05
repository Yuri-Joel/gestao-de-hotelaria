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
	const [isInvalidEmail, setIsInvalidEmail] = useState(false);
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
				<div className="h-24 mb-9">
					<Input
						type="email"
						placeholder="Seu email"
						className={`mb-1 ${isInvalidEmail ? "border-red-500" : "border-inherit"}`}
						value={email}
						handleValue={(e) => {
							useLoginFormStore.setState({
								email: e.target.value,
							});
							if (isInvalidEmail) setIsInvalidEmail(false);
						}}
					/>
					{isInvalidEmail && 
						(
							<span className="text-red-500 text-xs flex">Conta não encontrada</span>
						)
					}
					<Link
						href="#"
						className="text-primary hover:underline text-sm inline-flex"
					>
						Esqueceu sua senha?
					</Link>
				</div>
			</div>
			<div className="w-full h-10 flex justify-end">
				<Button
					width="120px"
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
