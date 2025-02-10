import { TModel } from "@/types/TModel";
import { FloorEntity } from "./FloorEntity";
import { ReserverEntity } from "./reserveEntity";
import { TypeState } from "@/types/TypeState";

export interface RoomEntity extends TModel {
	name: string
	state: TypeState
	reserve: ReserverEntity | null
	floor: FloorEntity
	isClean: boolean // armazena se o quarto esta limpo ou nao
	isMaintenance: boolean // armazena se o quarto esta em manutencao ou nao
	isRestricted: boolean
	// armazena quantidade de camas casal/solteiro
	quantityBeds: {
		single: number
		double: number
	}
}