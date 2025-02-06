import { IRoomDetail } from "@/interfaces/IRoomDetail";
import {
	FaX,
	FaUser,
	FaWhatsapp,
	FaHouse,
	FaCopyright,
	FaCopy,
	FaArrowRight,
} from "react-icons/fa6";
import { formatCurrency } from "@/helpers/formatCurrency";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { Dispatch, SetStateAction } from "react";

export const RoomDetailModal = ({
	room,
	close,
}: {
	room: IRoomDetail;
	close: Dispatch<SetStateAction<boolean>>;
}) => {
	const states = [
		{
			bg: "bg-[#971313]",
			title: "Sai hoje",
		},
		{
			bg: "bg-[#D7881A]",
			title: "Vencido",
		},
		{
			bg: "bg-[#201397]",
			title: "Ocupado",
		},
		{
			bg: "bg-[#CC01FF]",
			title: "Reservado",
		},
	];
	const handleCopy = (e: React.SyntheticEvent<SVGElement>) => {
		(async () => {
			try {
				await window.navigator.clipboard.writeText(room.reserveId);
			} catch (e) {
				console.log(e);
			}
		})();
	};
	const handleClose = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		close(false);
	};
	return (
		<div className="pt-[65px] min-h-screen w-fit fixed top-0 right-0 bottom-0 flex justify-end z-[100]">
			<div className="bg-white shadow-[0px_4px_4px_5px_rgba(0,0,0,0.4)] h-full w-[22rem] border overflow-auto no-scrollbar">
				<div
					className={`flex ${states[room.stateId].bg} text-white justify-between items-center p-8`}
				>
					<h1 className="font-bold text-2xl">
						{states[room.stateId].title}
					</h1>
					<button
						className=" w-8 h-8 rounded-[50%] flex items-center justify-center text-white cursor-pointer"
						onClick={handleClose}
					>
						<FaX />
					</button>
				</div>
				<div className="border-b p-8 border-b-black gap-2 flex flex-col *:text-sm">
					<div className="flex items-center gap-2">
						<FaUser />
						<h1 className="font-bold">{room.userFullName}</h1>
					</div>
					<div className="flex items-center gap-2">
						<FaWhatsapp />
						<h1>{room.userCellNumber}</h1>
					</div>
				</div>
				<div className="border-b p-8 border-b-black gap-2 flex flex-col *:text-sm">
					<div className="flex flex-col justify-center gap-2">
						<div className="flex items-center gap-2">
							<FaHouse />
							<h1 className="font-bold">Agência</h1>
						</div>
						<div className="pl-6">
							<p className="text-black">
								{room.agency ? room.agency : "Não informado"}
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<div className="flex items-center gap-2">
							<FaCopyright />
							<h1 className="font-bold">Cliente</h1>
						</div>
						<div className="pl-6">
							<p className="text-black">
								{room.client ? room.client : "Não informado"}
							</p>
						</div>
					</div>
				</div>
				<div className="border-b p-8 border-b-black gap-2 flex flex-col *:text-sm">
					<div className="flex flex-col justify-center gap-2">
						<div className="flex items-center gap-2">
							<h1 className="font-bold">#{room.reserveId}</h1>
							<FaCopy
								className="cursor-pointer"
								data-tooltip-id="copiar"
								data-tooltip-content="Copiar ID da reserva"
								onClick={handleCopy}
							/>
							<Tooltip id="copiar" />
						</div>
						<div>
							<p className="text-black">
								{room.createdAt.toLocaleDateString("pt-BR")} -{" "}
								{room.updatedAt.toLocaleDateString("pt-BR")}
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<div className="flex items-center gap-2">
							<FaCopyright />
							<h1 className="font-bold">Referência externa</h1>
						</div>
						<div className="flex items-center gap-2">
							<h1>#{room.externReference}</h1>
							<FaArrowRight
								className="cursor-pointer"
								data-tooltip-id="ref"
								data-tooltip-content="Atualizar a Referência Externa"
							/>
							<Tooltip id="ref" />
						</div>
					</div>
				</div>
				<div className="p-8 gap-2 flex flex-col *:text-sm">
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DA DIÁRIA</h1>
						<p>{formatCurrency(room.dailyValue)}</p>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DOS PRODUTOS</h1>
						<p>{formatCurrency(room.productValue)}</p>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DOS SERVIÇOS</h1>
						<p>{formatCurrency(room.servicesValue)}</p>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DA COBRANÇA</h1>
						<p>{formatCurrency(room.taxValue)}</p>
					</div>
				</div>
				<div className="flex justify-end w-full">
					<Link
						className="flex bg-purple-800 text-white border-l rounded-l-3xl px-4 py-3 w-[80%] self-end"
						href={"#"}
					>
						Conferir todos os detalhes
					</Link>
				</div>
			</div>
		</div>
	);
};
