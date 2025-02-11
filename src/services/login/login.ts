import handleRequest from "@/helpers/handleRequest";
import { EmployeeEntity } from "@/interfaces/EmployeeEntity";

export const loginService = () => {
	const signIn = async (email: string, password: string) => {
		const response = await handleRequest<{
			statusText?: string;
			data?: string;
			error?: string;
			status: number;
		}>({
			url: `/auth`,
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		return response;
	};

	const verifyUserByEmail = async (email: string) => {
		const response = await handleRequest<{
			error?: string;
			statusText?: string;
			data?: string;
			status: number;
		}>({
			url: `/auth/verify-user-by-email`,
			method: "POST",
			body: JSON.stringify({ email }),
		});
		return response;
	};

	return {
		signIn,
		verifyUserByEmail,
	};
};
