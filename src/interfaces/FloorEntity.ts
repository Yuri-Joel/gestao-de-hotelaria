import { TModel } from "@/types/TModel"
import { RoomEntity } from "./RoomEntity"

export interface FloorEntity extends TModel {
  title: string // titulo do andar
  Accessibility: string
  Status: string
  Description:string 
  rooms: RoomEntity[] // quartos vinculados ao andar
}
