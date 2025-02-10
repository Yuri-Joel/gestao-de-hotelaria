import { TModel } from "@/types/TModel"
import { RoomEntity } from "./roomEntity"

export interface FloorEntity extends TModel {
  title: string // titulo do andar
  accessibility: string,
  status: string ,
  description: string ,
  rooms: RoomEntity[] // quartos vinculados ao andar
}