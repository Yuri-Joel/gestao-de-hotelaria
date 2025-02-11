import { TModel } from "@/types/TModel";
import { Types } from "mongoose";
import { UserEntity } from "./UserEntity";

export interface AccountEntity extends TModel {
    name: string; // Nome conta
    ownerId?: (Types.ObjectId | UserEntity); // Usuário que criou a conta
    slug: string;
}