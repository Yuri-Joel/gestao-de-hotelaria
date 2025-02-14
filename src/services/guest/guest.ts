import handleRequest from "@/helpers/handleRequest";
import { GuestEntity } from "@/interfaces/EntitiesForNewAPI/GuestEntity";
import { TModelPagination } from "@/types/TModelPagination";

export const guestServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<GuestEntity>>({
      url: `/guests?page=${page}&limit=10`,
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
