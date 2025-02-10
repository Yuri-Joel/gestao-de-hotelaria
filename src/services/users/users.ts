import handleRequest from "@/helpers/handleRequest";
import { UsersEntity } from "@/interfaces/UsersEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const usersServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<UsersEntity>>({
      url: `/users?page=${page}`,
      method: "GET",
    });
    return response;
  };

  return {
    find
  };
};
