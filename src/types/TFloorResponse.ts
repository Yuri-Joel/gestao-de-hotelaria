import { Types } from "mongoose";

export type TFloorResponse<T> = {
	statusText: string;
	data: T[];
};
export type TFloorEntityLike = {
	isAccessible: boolean;
	property: Types.ObjectId 
	account: Types.ObjectId;
	name: string
}