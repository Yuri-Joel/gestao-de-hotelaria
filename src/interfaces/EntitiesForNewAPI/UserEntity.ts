import { Types } from "mongoose";
import { PropertyEntity } from "./PropertyEntity";
import { SectorEntity } from "./SectorEntity";
import { AccountEntity } from "./AccountEntity";
import { TModel } from "@/types/TModel";

export interface UserEntity extends TModel {
	id: number; // id utilizado para filtros
	firstName: string; // Primeiro nome
	lastName: string; // Segundo nome
	fullName: string; // nome completo
	email: string; // email
	password: string; // senha para autenticacao
	phone?: string; // telefone principal
	alternatePhone?: string // telefone adicional
	properties: (Types.ObjectId[] | PropertyEntity[]); // propriedades vinculadas
	sector: (SectorEntity | Types.ObjectId); // setor
	slug: string; account: (Types.ObjectId | AccountEntity) // conta vinculada
}