import { Types } from "mongoose";
import { FloorEntity } from "./FloorEntity";
import { TModel } from "@/types/TModel";
import { AccountEntity } from "./AccountEntity";
import { PropertyEntity } from "./PropertyEntity";
import { ReserveEntity } from "../ReserveEntity";

enum EnumStatusUH {
    confirmed = "CONFIRMED", // reserva confirmada
    pending = "PENDING", // reserva pendente
    hosted = "HOSTED", // hospede na propriedade
    canceled = "CANCELED", // reserva cancelada
    noShow = "NO-SHOW" ,// hospede nao compareceu na data de check-in
    vague = "VAGO" // UH disponivel
}

export interface UHEntity extends TModel {
    name: string; // nome
    status: EnumStatusUH // status do UHs
    floor: (Types.ObjectId | FloorEntity) // andar vinculado
    reserve: ReserveEntity | null // reserva vinculada
    information: {
        beds: {
            single: number // quantidade de camas de solteiro
            double: number // quantidade de camas de casal
        }
    }
    account: (Types.ObjectId | AccountEntity) // Conta vinculada
    property: (Types.ObjectId | PropertyEntity) // propriedade vinculada
}