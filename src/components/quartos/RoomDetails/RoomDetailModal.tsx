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
import { Tooltip } from "react-tooltip";
import { XIcon } from "@/assets/Icons/XIcon";
import RoomStore from "@/store/RoomStore";
import { getRoomStatus } from "../Room/Room";
import { formatDateIsoToBr } from "@/helpers/formatDateisoToBr";
import { Button } from "@/components/Button/Button";
import { RoomEntity } from "@/interfaces/RoomEntity";

export const RoomDetailModal = ({
	room
}: {
	room: RoomEntity;
}) => {
	if (!room.reserve) return

	const { handleOpenModalRoomDetails, IsOpenedModalRoomDetails, setSelectedRoom, handleIsOpenedModalNoteReserve } = RoomStore()
	const handleCopy = (e: React.SyntheticEvent<SVGElement>) => {
		(async () => {
			try {
				await navigator.clipboard.writeText(room.reserve?._id?.toString() || "");
			} catch (e) {
				console.log(e);
			}
		})();
	};

	const handleClose = () => {
		handleOpenModalRoomDetails();
		setSelectedRoom(null);
	};
	const handleOpenNote = () => {
		handleOpenModalRoomDetails();
		handleIsOpenedModalNoteReserve();
	}

	const roomStatus = getRoomStatus(room);
	return (
		<div
			className={`min-h-full w-fit fixed top-16 pb-[65px] right-1 bottom-0 flex justify-end z-[30] transition-transform duration-200 ${IsOpenedModalRoomDetails ? 'h-full scale-100 overflow-auto' : 'h-0 overflow-hidden scale-0'
				}`}
		>


			<div className="bg-white shadow-md h-full w-[22rem] border overflow-auto no-scrollbar">
				<div className={`flex ${roomStatus.bg} text-white justify-between items-center p-8`}
				>
					<h1 className="font-bold text-2xl">
						{roomStatus.text}
					</h1>
					<button
						className="w-8 h-8 rounded-[50%] bg-white border flex items-center justify-center text-black cursor-pointer"
						onClick={() => handleClose()}
					>
						<XIcon fill="black" />
					</button>
				</div>
				<div className="border-b p-8 border-b-black gap-2 flex flex-col *:text-sm">
					<div className="flex items-center gap-2">
						<FaUser />
						<h1 className="font-bold">{room.reserve?.guest.name}</h1>
					</div>
					<div className="flex items-center gap-2">
						<FaWhatsapp />
						<h1>{room.reserve?.guest?.phoneNumber}</h1>
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
								{room.reserve?.agency ? room.reserve?.agency : "Não informado"}
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
								{room.reserve?.guest.name ? room.reserve?.guest.name : "Não informado"}
							</p>
						</div>
					</div>
				</div>
				<div className="border-b p-8 border-b-black gap-2 flex flex-col *:text-sm">
					<div className="flex flex-col justify-center gap-2">
						<div className="flex items-center gap-2">
							<h1 className="font-bold">#{room.reserve?._id?.toString()}</h1>
							<FaCopy
								className="cursor-pointer outline-none w-4 h-4 transition-all duration-300 transform hover:scale-110"
								data-tooltip-id="copiar"
								data-tooltip-content="Copiar ID da reserva"
								onClick={handleCopy}
							/>
							<Tooltip id="copiar" />
						</div>
						<div>
							<p className="text-black">
								{formatDateIsoToBr(room.reserve.checkIn)} -{" "}
								{formatDateIsoToBr(room.reserve.checkOut)}
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<div className="flex items-center gap-2">
							<FaCopyright />
							<h1 className="font-bold">Referência externa</h1>
						</div>
						<div className="flex items-center gap-2">
							<h1>#{room.reserve?.externReference}</h1>
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
						<p>{formatCurrency(room.reserve?.dailyValue || 0)}</p>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DOS PRODUTOS</h1>
						<p>{formatCurrency(room.reserve?.productValue || 0)}</p>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DOS SERVIÇOS</h1>
						<p>{formatCurrency(room.reserve?.servicesValue || 0)}</p>
					</div>
					<div className="flex flex-col justify-center gap-2">
						<h1 className="font-bold">VALOR DA COBRANÇA</h1>
						<p>{formatCurrency(room.reserve?.taxValue || 0)}</p>
					</div>
				</div>
				<div className="flex justify-end w-full">
					<Button
						className="flex bg-purple-800 text-white border-l rounded-l-3xl px-4 py-3 w-[80%] self-end"
						handleActive={() => room.reserve?.note ? true : false}
						handleClick={() => handleOpenNote()}
					>
						Conferir todos os detalhes
					</Button>
				</div>
			</div>
		</div>
	);
};
