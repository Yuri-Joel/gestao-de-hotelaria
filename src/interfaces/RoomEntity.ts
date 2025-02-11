import { TModel } from "@/types/TModel";
import { TypeState } from "@/types/TypeState";
import { ReserveEntity } from "./ReserveEntity";
import { FloorEntity } from "./FloorEntity";

export interface RoomEntity extends TModel {
	name: string
	state: TypeState
	reserve: ReserveEntity | null
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