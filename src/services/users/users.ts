import handleRequest from "@/helpers/handleRequest";
import { UserEntity } from "@/interfaces/UserEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const usersServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<UserEntity>>({
      url: `/users?page=${page}`,
      method: "GET",
    });
    return response;
  };

  return {
    find
  };
};
