import { Types } from "mongoose";
import { AccountEntity } from "./AccountEntity";
import { TModel } from "@/types/TModel";
import { EnumPermissions } from "./PermissionEntity";

// setores disponiveis para o usuario
export enum EnumSector {
    admin = "ADMINISTRATOR", // direito total em todas as PROPERTIES vinculados em ACCOUNT
    reserve = "RESERVE", // direito apenas na administracao de RESERVES
    centralReserves = "CENTRAL_RESERVES", // direito apenas na administracao de RESERVES e na area de central de RESERVES
    governance = "GOVERNANCE" // direito apenas na administracao de UHs
}

export interface SectorEntity extends TModel {
    name: EnumSector // nome do setor
    permissions: EnumPermissions[]; // permisoes no setor
    slug: string;
    account: (Types.ObjectId | AccountEntity); // conta vinculada
    createdAt: Date;
    updatedAt: Date;
}