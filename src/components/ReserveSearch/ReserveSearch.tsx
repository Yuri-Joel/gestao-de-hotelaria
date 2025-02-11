"use client"

import { useRef, useState, useEffect } from "react"
import { guests } from "../../utils/api/test-api"
import { formatDateShort } from "@/helpers/formatDateExperimental"
import reserveSearchStore from "@/store/reserveSearchStore"
import { delay } from "@/helpers/delay"
import { MagnifieIcon } from "@/assets/Icons/MagnifierIcon"
import { useRouter } from "next/navigation"
import { Skeleton } from "../Skeleton/Skeleton"

export function ReservationSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [reservations, setReservations] = useState<typeof guests>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Novo estado
    const dropdownRefReserveSearch = useRef<HTMLDivElement>(null);
    const { handleOpenReserveSearch, state } = reserveSearchStore();
    const router = useRouter();

    useEffect(() => {
        if (!state) return;

        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRefReserveSearch.current &&
                !dropdownRefReserveSearch.current.contains(event.target as Node)
            ) {
                handleOpenReserveSearch(false);
                setReservations([]);
                setHasSearched(false);
                setSearchTerm("")
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        // Remove o evento quando o dropdown é fechado
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [state]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearchTerm(search);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setHasSearched(true); // Atualiza o estado para indicar que a pesquisa foi feita

        const guestsFiltered = guests.filter(
            (guest) => guest.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        await delay();

        setReservations(guestsFiltered);
        setLoading(false);
    };

    const handleClickEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchTerm.length === 0) {
            return;
        }
        if (event.key === "Enter") {
            await handleSubmit();
        }
    };

    const handleExecute = () => {
        setSearchTerm("");
        setReservations([]);
        setHasSearched(false);
        handleOpenReserveSearch(false);
        router.push(`/hotel-ao/reservas`);
    };

    return (
        <div
            className={`fixed top-[4.3rem] right-2 w-[400px] shadow-md border border-gray-200 bg-white rounded-lg z-50
          transition-transform duration-200 ${state ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                }`}
            ref={dropdownRefReserveSearch}
        >
            {state && (
                <div className="p-4">
                    {/* Input e Botão */}
                    <div className="flex items-center border border-gray-300 focus-within:border-primary bg-gray-50 p-2 shadow-sm transition-colors">
                        <button
                            onClick={handleSubmit}
                            disabled={!searchTerm.length}
                            className="flex items-center justify-center p-2 outline-none focus:ring-0 transition-colors"
                        >
                            <MagnifieIcon
                                stroke={searchTerm.length ? "#5954FB" : "#9ca3af"}
                                height={20}
                                width={20}
                            />
                        </button>
                        <input
                            value={searchTerm}
                            onKeyDown={handleClickEnter}
                            onChange={handleChange}
                            placeholder="Buscar reservas"
                            className="flex-1 px-4 py-2 text-sm bg-transparent placeholder-gray-500 text-gray-700 border-none focus:outline-none focus:ring-0 "
                        />
                    </div>

                    {/* Loading e Resultados */}
                    <div className="mt-4">
                        {loading ? (
                            <div className="p-2 space-y-2">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="p-4 bg-white">
                                        <Skeleton className="h-6 w-3/4 mb-4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : reservations.length === 0 && !hasSearched ? (
                            // Mostra a mensagem inicial quando não há pesquisa
                            <p className="text-sm text-gray-500 mb-4">
                                Busque reservas pelo ID da reserva ou nome do hóspede
                            </p>
                        ) : reservations.length === 0 ? (
                            // Mostra a mensagem de "nenhuma reserva encontrada" após a pesquisa
                            <div className="text-sm text-gray-500">
                                Nenhuma reserva encontrada.
                            </div>
                        ) : (
                            // Exibe os resultados quando existem
                            <div className="max-h-60 overflow-y-auto border-t mt-2 pt-2">
                                {reservations.map((reservation) => (
                                    <div
                                        key={reservation.id}
                                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b text-gray-700"
                                        onClick={() => handleExecute()}
                                    >
                                        <div className="flex justify-between mb-2">
                                            <div className="text-sm font-medium">{reservation.name}</div>
                                            <div className="text-sm font-medium text-gray-500">
                                                (ID: {reservation.id})
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            CheckIn: {formatDateShort(reservation.checkin)} - CheckOut:{" "}
                                            {formatDateShort(reservation.checkout)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}


