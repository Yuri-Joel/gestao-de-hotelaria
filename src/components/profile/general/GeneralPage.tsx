"use client";

import { FaPhone, FaEnvelope, FaUser, FaPen } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

import { ContactModal } from "../contactModal/ContactModal";
import { AddressModal } from "../addressModal/AddressModal";
import { ActiveUser } from "../activeUser/ActiveUser";

import { useProfileStore } from "@/store/profile/profileStore";

export const GeneralPage = () => {
	const { selectedModal, setSelectedModal } = useProfileStore();
	const openModal = (e: React.SyntheticEvent<HTMLButtonElement>) =>
		setSelectedModal(e.currentTarget.ariaLabel as string);

	return (
		<>
			{selectedModal === "contact" && (
				<ContactModal close={setSelectedModal} />
			)}
			{selectedModal === "address" && (
				<AddressModal close={setSelectedModal} />
			)}
			<div className="w-full py-2 px-4">
				<ActiveUser cpf="1234567890" fullName="John Doe" />
				<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col group relative">
					<h1 className="font-bold mb-2">Informações Básicas</h1>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaUser />
						Nome Completo:{" "}
						<span className="text-black">Paulo Patrao</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Email:{" "}
						<span className="text-black">
							aderitocaxala.zeno@gmail.com
						</span>
					</p>
				</div>
				<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col relative group">
					<h1 className="font-bold mb-2">Informações de Contacto</h1>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaPhone />
						Celular:{" "}
						<span className="text-black">(+55) 9999-9999</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaPhone />
						Celular Adicional:{" "}
						<span className="text-black">(+55) 9999-9999</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Email:{" "}
						<span className="text-black">
							aderitocaxala.zeno@gmail.com
						</span>
					</p>
					<button
						className="border shadow-md h-8 w-8 rounded-[50%] items-center justify-center bg-white hover:bg-black/30 absolute top-0 right-2 hidden group-hover:flex"
						aria-label="contact"
						onClick={openModal}
					>
						<FaPen />
					</button>
				</div>
				<div className="mt-4 px-2 py-4 gap-2 flex flex-col group relative">
					<button
						className="border shadow-md h-8 w-8 rounded-[50%] items-center justify-center bg-white hover:bg-black/30 absolute top-0 right-2 hidden group-hover:flex"
						aria-label="address"
						onClick={openModal}
					>
						<FaPen />
					</button>
					<h1 className="font-bold mb-2">Endereço</h1>
					<div className="flex gap-8 w-full">
						<div className="flex gap-2 flex-col">
							<p className="flex gap-2 text-gray-500 items-center">
								<FaLocationPin />
								Rua:{" "}
								<span className="text-black">
									Belo Horizonte, Rio de Janeiro 290
								</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Bairro:{" "}
								<span className="text-black">
									Águas de Lindóia
								</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								CEP:{" "}
								<span className="text-black">00000-00</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Cidade:{" "}
								<span className="text-black">
									Rio de Janeiro
								</span>
							</p>
						</div>
						<div className="flex gap-2 flex-col">
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Estado:{" "}
								<span className="text-black">
									Belo Horizonte
								</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								País: <span className="text-black">Brasil</span>
							</p>
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
			</div>
		</>
	);
};
