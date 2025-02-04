"use client"

import { useEffect, useRef, useState } from "react"
import { guests } from "../Home/test-api"
import { formatDateShort } from "@/helpers/formatDateExperimental"
import ReserveSearchStore from "@/store/ReserveSearchStore"
import { delay } from "@/helpers/delay"
import { MagnifieIcon } from "@/assets/Icons/MagnifierIcon"
import { useRouter } from "next/navigation"



// Tipo para as reservas
type Reservation = {
    id: number
    name: string
    checkin: Date
    checkout: Date
    state: string
}

export function ReservationSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { handleOpenReserveSearch, state } = ReserveSearchStore()
    const router = useRouter();
    /* 
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            handleOpenReserveSearch(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }, []) */

    // Simula busca na API - substitua pela sua chamada real
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value
        setSearchTerm(search)
    }

    const handleSubmit = async () => {
        setLoading(true);

        const guestsFiltered = guests.filter(
            (guest) =>
                guest.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        await delay()

        setReservations(guestsFiltered)
        setLoading(false)
    }

    const handleExecute = () => {
        setSearchTerm("");
        setReservations([])
        handleOpenReserveSearch(false);
        router.push(`/hotel-ao/reservas`);
    }
    return (
        <div className="fixed top-36 right-10 w-[350px] shadow-md  border-gray-300 bg-white rounded-lg z-50"
            ref={dropdownRef}>

            {/* Dropdown  */}
            {state && (
                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10">
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
                        {/* Input para buscar reservas */}
                        <input
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="Buscar reservas"
                            className="flex-1 p-2 text-sm border-none focus:outline-none focus:ring-0"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={searchTerm.length > 0 ? false : true}
                            className="flex items-center justify-center p-2 bg-primary text-white rounded-md hover:bg-primary-600 focus:ring-2 focus:ring-primary-300 disabled:bg-gray-400"
                        >
                            <MagnifieIcon stroke="white" height={20} width={20} />
                        </button>
                    </div>
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Buscando reservas...</div>
                    ) : reservations.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Nenhuma reserva encontrada.</div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto">
                            {reservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="px-4 py-4 hover:bg-[#D5CEE5] cursor-pointer border-b text-black"
                                    onClick={() => handleExecute()}
                                >
                                    <div className="flex justify-between mb-3">
                                        <div className="text-sm font-medium">{reservation.name}</div>
                                        <div className="text-sm font-medium">(ID: {reservation.id})</div>

                                    </div>
                                    <div className="text-xs">
                                        CheckIn: {formatDateShort(reservation.checkin)} - CheckOut: {formatDateShort(reservation.checkout)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

