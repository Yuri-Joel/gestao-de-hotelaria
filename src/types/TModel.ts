import { Types } from "mongoose";

export type TModel = {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}