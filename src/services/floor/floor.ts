import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const floorServices = () => {
  const find = async (page: number, limit:number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?page=${page}&limit=${limit}`,
      method: "GET",
    });
    return response;
  };


  return {
    find
    };
};