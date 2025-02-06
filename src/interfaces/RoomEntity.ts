import { FloorEntity } from "./floorEntity";
import { ReserveEntity } from "./ReservesEntity";

export interface RoomEntity {
	name: string
	state:any
	reserve: ReserveEntity | null
	floor: FloorEntity
}