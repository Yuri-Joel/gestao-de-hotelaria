import { TModel } from "@/types/TModel";
import { Types } from "mongoose";
import { PropertyEntity } from "./PropertyEntity";
import { AccountEntity } from "./AccountEntity";
import { UHEntity } from "./UHEntity";

export interface FloorEntity extends TModel {
    id?: number; // id utilizado para filtros
    name: string; // nome do andar
    UHs?: (Types.ObjectId | UHEntity)[] // UHs vinculados
    isAccessible: boolean; // true para acessivel
    property: (Types.ObjectId | PropertyEntity) // propriedade vinculada
    account: (Types.ObjectId | AccountEntity) // conta vinculada
}