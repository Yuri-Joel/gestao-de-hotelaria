import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { TFloorEntityLike, TFloorResponse } from "@/types/TFloorResponse";
import { TModelPagination } from "@/types/TModelPagination";

export const floorServices = () => {
	const find = async (page: number, limit: number) => {
		const response = await handleRequest<TModelPagination<FloorEntity>>({
			url: `/floors?page=${page}&limit=${limit}`,
			method: "GET",
		});
		return response;
	};

	const create = async (floor: TFloorEntityLike) => {
		const response = await handleRequest<TFloorResponse<FloorEntity>>({
			url: `/floors`,
			method: "POST",
			body: JSON.stringify(floor),
		});
		return response;
	};

	return {
		find,
		create,
	};
};
