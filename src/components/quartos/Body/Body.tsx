"use client";

import { Wrapper } from "@/components/Wrapper";
import { useEffect, useState } from "react";
import { floorStore } from "@/store/flooorStore";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { TTabNavigation } from "@/types/TTabNavigation";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Room } from "../Room/Room";
import { Button } from "@/components/Button/Button";
import { FaInfo } from "react-icons/fa";
import RoomStore from "@/store/RoomStore";
import { InfoModal } from "../InfoModal/InfoModal";
import { delay } from "@/helpers/delay";
import { RoomDetailModal } from "../RoomDetails/RoomDetailModal";
import { NoteModal } from "../NoteModal/NoteModal";

// Função para transformar floors em menuItems para TabNavigation
const transformToTabNavigation = (floors: any[]) => {
    return [
        { id: "", label: "Todos" }, // Adiciona a opção "Todos"
        ...floors.map((floor) => ({
            id: floor._id?.toString() || "",
            label: floor.title,
        })),
    ];
};

export const Body = () => {
    const { getFloors, floors, setSelectedFloor: setFloor, selectedFloor: floorSelected } = floorStore();
    const { handleOpenModalInfo, IsOpenedModalInfo, selectedRoom, IsOpenedModalNoteReserve } = RoomStore();
    const [loading, setLoading] = useState(false);
    const [loadingRoom, setLoadingRoom] = useState(false)
    const [menuItems, setMenuItems] = useState<TTabNavigation[]>([]);
    const [selectedFloor, setSelectedFloor] = useState("Todos"); // Inicialmente "Todos"

    // Busca os andares e transforma para uso no TabNavigation
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await getFloors();
                const transformedFloors = transformToTabNavigation(response?.data || []);
                setMenuItems(transformedFloors);
            } catch (error) {
                console.error("Erro ao buscar os andares:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [!floors]);

    // Atualiza o andar selecionado no estado global
    useEffect(() => {
        (async () => {
            setLoadingRoom(true)
            await delay(2000);
            const selected = selectedFloor === "Todos" ? null : floors?.find((floor) => floor.title === selectedFloor);
            setFloor(selected || null);
            setLoadingRoom(false)
        }
        )()
    }, [selectedFloor]);

    return (
        <Wrapper title="Quartos - MAPA">
            <div className="w-full overflow-x-hidden overflow-y-auto">
                {loading ? (
                    <Skeleton className="w-10/12 h-6" />
                ) : (
                    <>
                        <TabNavigation
                            menuItems={menuItems}
                            selectedTitle={selectedFloor}
                            setSelectedTitle={setSelectedFloor}
                        />

                        {/* Lista de Quartos */}
                        {loadingRoom ? (
                            <div className="flex flex-wrap">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="mt-4 p-1">
                                        <Skeleton className="w-32 h-32 bg-gray-300 rounded-lg" />
                                        <Skeleton className="w-32 h-6 mt-2 bg-gray-300 rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : <div className={`p-8 ${selectedFloor === "Todos" ? 'grid grid-flow-row gap-8' : 'flex flex-wrap gap-4'}`}> {/* Definindo grid por linha */}
                            {selectedFloor === "Todos" ? (
                                // Se "Todos" for selecionado, mapeia todos os quartos de todos os andares
                                floors?.map((floor, index) => (
                                    <div key={index} className="flex flex-col">
                                        <h2 className="text-xl font-bold">{floor.title}</h2> {/* Título do andar */}
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {floor?.rooms?.map((room, roomIndex) => (
                                                <Room key={roomIndex} room={room} />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Se um andar específico for selecionado, mapeia os quartos desse andar
                                floorSelected?.rooms?.map((room, roomIndex) => (
                                    <Room key={roomIndex} room={room} />
                                ))
                            )}
                        </div>}
                    </>
                )}

                {/*  modal que os detalhes da reserva */}
                {selectedRoom && <RoomDetailModal room={selectedRoom} />}

                {/* Modal de Informações */}
                {IsOpenedModalInfo && <InfoModal />}

                {/* Modal de  */}
                {IsOpenedModalNoteReserve && selectedRoom && <NoteModal room={selectedRoom} />}

                {/* Botão de Informações    */}
                <Button
                    handleActive={() => true}
                    handleClick={handleOpenModalInfo}
                    className="fixed bottom-4 right-4 bg-primary text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 focus:outline-none"
                >
                    <FaInfo />
                </Button>

            </div>
        </Wrapper>
    );
};
