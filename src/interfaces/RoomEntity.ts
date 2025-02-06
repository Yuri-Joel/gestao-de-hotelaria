import { ReserveEntity } from "./ReservesEntity";
import { FloorEntity } from "./FloorEntity";

export interface RoomEntity {
	name: string
	state: any
	reserve: ReserveEntity | null
	floor: FloorEntity
}