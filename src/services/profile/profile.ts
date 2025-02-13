import handleRequest from "@/helpers/handleRequest";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const profileServices = () => {
	const find = async () => {
		const response = await handleRequest<
			TModelPagination<UserEntity> & { data: { data: UserEntity[] } }
		>({
			url: `/users`,
			method: "GET",
		});
		return response;
	};
	return {
		find,
	};
};
