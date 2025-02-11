"use client";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { isValidEmail } from "@/helpers/isValidEmail";

import { loginStore } from "@/store/loginStore";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { email, verifyUserByEmail, isValid, setEmail } = loginStore();

	const handleNextActive = () => {
		if (isValidEmail(email)) return true;
		return false;
	};

	const handleVerifyUserEmail = async () => {
		setIsLoading(true);

		try {
			const res = await verifyUserByEmail(email);

			if (res?.data?.isValid && res.data?.status === 200) {
				router.push("/login/confirm");
			} else if (res.data?.status !== 200) {
				loginStore.setState({ isValid: false });
				setIsLoading(false);
			}
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-bold text-xl">Hoteli Apps</h1>
			<div className="flex flex-col gap-2">
				<div className="font-medium text-xl">
					<h1>Iniciar sessão</h1>
				</div>

				<div className="h-24 mb-16">
					<Input
						type="email"
						placeholder="Seu email"
						className={`mb-1 ${isValid === false ? "border-red-500" : "border-inherit"}`}
						value={email}
						disabled={isLoading}
						handleValue={(e) => {
							setEmail(e.target.value);
							loginStore.setState({ isValid: null });
						}}
					/>

					{isValid === false && (
						<span className="text-red-500 text-xs flex">
							Conta não encontrada
						</span>
					)}

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
					handleClick={handleVerifyUserEmail}
					isLoading={isLoading}
					border="solid"
					className="rounded-none"
					handleActive={() => isLoading || handleNextActive()}
				>
					Avançar
				</Button>
			</div>
		</div>
	);
};

export default LoginPage;
