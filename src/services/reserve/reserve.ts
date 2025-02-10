import handleRequest from "@/helpers/handleRequest"
import { ReserveEntity } from "@/interfaces/ReservesEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";

export const reserveServices = () => {

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<ReserveEntity>>({
      url: `/reserves?page=${page}`,
      method: 'GET'
    });

    return response;
  };

  const findOne = async (reserveId: Types.ObjectId) => {
    const response = await handleRequest<ReserveEntity>({
      url: `/reserves/${reserveId}`,
      method: 'GET'
    });

    return response
  }

  const findOneById = async (reserveId: Types.ObjectId) => {
    const response = await handleRequest<ReserveEntity>({
      url: `/reserves/${reserveId}`,
      method: 'GET'
    });

    return response
  }

  const findOneByName = async (name: string) => {
    const response = await handleRequest<ReserveEntity>({
      url: `/reserves/findOneByName?name=${name}`,
      method: "GET"
    })

    return response

  }

  return {
    find,
    findOne,
    findOneByName,
    findOneById,
  }
}