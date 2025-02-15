import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest"
import { ReserveEntity } from "@/interfaces/ReserveEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";

export const reserveServices = () => {
  const account = parseCookie();

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<ReserveEntity>>({
      url: `/reserves?account=${account?.account}&page=${page}`,
      method: 'GET'
    });

    return response;
  };

  return {
    find
  }
}