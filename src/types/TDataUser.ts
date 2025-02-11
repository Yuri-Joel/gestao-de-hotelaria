import { Types } from "mongoose";

export type TDataUser = {
    // data: {
    _id: Types.ObjectId;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    properties: Types.ObjectId[];
    sector: any;
    password: string;
    account: Types.ObjectId;
    fullName: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    // };
    // iat: number;
    // exp: number
}