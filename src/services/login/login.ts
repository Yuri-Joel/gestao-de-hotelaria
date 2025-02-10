import handleRequest from "@/helpers/handleRequest";
import { EmployeeEntity } from "@/interfaces/EmployeeEntity";

export const loginService = () => {
	const signIn = async (email: string, password: string) => {
		const response = await handleRequest<{ token: string; status: number }>(
			{
				url: `/login`,
				method: "POST",
				body: JSON.stringify({ email, password }),
			},
		);
		return response;
	};

	const verifyUserByEmail = async (email: string) => {
		const response = await handleRequest<{
			isValid: boolean;
			status: number;
		}>({
			url: `/login/verifyUserByEmail`,
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
