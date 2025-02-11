import { Types } from "mongoose";
import { AccountEntity } from "./AccountEntity";
import { TModel } from "@/types/TModel";

enum EnumSector {
    admin = "ADMINISTRATOR", // direito total em todas as PROPERTIES vinculados em ACCOUNT 
    reserve = "RESERVE", // direito apenas na administracao de RESERVES
    centralReserves = "CENTRAL_RESERVES", // direito apenas na administracao de RESERVES e na area de central de RESERVE
    governance = "GOVERNANCE" // direito apenas na administracao de UHs
}

enum EnumPermissions {
    "CREATE_PROPERTY",
    "EDIT_PROPERTY",
    "DELETE_PROPERTY",
    "VIEW_PROPERTY",
    "MANAGE_USERS",
    "FINANCIAL_MANAGEMENT",
    "MANAGE_UHS",
    "RESERVE_PROPERTY",
    "RESERVATION_CENTER"
}

export interface SectorEntity extends TModel {
    name: EnumSector // nome do setor
    permissions: EnumPermissions[]; // permisoes no setor
    slug: string;
    account: (Types.ObjectId | AccountEntity); // conta vinculada
    createdAt: Date;
    updatedAt: Date;
}