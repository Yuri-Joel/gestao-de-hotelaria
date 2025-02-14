"use client";

import { Wrapper } from "@/components/Wrapper";
import { useEffect, useState } from "react";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { TTabNavigation } from "@/types/TTabNavigation";
import { Skeleton } from "@/components/Skeleton/Skeleton";
import { Button } from "@/components/Button/Button";
import { FaInfo } from "react-icons/fa";
import { InfoModal } from "../InfoModal/InfoModal";
import { delay } from "@/helpers/delay";
import { RoomDetailModal } from "../RoomDetails/RoomDetailModal";
import { NoteModal } from "../NoteModal/NoteModal";
import { floorStore } from "@/store/floorStore";
import { UHEntity } from "@/interfaces/EntitiesForNewAPI/UHEntity";
import { UhStore } from "@/store/UhStore";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { ModalGuest } from "../ModalGuest";
import { Room } from "../Room/room";

// Função para transformar floors em menuItems para TabNavigation
const transformToTabNavigation = (floors: FloorEntity[]) => {

    return [
        { id: 0, label: "Todos" }, // Adiciona a opção "Todos"
        ...floors?.map((floor) =>
            floor.isAccessible ? { id: floor.id + 1, label: floor.name } : null
        ).filter(Boolean) as TTabNavigation[],
    ];
};

export const Body = () => {
    const { find, floors, setSelectedFloor: setFloor, selectedFloor: floorSelected,
        currentPage,
        setCurrentPage,
    } = floorStore();
    const { handleOpenModalInfo, IsOpenedModalInfo, selectedRoom, IsOpenedModalNoteReserve } = UhStore();
    const [loading, setLoading] = useState(false);
    const [loadingRoom, setLoadingRoom] = useState(false)
    const [menuItems, setMenuItems] = useState<TTabNavigation[]>([]);
    const [selectedFloor, setSelectedFloor] = useState({ label: "Todos", id: 0 }); // Inicialmente "Todos"

    /*  
     useEffect(() => {
         (async () => {
             try {
                 
                 const response = await getFloorsTabNavigation(currentPage);
                 console.log("isso 2", response)
                 const transformedFloors = transformToTabNavigation(response?.data?.data || []);
                 setMenuItems(transformedFloors);
             } catch (error) {
                 console.error("Erro ao buscar os andares:", error);
             } finally {
             }
         })();
     }, [currentPage]); */

    // Busca os andares e transforma para uso no TabNavigation
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await find(currentPage);
                  console.log("isso 1", response)
                const transformedFloors = transformToTabNavigation(response?.data?.data || []);
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
            const selected = selectedFloor.label === "Todos" ? null : floors?.find((floor) => floor.id === selectedFloor.id - 1);
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
                            isCarrousel
                            setCurrentPage={setCurrentPage}
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
                        ) : <div className={`p-8 ${selectedFloor.label === "Todos" ? 'grid grid-flow-row gap-8' : 'flex flex-wrap gap-4'}`}> {/* Definindo grid por linha */}
                            {selectedFloor.label === "Todos" ? (

                                floors && floors.map((floor, index) => (
                                    <div key={index} className="flex flex-col">
                                        <h2 className="text-xl font-bold">{floor.name}</h2>
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {floor.UHs && floor.UHs.length > 0 ? (
                                                floor.UHs.map((uh, roomIndex) => (
                                                    <Room key={roomIndex} room={uh as UHEntity} />
                                                ))
                                            ) : (
                                                <p className="text-gray-500">Nenhuma unidade habitacional disponível.</p>
                                            )}
                                        </div>
                                    </div>
                                ))

                            ) : (
                                floorSelected?.UHs && floorSelected.UHs.length > 0 ? (
                                    floorSelected.UHs.map((uh, roomIndex) => (
                                        <Room key={roomIndex} room={uh as UHEntity} />
                                    ))
                                ) : (
                                    <p className="text-gray-500">Nenhuma unidade habitacional disponível neste andar.</p>
                                )
                            )}

                        </div>}
                    </>
                )}

                {/*  modal que os detalhes da reserva */}
                {selectedRoom && <RoomDetailModal room={selectedRoom} />}

                {/* Modal de Informações */}
                {IsOpenedModalInfo && <InfoModal />}

                {IsOpenedModalNoteReserve && selectedRoom && <NoteModal room={selectedRoom} />}

                <ModalGuest />
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
