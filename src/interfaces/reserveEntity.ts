import { GuestEntity } from "./GuestEntity";
import { RoomEntity } from "./roomEntity";

export interface ReserverEntity {
  _id: number;
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
  note?: string | null
  createdAt: Date;
	updatedAt: Date;
}