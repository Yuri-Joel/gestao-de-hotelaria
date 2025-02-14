import { Input } from "@/components/Input/Input";
import { Modal } from "@/components/Modal/Modal";
import { UhStore } from "@/store/UhStore";
import { useEffect, useState } from "react";
import UHDropdown from "../Dropdown/Dropdown";
import { GuestEntity } from "@/interfaces/EntitiesForNewAPI/GuestEntity";
import { guestStore } from "@/store/GuestStore";
import { delay } from "@/helpers/delay";
import { set } from "mongoose";

// Função para transformar 
const transformToDropDown = (guests: GuestEntity[]) => {

    return guests?.map((guest) => ({
        id: String(guest._id),
        name: guest.fullName
    }));
    
}

export const ModalGuest = () => {
    const { isOpenedModalRegisterGuest, handleOpenModalRegisterGuest } = UhStore();
    const { find, guests , setSelectGuest: setGuest, selectedGuest: setGuested} = guestStore()
    const [selectedGuest, setSelectedGuest] = useState<GuestEntity | null>(null);
    const [scort, setScort] = useState<GuestEntity[]>([])
    const [searchGuest, setSearchGuest] = useState("");
    const [searchScort, setSearchScort] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState(1);

    // Vetor  com título e descrição de cada passo
    const steps = [
        {
            title: "Lançamento de Hóspede e Acompanhantes",
            description: "Registre hóspedes e seus acompanhantes de forma rápida e organizada nesta área."
        },
        {
            title: "Lançamento de Agêcias e Empresas",
            description: "Registre agências e empresas de forma rápida e organizada nesta área."
        },
        {
            title: "Configurações de UH e Diária",
            description: "Selecione a Unidade Habitacional e defina o valor da diária de forma rápida e organizada."
        },
        {
            title: "Nota",
            description: "A nota é uma informação essencial para que outros recepcionistas tenham detalhes importantes sobre a reserva, como solicitações especiais, observações do hóspede e qualquer outro dado relevante para um atendimento mais eficiente."
        }
    ];

    // Pegar título e descrição do passo atual
    const { title, description } = steps[step - 1];

    // Funções para avançar e voltar nos passos
    const nextStep = () => {
        if (step < steps.length) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const handleSelect = (guest: GuestEntity) => {
        setSelectedGuest(guest)
        setIsOpen(false)
    }

    const handleReset = () => {
        setSelectedGuest(null)
        setIsOpen(false)
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const [searchDataGuest, setSearchDataGuest] = useState<any[]>([]);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toUpperCase();
        setSearchGuest(text);
        if (e.target.value.length < 3) return;
        if (text) {
            const newData = [...guests].filter((item) => {
                const fullName = item?.fullName?.toUpperCase()
                
                return (
                    (fullName.includes(text))
                );
            });
            setSearchGuest(text);
            if (newData.length > 0){

                setSearchDataGuest( transformToDropDown(newData));
          
            }
            setIsOpen(true)
        } else {
            setSearchDataGuest(guests);
            setSearchGuest(text);
            setIsOpen(false)
        }
    }
    useEffect(() => {

        (async () => {
            try {
                setLoading(true);
                await delay(2000);

                ///       await find(1)
                setLoading(false)
            } catch (error) {

            } finally {

            }
        })()

    }, [])


    /* useEffect(() => {
        (async () => {
           
            await delay(2000);
            const selected = !selectedGuest? null : guests?.find((guest) => String(guest._id) === String(selectedGuest.id));
            console.log("isso", selected)
            setGuest(selected || null);
            }
        )();
    }, [setGuested]); */
    return (
        <Modal onClose={handleOpenModalRegisterGuest} isOpen={isOpenedModalRegisterGuest} title={title} description={description}>
            <div className="w-full h-[50vh] mx-auto p-6">
                {/* Passos */}
                {
                    step === 1 && (
                        <div className="relative grid grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-medium mb-4">Hospede</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            handleValue={handleSearch}
                                            value={setGuested ? setGuested.fullName : searchGuest}
                                            disabled={!!selectedGuest}
                                            type="text"
                                            placeholder="Nome ou CPF"
                                            className="w-full px-4 py-1 border border-gray-200 rounded-md"
                                        />
                                    </div>
                                    <button
                                        onClick={selectedGuest ? handleReset : () => null}
                                        className="text-purple-600 hover:text-purple-700 text-sm mt-0"
                                    >
                                        {selectedGuest ? "Alterar" : "Cadastrar novo"}
                                    </button>
                                    <UHDropdown data={searchDataGuest} isOpen={isOpen} setIsOpen={setIsOpen} setSelectedGuest={setSelectedGuest} />
                                </div>
                            </div>

                            {/* Companions Section */}
                            <div>
                                <h2 className="text-lg font-medium mb-4">Acompanhantes</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            handleValue={handleSearch}
                                            value={searchScort}
                                            type="text"
                                            placeholder="Nome ou CPF"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md"
                                        />
                                    </div>
                                    <button

                                        className="text-purple-600 hover:text-purple-700 text-sm mt-2"
                                    >
                                        {"Cadastrar novo"}
                                    </button>
                                    <UHDropdown data={searchDataGuest} isOpen={isOpen} setIsOpen={setIsOpen} setSelectedGuest={setSelectedGuest} />
                                </div>
                            </div>
                        </div>

                    )
                }


                {/* Botões de navegação */}
                <div className="mt-8 flex justify-between">
                    {/* Previous Button */}
                    {step > 1 ? (
                        <button
                            onClick={prevStep}
                            className="relative bg-gray-500 text-white px-8 py-2 rounded-bl-full rounded-tl-full hover:bg-gray-600 focus:outline-none"
                        >
                            Previous
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {/* Next Button */}
                    {step < steps.length && (
                        <button
                            onClick={nextStep}
                            disabled={!selectedGuest}
                            className={`relative bg-primary-700 text-white px-8 py-2 rounded-br-full rounded-tr-full hover:bg-primary-800 focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed`}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};
