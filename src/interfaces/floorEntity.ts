import { RoomEntity } from "./RoomEntity"


export interface FloorEntity  {
  _id: string
  title: string // titulo do andar
  accessibility: string,
  status: string ,
  description: string ,
  rooms: RoomEntity[] // quartos vinculados ao andar
}