"use client";

import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLoginFormStore } from "@/store/loginFormStore";
import Cookies from "js-cookie";

const ConfirmLoginPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { password, email, reset } = useLoginFormStore();
	const handleSignInClick = () => {
		setIsLoading(true);
		Cookies.set("pms_token", JSON.stringify({ email, password }));
		router.push("/");
	};
	useEffect(() => {
	  if (!email)
		router.push("/login");
	}, [email, router])
	
	return (
		<section className="flex flex-col gap-8">
			<h1 className="font-bold text-2xl text-center">Hoteli Apps</h1>
			<div className="mb-2 flex flex-col gap-2">
				<Input
					className="h-12 rounded-md"
					type="email"
					value={email}
					disabled
					handleValue={(e) => {
						useLoginFormStore.setState({
							password: e.target.value,
						});
					}}
				/>
				<Input
					className="h-12 rounded-md"
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
			<div className="w-full h-12 flex justify-start flex-row-reverse">
				<Button
					width="108px"
					height="100%"
					handleClick={handleSignInClick}
					isLoading={isLoading}
					border="solid"
					className="rounded-none"
					handleActive={() => {
						return true;
					}}
				>
					Entrar
				</Button>
				<Button
					width="108px"
					height="100%"
					handleClick={() => {
						reset();
						router.back();
					}}
					border="solid"
					className="rounded-none"
					handleActive={() => {
						return true;
					}}
				>
					Cancelar
				</Button>
			</div>
		</section>
	);
};

export default ConfirmLoginPage;
