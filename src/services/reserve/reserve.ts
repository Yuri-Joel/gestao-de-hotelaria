import handleRequest from "@/helpers/handleRequest";
import { ReserveEntity } from "@/interfaces/ReservesEntity";
import { Types } from "mongoose";

export const reserveServices = () => {
    const find = async () => {
        const response = await handleRequest<ReserveEntity[]>({
            url: `/reserve`,
            method: 'GET'
        });

        return response;
    };

    const findOne = async (reserveId: Types.ObjectId) => {
        const response = await handleRequest<ReserveEntity>({
            url: `/reserve/${reserveId}`,
            method: 'GET'
        });

        return response;
    };

    return {
        find,
        findOne,
    };
};
