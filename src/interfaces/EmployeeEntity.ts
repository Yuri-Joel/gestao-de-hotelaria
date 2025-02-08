import { Types } from "mongoose";

export interface EmployeeEntity {
	_id: Types.ObjectId;
	fullName: string;
	email: string;
	password: string;
}
