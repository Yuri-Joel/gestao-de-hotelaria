import { TModel } from "@/types/TModel";
export interface GuestEntity extends TModel {
    name: string;
    email: string;
    phoneNumber: string
}