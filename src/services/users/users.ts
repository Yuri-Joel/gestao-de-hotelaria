import { parseCookie } from "@/helpers/cookies/authCookie";
import handleRequest from "@/helpers/handleRequest";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";


export const usersServices = () => {
  const account = parseCookie();

  const create = async (user: UserEntity) => {
    const response = await handleRequest<UserEntity>({
      url: '/users',
      method: 'POST',
      body: JSON.stringify(user)
    });

    return response;
  };

  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<UserEntity>>({
      url: `/users?account=${account?.account}&page=${page}&limit=10`,
      method: "GET",
    });
    return response;
  };

  const remove = async (userId: Types.ObjectId, accountId: Types.ObjectId) => {
    const response = await handleRequest<UserEntity>({
      url: `/users`,
      method: "DELETE",
      body: JSON.stringify({ user: userId, account: accountId })
    });

    return response;
  };
  return {
    find,
    create,
    remove
  };
};
