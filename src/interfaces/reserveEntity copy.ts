import { TModel } from "@/types/TModel";
import { GuestEntity } from "./GuestEntity";
import { RoomEntity } from "./roomEntity";

export type stateReserveTypes = 'pending' | 'confirmed' | 'opened' | 'closed' | 'expired' | 'no-show' | 'canceled'
export interface ReserveEntity extends TModel {
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
}