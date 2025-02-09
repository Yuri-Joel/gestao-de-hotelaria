import handleRequest from "@/helpers/handleRequest"
import { ReserverEntity } from "@/interfaces/reserveEntity"
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";

export const reserveServices = () => {

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<ReserverEntity>>({
      url: `/reserves?page=${page}`,
      method: 'GET'
    });

    return response;
  };

  const findOne = async (reserveId: Types.ObjectId) => {
    const response = await handleRequest<ReserverEntity[]>({
      url: `/reserves/${reserveId}`,
      method: 'GET'
    });

    return response
  }

  return {
    find,
    findOne
  }
}