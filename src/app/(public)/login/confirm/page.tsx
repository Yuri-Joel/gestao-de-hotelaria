"use client";

import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import { useLoginFormStore } from "@/store/loginFormStore";

const ConfirmLoginPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState(false);
	const { password, email } = useLoginFormStore();

	const handleSignInClick = () => {
		setIsLoading(true);
		Cookies.set(`${process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME}`, JSON.stringify({ email, password }));
		router.push("/");
	};

	const handleSignInActive = () => {
		if (password.length > 0) return true;
		return false;
	};

	const handleReturnActive = () => {
		if (isLoading) return false;
		return true;
	};

	const handleReturnClick = () => {
		router.push("/login");
	};

	useEffect(() => {
		if (!email) router.push("/login");
	}, [email, router]);

	return (
		<section className="flex flex-col">
			<div>
				<h1 className="font-bold text-xl">Hoteli Apps</h1>
				<p className="text-gray-300 text-sm">Entrar como:</p>
			</div>
			<div className="items-center mb-2">
				<h1>{email}</h1>
			</div>
			<h2 className="font-medium text-xl">Insira a sua senha</h2>
			<div className="h-24 mb-8">
				<Input
					className={`mb-1 ${isInvalidPassword ? "border-red-500" : "border-inherit"}`}
					type="password"
					placeholder="Sua senha"
					value={password}
					handleValue={(e) => {
						useLoginFormStore.setState({
							password: e.target.value,
						});
						if (isInvalidPassword) setIsInvalidPassword(false);
					}}
				/>
				{isInvalidPassword && (
					<span className="text-red-500 text-xs flex">
						Senha inválida
					</span>
				)}
				<Link
					href="#"
					className="text-primary hover:underline text-sm  inline-flex"
				>
					Esqueceu a sua senha?
				</Link>
			</div>
			<div className="w-full h-10 flex justify-start flex-row-reverse">
				<Button
					width="108px"
					handleClick={handleSignInClick}
					isLoading={isLoading}
					border="solid"
					className="rounded-none"
					handleActive={handleSignInActive}
				>
					Entrar
				</Button>
				<Button
					width="108px"
					handleClick={handleReturnClick}
					border="solid"
					className="rounded-none"
					handleActive={handleReturnActive}
				>
					Voltar
				</Button>
			</div>
		</section>
	);
};

export default ConfirmLoginPage;
