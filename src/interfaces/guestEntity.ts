import { IRoomDetail } from "./IRoomDetail";
import { ReserversEntity } from "./reserve";

export interface GuestEntity {
    name: string;
    email: string;
    phoneNumber: string
    room :IRoomDetail
    reserve: ReserversEntity

}