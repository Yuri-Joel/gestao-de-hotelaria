import handleRequest from "@/helpers/handleRequest";
import { Types } from "mongoose";

export const reserveServices = () => {
    const find = async () => {
        const response = await handleRequest({
            url: `/reserve`,
            method: 'GET'
        });

        return response;
    };

    const findOne = async (reserveId: Types.ObjectId) => {
        const response = await handleRequest({
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
