import { TModel } from "@/types/TModel";
import { Types } from "mongoose";
import { AccountEntity } from "./AccountEntity";

export enum EnumCategory {
    undefined = "Undefined",
    Hotel = "Hotel",
    Pousada = "Pousada",
    Hostel = "Hostel",
    Outro = "Outro",
  }

export interface PropertyEntity extends TModel {
    id?: number;
    name: string; // nome
    category: EnumCategory; // categoria
    externalReference?: string // referencia externa, geralmente usada para bancos parceiros
    slug?: string;
    socialNetWork?: { // redes sociais e site
        site?: string;
        instagram?: string
        facebook?: string
        whatsapp?: string
        x?: string
        linkedIn?: string
    }
    account: (Types.ObjectId | AccountEntity) // conta responsavel pela propriedade
}