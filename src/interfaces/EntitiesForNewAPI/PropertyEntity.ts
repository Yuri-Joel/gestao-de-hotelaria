import { TModel } from "@/types/TModel";
import { Types } from "mongoose";
import { AccountEntity } from "./AccountEntity";

enum EnumCategory {
    "Hotel",
    "Pousadas",
    "Hostel"
}

export interface PropertyEntity extends TModel {
    name: string;
    category: EnumCategory;
    account: (Types.ObjectId | AccountEntity);
}