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
	const { password, email, reset } = useLoginFormStore();
	const handleSignInClick = () => {
		setIsLoading(true);
		Cookies.set("pms_token", JSON.stringify({ email, password }));
		router.push("/");
	};
	const handleSignInActive = () => {
		if (password.length > 0) return true;
		return false;
	}
	const handleReturnActive = () => {
		return true;
	}
	useEffect(() => {
		if (!email) router.push("/login");
	}, [email, router]);

	return (
		<section className="flex flex-col gap-2">
			<h1 className="font-bold text-xl">Hoteli Apps</h1>
			<div className="flex gap-2 items-center my-2">
				<h1>{email}</h1>
			</div>
			<h2 className="font-medium text-xl">Insira a sua senha</h2>
			<div className="flex flex-col gap-2">
				<Input
					className="h-10 rounded-sm"
					type="password"
					placeholder="Sua senha"
					value={password}
					handleValue={(e) => {
						useLoginFormStore.setState({
							password: e.target.value,
						});
					}}
				/>
			</div>
			<div className="mb-8">
				<Link href="#" className="text-primary hover:underline text-sm">
					Esqueceu a sua senha?
				</Link>
			</div>
			<div className="w-full h-10 flex justify-start flex-row-reverse">
				<Button
					width="108px"
					height="100%"
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
					height="100%"
					handleClick={() => {
						router.back();
						reset();
					}}
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
