import { TModel } from "@/types/TModel";
import { ReserveEntity } from "./ReservesEntity";
import { RoomEntity } from "./RoomEntity";
export interface GuestEntity extends TModel {
    name: string;
    email: string;
    phoneNumber: string
}