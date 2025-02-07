import { ReserveEntity } from "./ReservesEntity";
import { FloorEntity } from "./FloorEntity";
import { TModel } from "@/types/TModel";

export type TypeState = 'vague' | 'occupied'

export interface RoomEntity extends TModel {
	name: string
	state: TypeState
	reserve: ReserveEntity | null
	floor: FloorEntity
}