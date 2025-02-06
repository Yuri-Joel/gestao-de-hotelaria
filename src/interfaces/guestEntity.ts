import { ReserveEntity } from "./ReservesEntity";
import { RoomEntity } from "./RoomEntity";


export interface guestEntity {
    name: string;
    email: string;
    phoneNumber: string
    room :RoomEntity
    reserve: ReserveEntity

}