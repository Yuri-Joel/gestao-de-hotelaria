import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const floorServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  const findTabNavigation = async () => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      // url: `/floors`,
      url: `/floors?page=1&limit=10`,
      method: "GET",
    });
    return response;
  };

  const create = async (floor: FloorEntity) => {
    const response = await handleRequest<FloorEntity>({
      url: `/floors`,
      method: "POST",
      body: JSON.stringify(floor),
    });
    return response;
  };


  return {
    find,
    findTabNavigation,
    create
  };
};
