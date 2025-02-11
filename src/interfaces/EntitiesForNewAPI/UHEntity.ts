import { Types } from "mongoose";
import { FloorEntity } from "./FloorEntity";
import { TModel } from "@/types/TModel";
import { AccountEntity } from "./AccountEntity";
import { PropertyEntity } from "./PropertyEntity";

enum EnumStatusUH {
    confirmed = "CONFIRMED", // reserva confirmada
    pending = "PENDING", // reserva pendente
    hosted = "HOSTED", // hospede na propriedade
    canceled = "CANCELED", // reserva cancelada
    noShow = "NO-SHOW" // hospede nao compareceu na data de check-in
}

export interface UHEntity extends TModel {
    name: string; // nome
    status: EnumStatusUH // status do UHs
    floor: (Types.ObjectId | FloorEntity) // andar vinculado
    account: (Types.ObjectId | AccountEntity) // Conta vinculada
    property: (Types.ObjectId | PropertyEntity) // propriedade vinculada
}