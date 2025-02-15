import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";

export const floorServices = () => {
  const account = parseCookie();

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?account=${account?.account}&page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  const findTabNavigation = async () => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      // url: /floors,
      url: `/floors?account=${account?.account}&page=1&limit=10`,
      method: "GET",
    });
    return response;
  };

  const create = async (floor: Partial<FloorEntity>) => {
    const response = await handleRequest<FloorEntity>({
      url: `/floors`,
      method: "POST",
      body: JSON.stringify(floor),
    });
    return response;
  };

  

  const deletefloor = async (floor: any) => {
    const response = await handleRequest<FloorEntity>({
      url: `/floors`,
      method: "DELETE",
      body: JSON.stringify(floor)
    });
    return response;
  };

  const editfloor = async (id: Types.ObjectId, uh: Partial<FloorEntity>) => {
    const response = await handleRequest<FloorEntity>({
      url: `/floors?id=${id}`,
      method: "PUT",
      body: JSON.stringify(uh),
    });
    return response;
  };


  return {
    find,
    findTabNavigation,
    create, 
    deletefloor,
    editfloor
  };
};