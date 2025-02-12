import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const floorServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?page=${page}`,
      method: "GET",
    });
    return response;
  };

  const findTabNavigation = async (page:number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  return {
    find,
    findTabNavigation
  };
};