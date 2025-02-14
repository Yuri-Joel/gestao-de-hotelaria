import handleRequest from "@/helpers/handleRequest";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { Types } from "mongoose";

export type TUserDataResponse = {
	statusText: string;
	data: UserEntity;
};

export const profileServices = () => {
	const findOne = async (user: Types.ObjectId) => {
		const response = await handleRequest<TUserDataResponse>({
			url: `/users/authenticated`,
			method: "POST",
			body: JSON.stringify({ user }),
		});
		return response;
	};
	return {
		findOne,
	};
};
