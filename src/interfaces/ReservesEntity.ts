import { guestEntity } from "./guestEntity";
import { RoomEntity } from "./RoomEntity";

export interface ReserveEntity {
  id: number;
  guest: guestEntity
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