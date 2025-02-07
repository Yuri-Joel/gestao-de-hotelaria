import { RoomEntity } from "./room"


export interface FloorEntity  {
  _id: string
  title: string // titulo do andar
  rooms: RoomEntity[] // quartos vinculados ao andar
}