import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";
import Cookies from 'js-cookie'

export const floorServices = () => {
  const account = parseCookie();
  const property = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_ID}`)

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      url: `/floors?account=${account?.account}&property=${property}&page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  const findTabNavigation = async () => {
    const response = await handleRequest<TModelPagination<FloorEntity>>({
      // url: /floors,
      url: `/floors?account=${account?.account}&property=${property}&page=1&limit=10`,
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