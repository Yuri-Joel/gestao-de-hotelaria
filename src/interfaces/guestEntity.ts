import { ReserveEntity } from "./ReservesEntity";
import { RoomEntity } from "./RoomEntity";


export interface GuestEntity {
    name: string;
    email: string;
    phoneNumber: string
    room :RoomEntity
    reserve: ReserveEntity

}