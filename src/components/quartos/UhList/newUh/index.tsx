import AlertDialog from "@/components/AlertDialog/AlertDialog";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Select from "@/components/Input/Select";
import { Modal } from "@/components/Modal/Modal"
import { parseCookie } from "@/helpers/cookies/authCookie";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { UHEntity } from "@/interfaces/EntitiesForNewAPI/UHEntity";
import { floorStore } from "@/store/floorStore";
import { modalManagementStore } from "@/store/modalManagementStore"
import { UhStore } from "@/store/UhStore";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react"



export const NewUhModal = () => {

    const { handleOpenModalNewUh, isOpenedModalNewUh, } = modalManagementStore();
    const { newUh } = UhStore()
    const [loading, setloading] = useState(false);
    const [name, setName] = useState("");
    const [floor, setFloor] = useState<FloorEntity | null | undefined>(null);
    const [beds, setbeds] = useState({ single: 1, double: 0 });
    const { find } = floorStore()
    const [getFloor, setGetFloor] = useState<FloorEntity[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
    const router = useRouter();




    const dataSingleBedsQuantity = ['0', '1', '2', '3', '4', '5', '6'];
    const dataDoubleBedsQuantity = ['0', '1', '2', '3', '4', '5', '6'];

    const Reset = () => {
        setName("");
        setFloor(null);
        setbeds({ single: 1, double: 0 })
    }
    const user = parseCookie();
    const handleNewUhSubmit = async () => {

        try {

            setloading(true);
            const data: Partial<UHEntity> = {
                name,
                account: user?.account,
                property: user?.properties[0],
                floor: floor?._id,
                information: {
                    beds
                }
            }
            const { error } = await newUh(data);

            if (!error.value) {
                setIsModalOpen(true);
            }

            setloading(false);
            //   Reset();
        } catch (error) {
            setIsModalCancelOpen(true);
        } finally {
            setloading(false);
        }
    }
    const handleQuantitySingleBedsSelected = (quantity: string) => {
        setbeds({
            ...beds,
            single: Number(quantity),
        })
    }

    const handleQuantityDoubleBedsSelected = (quantity: string) => {
        setbeds({
            ...beds,
            double: Number(quantity),
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setName(e.target.value);
    }

    useEffect(() => {
        ; (async () => {
            const res = await find(1);
            setGetFloor(res.data?.data as FloorEntity[]);
        })()
    }, [!floor]);


    const handleInputFloorSelected = (floorSeleted: string) => {

        setFloor(getFloor?.find((floor) => floor.name === floorSeleted))

    }
    const handleActive = (): boolean => {
        return name.length > 0 && floor !== null
    }

    const handleAddMoreUh = () => {
        Reset();
        setIsModalOpen(false);
    };


    const handleGoToUhs = () => {
        handleOpenModalNewUh()
        Reset();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalCancelOpen(false)
    }
    return (
        <Modal
            title="CADASTRAR QUARTO"
            description="Preencha os detalhes para cadastrar um novo quarto."
            onClose={handleOpenModalNewUh}
            isOpen={isOpenedModalNewUh}

        >
            <div className="w-full  space-y-6">
                {/* Campo Nome do Quarto */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium text-sm text-black">Quarto</span>
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        handleValue={handleChange}
                        placeholder="Insira um nome para o quarto"
                    />
                </div>

                {/* Campo Localização */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium text-sm text-black">Localização</span>
                    <Select
                        name="floor"
                        placeholder="Nenhum item selecionado"
                        data={getFloor?.map((s) => s?.name)}
                        selectedItem={floor ? `${floor?.name}` : ""}
                        setSelected={handleInputFloorSelected}
                        isObjectId
                    />
                </div>

                {/* Seção de Camas (Agora em linha única) */}
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <span className="font-medium text-sm text-black">Camas de solteiro</span>
                        <Select
                            name="beds"
                            placeholder="Selecione"
                            data={dataSingleBedsQuantity}
                            selectedItem={`${beds.single}`}
                            setSelected={handleQuantitySingleBedsSelected}
                            isObjectId
                        />
                    </div>

                    <div className="flex flex-col flex-1 gap-2">
                        <span className="font-medium text-sm text-black">Camas de casal</span>
                        <Select
                            name="beds"
                            placeholder="Selecione"
                            data={dataDoubleBedsQuantity}
                            selectedItem={`${beds.double}`}
                            setSelected={handleQuantityDoubleBedsSelected}
                        />
                    </div>
                </div>

                {/* Botão  */}
                <div className="flex justify-end">
                    <Button
                        handleClick={handleNewUhSubmit}
                        handleActive={() => handleActive()}
                        isLoading={loading}
                        className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md 
                   hover:bg-indigo-700 transition-all duration-300 
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Adicionar
                    </Button>
                </div>

            </div>

        
                <AlertDialog
                    typeAlert={"confirm"}
                    title="Sucesso"
                    description="Seu quarto foi cadastrado com sucesso"
                    confirmTitleBtn="Ir para Quartos"
                    cancelTitleBtn="Adicionar mais um quarto"
                    isOpenedModalManagement={isModalOpen}
                    handleConfirm={handleGoToUhs}
                    handleCancel={handleAddMoreUh}
                    hideCloseTopButton
                />
            

            <AlertDialog
                typeAlert={"cancel"}
                title="Erro"
                description="Falha ao cadastrar uma nova propriedade"

                cancelTitleBtn="Voltar"

                isOpenedModalManagement={isModalCancelOpen}
                handleCancel={handleCancel}
                hideCloseTopButton
            />

        </Modal>)

}