import { formatCurrency } from "@/helpers/formatCurrency";

import { useProfileStore } from "@/store/profile/profileStore";

import { FaEnvelope, FaDollarSign, FaClock, FaPen } from "react-icons/fa";

import { WorkInfoModal } from "../workInfoModal/WorkInfoModal";
import { ActiveUser } from "../activeUser/ActiveUser";
import { PasswordModal } from "../passwordModal/PasswordModal";

const PrivacyPage = () => {
	const { selectedModal, setSelectedModal } = useProfileStore();
	const openModal = (e: React.SyntheticEvent<HTMLButtonElement>) =>
		setSelectedModal(e.currentTarget.ariaLabel as string);
	return (
		<>
			{selectedModal === "workinfo" && (
				<WorkInfoModal close={setSelectedModal} />
			)}
			{selectedModal === "password" && (
				<PasswordModal close={setSelectedModal} />
			)}
			<div className="w-full py-2 px-4">
				<ActiveUser cpf="1234567890" fullName="John Doe" />
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
						Meta salarial:{" "}
						<span className="text-black">
							{formatCurrency(100)}
						</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaDollarSign />
						Comissão: <span className="text-black">0,0%</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaDollarSign />
						Salário:{" "}
						<span className="text-black">
							{formatCurrency(100)}
						</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaClock />
						Horário do trabalho (Início):{" "}
						<span className="text-black">00:00</span>
					</p>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaClock />
						Horário do trabalho (Fim):{" "}
						<span className="text-black">00:00</span>
					</p>
				</div>
				<div className="mt-4 px-2 py-4 gap-2 flex flex-col group relative">
					<button
						className="border shadow-md h-8 w-8 rounded-[50%] items-center justify-center bg-white hover:bg-black/30 absolute top-0 right-2 hidden group-hover:flex"
						aria-label="password"
						onClick={openModal}
					>
						<FaPen />
					</button>
					<h1 className="font-bold mb-2">Senha e Email</h1>
					<p className="flex gap-2 text-gray-500 items-center">
						<FaEnvelope />
						Email:{" "}
						<span className="text-black">
							aderitocaxala.zeno@gmail.com
						</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default PrivacyPage;
