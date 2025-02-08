import handleRequest from "@/helpers/handleRequest";
import { EmployeeEntity } from "@/interfaces/EmployeeEntity";

export const loginService = () => {
	const getEmployees = async () => {
		const response = await handleRequest<EmployeeEntity[]>({
			url: `/login`,
			method: "GET",
		});
		return response
	};

	return {
		getEmployees,
	};
};
