import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/FloorEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const floorServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?page=${page}`,
      method: "GET",
    });

    return response;
  };
 
  return {
    find,
  };
};
