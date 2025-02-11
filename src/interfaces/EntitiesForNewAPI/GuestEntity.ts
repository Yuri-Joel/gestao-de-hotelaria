import { Types } from "mongoose";
import { AddressEntity } from "./AddressEntity";
import { PropertyEntity } from "./PropertyEntity";
import { TModel } from "@/types/TModel";

type NoteType = {
  lastUpdate: Date;
  message: string;
}

export interface GuestEntity extends TModel, AddressEntity {
  fullName: string; // nome completo
  email?: string; // email
  phone?: string; // telefone ou celular
  lastHosting?: Date; // ultima hospedagem
  notes: NoteType[]; // Array de notas
  property: (Types.ObjectId | PropertyEntity) // id da propriedade ou objeto
}