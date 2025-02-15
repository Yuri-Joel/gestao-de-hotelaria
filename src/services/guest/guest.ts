import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest";
import { GuestEntity } from "@/interfaces/EntitiesForNewAPI/GuestEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const guestServices = () => {
  const account = parseCookie();

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<GuestEntity>>({
      url: `/guests?account=${account?.account}&page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  const create = async (floor: Partial<GuestEntity>) => {
    const response = await handleRequest<GuestEntity>({
      url: `/guests`,
      method: "POST",
      body: JSON.stringify(floor),
    });
    return response;
  };


  return {
    find,
    create
  };
};
