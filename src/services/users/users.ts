import handleRequest from "@/helpers/handleRequest";
import { UserEntity } from "@/interfaces/UserEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";


export const usersServices = () => {


  const create = async (user: UserEntity)=> {
    const response = await handleRequest({
      url: '/user',
      method: 'POST',
      body: JSON.stringify(user)
    });

    return response;
  };

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<UserEntity>>({
      url: `/users?page=${page}`,
      method: "GET",
    });
    return response;
  };

  const deleteUser = async (userId: Types.ObjectId) => {
    const response = await handleRequest({
      url: `/users?id=${userId}`,
      method: 'DELETE',
    })
    return response
  }

  return {
    find,
    deleteUser,
    create
  };
};
