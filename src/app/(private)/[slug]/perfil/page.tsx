"use client";

import { formatCpf } from "@/helpers/formatCPF";

import { UserCircleIcon } from "@/assets/Icons/UserIcon";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const MainProfilePage = () => {
	return (
		<div className="w-full py-2">
			<div className="flex gap-1">
				<div className="h-full flex items-center justify-center">
					<UserCircleIcon width={80} height={80} />
				</div>
				<div className="flex flex-col justify-center">
					<h1 className="font-bold">John Doe</h1>
					<p>{formatCpf("12345678901")}</p>
				</div>
			</div>
			<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col">
				<h1 className="font-bold mb-2">Dados Pessoais</h1>
				<p className="flex gap-2 text-gray-500 items-center">
					<FaPhone />
					Nome Completo: <span className="text-black">Paulo Patrao</span>
				</p>
				<p className="flex gap-2 text-gray-500 items-center">
					<FaEnvelope />
					Email:{" "}
					<span className="text-black">
						aderitocaxala.zeno@gmail.com
					</span>
				</p>
			</div>
			<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col">
				<h1 className="font-bold mb-2">Contacto</h1>
				<p className="flex gap-2 text-gray-500 items-center">
					<FaPhone />
					Celular: <span className="text-black">(+55) 9999-9999</span>
				</p>
				<p className="flex gap-2 text-gray-500 items-center">
					<FaPhone />
					Celular Adicional: <span className="text-black">(+55) 9999-9999</span>
				</p>
				<p className="flex gap-2 text-gray-500 items-center">
					<FaEnvelope />
					Email:{" "}
					<span className="text-black">
						aderitocaxala.zeno@gmail.com
					</span>
				</p>
			</div>
			<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col">
				<h1 className="font-bold mb-2">Endereço</h1>
				<div className="flex gap-20">
					<p className="flex gap-2 text-gray-500 items-center">
						<FaPhone />
						Rua:{" "}
						<span className="text-black">
							Belo Horizonte, Rio de Janeiro 290
						</span>
					</p>

					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						CEP: <span className="text-black">00000-00</span>
					</p>
				</div>
				<div className="flex gap-[200px]">
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Bairro:{" "}
						<span className="text-black">Águas de Lindóia</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Cidade:{" "}
						<span className="text-black">Rio de Janeiro</span>
					</p>
				</div>
				<div className="flex gap-[214px]">
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Estado:{" "}
						<span className="text-black">Belo Horizonte</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						País:{" "}
						<span className="text-black">Brasil</span>
					</p>
				</div>
				<div className="flex gap-[252px]">
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Número:{" "}
						<span className="text-black">1939293</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Complemento:{" "}
						<span className="text-black">102938323</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default MainProfilePage;
