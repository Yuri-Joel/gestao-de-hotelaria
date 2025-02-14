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


interface EditUH {
    dataTranported: UHEntity
}
export const EditUhModal = ({ dataTranported }: EditUH) => {

    const { handleOpenModalEditUh, isOpenedModalEditUh, } = modalManagementStore();
    const { EditUH } = UhStore()
    const [loading, setloading] = useState(false);
    const [name, setName] = useState(dataTranported?.name || "");
    const [floor, setFloor] = useState<FloorEntity | null | undefined>((dataTranported?.floor as FloorEntity) || null);
    const [beds, setbeds] = useState(dataTranported?.information?.beds || { single: 1, double: 0 });
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
                account: user?.account as Types.ObjectId,
                property: user?.properties[0] as Types.ObjectId,
                floor: floor?._id as Types.ObjectId,

                information: {
                    beds
                }
            }
            const {error} = await EditUH(dataTranported?._id as Types.ObjectId, data);

            if (!error.value) {
               handleOpenModalEditUh();
            //  setIsModalOpen(true);
            }
            setloading(false);
            Reset();
        } catch (error) {
                setIsModalCancelOpen(false)
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

    
    const handleCancel = () => {
        setIsModalCancelOpen(false)
    }

    return (
        <>
        <Modal
            title="Atualizar o quarto"
            description="Atualize os detalhes do quarto conforme necessário."
            onClose={handleOpenModalEditUh}
            isOpen={isOpenedModalEditUh}
        >
            <div className="w-full space-y-6">
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
                        className="bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md 
                   hover:bg-primary-800 transition-all duration-300 
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Editar
                    </Button>
                </div>


            <AlertDialog
                typeAlert={"cancel"}
                title="Erro"
                description="Falha ao cadastrar uma nova propriedade"

                cancelTitleBtn="Voltar"

                isOpenedModalManagement={isModalCancelOpen}
                handleCancel={handleCancel}
                hideCloseTopButton
            />


            </div>
        </Modal>
    </>
    )

}