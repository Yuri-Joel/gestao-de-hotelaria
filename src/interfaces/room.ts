import { FloorEntity } from "./floor";
import { ReserversEntity } from "./reserve";

export interface RoomEntity {
	name: string
	state:string
	reserve: ReserversEntity | null
	floor: FloorEntity
}