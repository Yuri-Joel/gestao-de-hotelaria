import { formatCurrency } from "@/helpers/formatCurrency";

import { profileStore } from "@/store/profile/profileStore";

import { FaEnvelope, FaPen } from "react-icons/fa";

import { ActiveUser } from "../activeUser/ActiveUser";
import { PasswordModal } from "../passwordModal/PasswordModal";

const PrivacyPage = () => {
	const { selectedModal, setSelectedModal } = profileStore();
	const openModal = (e: React.SyntheticEvent<HTMLButtonElement>) =>
		setSelectedModal(e.currentTarget.ariaLabel as string);
	return (
		<>
			{selectedModal === "password" && (
				<PasswordModal close={setSelectedModal} />
			)}
			<div className="w-full py-2 px-4">
				<ActiveUser cpf="1234567890" fullName="John Doe" />

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
