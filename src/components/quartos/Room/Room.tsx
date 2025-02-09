import { delay } from "@/helpers/delay"
import { RoomEntity } from "@/interfaces/RoomEntity"
import RoomStore from "@/store/RoomStore"
import { useState } from "react"
import { LuBedDouble, LuBedSingle } from "react-icons/lu"

// Definir as cores e textos dos status
export const statusConfig = {
    disponivel: {
        bg: "bg-[#13973F]",
        text: "Disponível",
    },
    "sai-hoje": {
        bg: "bg-[#971313]",
        text: "Sai hoje",
    },
    vencido: {
        bg: "bg-[#D7881A]",
        text: "Vencido",
    },
    ocupado: {
        bg: "bg-[#201397]",
        text: "Ocupado",
    },
    roxo: {
        bg: "bg-[#CC01FF]",
        text: "Reservado",
    },
    interdito: {
        bg: "bg-black",
        text: "Interdito",
    }
}

export interface RoomCardProps {
    room: RoomEntity

}


export function getRoomStatus(room: RoomEntity) {

    if (room.isRestricted) {
        return statusConfig.interdito
    }
    if (!room?.reserve) {
        return statusConfig.disponivel
    }

    const today = new Date()
    const checkOutDate = new Date(room?.reserve.checkOut)
    const checkInDate = new Date(room?.reserve.checkIn)


    // Verificar se o check-out é hoje
    if (checkOutDate.toDateString() === today.toDateString()) {
        return statusConfig["sai-hoje"]
    }

    // Verificar se o hóspede deveria ter saído (check-out vencido)
    if (checkOutDate < today) {
        return statusConfig.vencido
    }

    // Verificar se o hóspede está na propriedade
    if (checkInDate <= today && checkOutDate >= today) {
        return statusConfig.ocupado
    }

    // Verificar se está reservado para o futuro
    return statusConfig.roxo
}
export function Room({ room }: RoomCardProps) {

    const { handleOpenModalRoomDetails, setSelectedRoom, selectedRoom , handleIsOpenedModalNoteReserve} = RoomStore()
    const roomStatus = getRoomStatus(room);

    const handleOpenRoomDetails = async () => {
        if (!room.reserve || room.isRestricted) return
        /* if (room.reserve?.note?.trim()) {
                handleIsOpenedModalNoteReserve()
                return
        }
 */

        if (selectedRoom === room) {
            // Caso o quarto já esteja selecionado, apenas abre o modal.
            handleOpenModalRoomDetails();
            return;
        }
        // Fecha o modal atual, se estiver aberto.
        if (selectedRoom) {
            handleOpenModalRoomDetails();
            await delay(100); // Espera um pouco para evitar sobreposição de modais.
        }
        // Atualiza o quarto selecionado e reabre o modal para o novo quarto.
        setSelectedRoom(room);
        handleOpenModalRoomDetails();
    };


    return (
        <div className={`"w-[180px] h-[12rem] bg-white rounded-lg shadow-md  transition-transform duration-200  overflow-hidden ${!room.reserve || room.isRestricted ? '' : 'cursor-pointer'}`} onClick={() => handleOpenRoomDetails()} >
            {/* Status de ocupação do quarto */}
            <div className={`${roomStatus.bg} px-4 py-2 text-white font-medium text-center`}>
                {roomStatus.text}
            </div>
            {/* Conteúdo do quarto */}
            <div className="p-4">

                <div className="text-center text-xl font-bold mb-4">{room.name}</div>

                <div className='flex justify-center items-center gap-1'>
                    <span className='flex flex-col items-center text-xs'>
                        <LuBedDouble />
                        {room.quantityBeds.double}
                    </span>
                    <span className='flex flex-col items-center text-xs'>
                        <LuBedSingle />
                        {room.quantityBeds.single}
                    </span>
                </div>
                <div
                    className={`text-center py-1 rounded ${!room.isRestricted ? room.isClean ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600" : "bg-black"}`}
                >
                    {room.isClean ? "Limpo" : "Sujo"}
                </div>
            </div>
        </div>
    )
}
