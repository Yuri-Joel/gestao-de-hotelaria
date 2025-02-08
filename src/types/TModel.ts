import { Types } from "mongoose";

export type TModel = {
  _id?: Types.ObjectId | number;
  createdAt?: Date;
  updatedAt?: Date;
}
