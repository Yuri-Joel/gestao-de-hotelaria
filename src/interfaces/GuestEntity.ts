import { IRoomDetail } from "./IRoomDetail";
import { ReserverEntity } from "./reserveEntity";

export interface GuestEntity {
    name: string;
    email: string;
    phoneNumber: string
    room :IRoomDetail
    reserve: ReserverEntity

}