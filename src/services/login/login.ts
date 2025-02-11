import handleRequest from "@/helpers/handleRequest";

export const loginService = () => {
	const signIn = async (email: string, password: string) => {
		const response = await handleRequest<{
			statusText: string;
			data: string;
		}>({
			url: `/auth`,
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		return response;
	};

	const verifyUserByEmail = async (email: string) => {
		const response = await handleRequest<{
			statusText: string;
			data: string;
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
