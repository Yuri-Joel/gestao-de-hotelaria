import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest";
import { UHEntity } from "@/interfaces/EntitiesForNewAPI/UHEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";

export const UhServices = () => {
  const account = parseCookie();

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<UHEntity>>({
      url: `/uhs?account=${account?.account}&page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  const newUh = async (uh: Partial<UHEntity>) => {
    const response = await handleRequest<UHEntity>({
      url: `/uhs`,
      method: "POST",
      body: JSON.stringify(uh),
    });
    return response;
  };


  const deleteUh = async (uh: any) => {
    const response = await handleRequest<UHEntity>({
      url: `/uhs`,
      method: "DELETE",
      body: JSON.stringify(uh)
    });
    return response;
  };

  const editUh = async (id: Types.ObjectId, uh: Partial<UHEntity>) => {
    const response = await handleRequest<UHEntity>({
      url: `/uhs?id=${id}`,
      method: "PUT",
      body: JSON.stringify(uh),
    });
    return response;
  };

  return {
    find,
    newUh,
    deleteUh,
    editUh
  };
};
