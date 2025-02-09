import { GuestEntity } from "./guestEntity";
import { RoomEntity } from "./roomEntity";

export interface ReserverEntity {
  id: number;
  guest: GuestEntity
  room: RoomEntity
  checkIn: Date
  checkOut: Date
  externReference: number;
	dailyValue: number;
  agency: string | null;
	productValue: number;
	servicesValue: number;
	taxValue: number;
  state: string
  payment: number;
  createdAt: Date;
	updatedAt: Date;
}