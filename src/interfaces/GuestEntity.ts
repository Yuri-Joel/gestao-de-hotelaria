import { Types } from "mongoose";
import { IRoomDetail } from "./IRoomDetail";
import { ReserveEntity } from "./ReservesEntity";

export interface GuestEntity {
    name: string;
    email: string;
    phoneNumber?: string
    room?:IRoomDetail
    reserve: Types.ObjectId | ReserveEntity | null
}