import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest"
import { ReserveEntity } from "@/interfaces/ReserveEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";
import Cookies from 'js-cookie'

export const reserveServices = () => {
  const account = parseCookie();
  const property = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_ID}`)

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<ReserveEntity>>({
      url: `/reserves?account=${account?.account}&property=${property}&page=${page}`,
      method: 'GET'
    });

    return response;
  };

  return {
    find
  }
}