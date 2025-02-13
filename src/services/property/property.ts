import handleRequest from "@/helpers/handleRequest"
import { PropertyEntity } from "@/interfaces/EntitiesForNewAPI/PropertyEntity";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";



export const propertyServices = () => {
  const find = async (page: number) => {
    const response = await handleRequest<TModelPagination<PropertyEntity>>({
      url: `/properties?page=${page}&limit=10`,
      method: "GET",
    })

    return response
  }

  const create = async (property: PropertyEntity) => {
    const response = await handleRequest<PropertyEntity>({
      url: `/properties`,
      method: "POST",
      body: JSON.stringify(property),
    })

    return response;
  }

  const update = async (propertyId: Types.ObjectId, property: {
    name: string,
    category: string,
    account: string
  }) => {
    const response = await handleRequest<PropertyEntity>({
      url: `/properties/update?id=${propertyId}`,
      method: "PUT",
      body: JSON.stringify(property)
    })

    return response
  }

  return ({
    create,
    update,
    find
  })
}
