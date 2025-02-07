import handleRequest from "@/helpers/handleRequest";
import { FloorEntity } from "@/interfaces/FloorEntity";

export const floorServices = () => {
    const find = async () => {
        const response = await handleRequest<FloorEntity[]>({
            url: `/floor`,
            method: 'GET'
        });

        return response;
    };

 

    return {
        find,
    };
};
