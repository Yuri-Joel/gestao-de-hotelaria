import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest";
import { GuestEntity } from "@/interfaces/EntitiesForNewAPI/GuestEntity";
import { TModelPagination } from "@/types/TModelPagination";
import Cookies from 'js-cookie'

export const guestServices = () => {
  const account = parseCookie();
  const property = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_ID}`)

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<GuestEntity>>({
      url: `/guests?account=${account?.account}&property=${property}&page=${page}&limit=10`,
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
