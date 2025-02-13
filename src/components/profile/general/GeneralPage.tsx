"use client";

import {
	FaPhone,
	FaEnvelope,
	FaUser,
	FaPen,
	FaDollarSign,
	FaClock,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

import { ContactModal } from "../contactModal/ContactModal";
import { AddressModal } from "../addressModal/AddressModal";
import { ActiveUser } from "../activeUser/ActiveUser";
import { WorkInfoModal } from "../workInfoModal/WorkInfoModal";

import { profileStore } from "@/store/profile/profileStore";

export const GeneralPage = () => {
	const { selectedModal, setSelectedModal, user } = profileStore();

	const openModal = (e: React.SyntheticEvent<HTMLButtonElement>) =>
		setSelectedModal(e.currentTarget.ariaLabel as string);
	return (
		<>
			{selectedModal === "workinfo" && (
				<WorkInfoModal close={setSelectedModal} />
			)}
			{selectedModal === "contact" && (
				<ContactModal close={setSelectedModal} />
			)}
			{selectedModal === "address" && (
				<AddressModal close={setSelectedModal} />
			)}
			<div className="w-full py-2 px-4">
				<ActiveUser
					cpf="-"
					fullName={
						(user?.firstName || "-") + " " + (user?.lastName || "-")
					}
				/>
				<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col group relative">
					<h1 className="font-bold mb-2">Informações Básicas</h1>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaUser />
						Nome Completo:{" "}
						<span className="text-black">
							{(user?.firstName || "-") +
								" " +
								(user?.lastName || "-")}
						</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Email:{" "}
						<span className="text-black">{user?.email || "-"}</span>
					</p>
				</div>
				<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col group relative">
					<button
						className="border shadow-md h-8 w-8 rounded-[50%] items-center justify-center bg-white hover:bg-black/30 absolute top-0 right-2 hidden group-hover:flex"
						aria-label="workinfo"
						onClick={openModal}
					>
						<FaPen />
					</button>
					<h1 className="font-bold mb-2">Informações de Trabalho</h1>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaDollarSign />
						Meta salarial: <span className="text-black">{"-"}</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaDollarSign />
						Comissão: <span className="text-black">-</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaDollarSign />
						Salário: <span className="text-black">{"-"}</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaClock />
						Horário do trabalho (Início):{" "}
						<span className="text-black">-:-</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaClock />
						Horário do trabalho (Fim):{" "}
						<span className="text-black">-:-</span>
					</p>
				</div>
				<div className="mt-4 border-b px-2 py-4 gap-2 flex flex-col relative group">
					<h1 className="font-bold mb-2">Informações de Contacto</h1>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaPhone />
						Celular:{" "}
						<span className="text-black">{user?.phone || "-"}</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaPhone />
						Celular Adicional:{" "}
						<span className="text-black">
							{user?.alternatePhone || "-"}
						</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Email:{" "}
						<span className="text-black">{user?.email || "-"}</span>
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
								Rua: <span className="text-black">-</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Bairro: <span className="text-black">-</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								CEP: <span className="text-black">-</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Cidade: <span className="text-black">-</span>
							</p>
						</div>
						<div className="flex gap-2 flex-col">
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Estado: <span className="text-black">-</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								País: <span className="text-black">-</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Número: <span className="text-black">-</span>
							</p>
							<p className="flex gap-2 text-gray-500 items-center">
								<FaEnvelope />
								Complemento:{" "}
								<span className="text-black">-</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
