import handleRequest, { IResponse } from "@/helpers/handleRequest";

export type TResponseLogin = {
	statusText: string;
	data: string;
}

export type TResponseLoginError = IResponse<{ error: string }>

export const loginService = () => {
	const signIn = async (email: string, password: string) => {
		const response = await handleRequest<TResponseLogin>({
			url: `/auth`,
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		return response;
	};

	const verifyUserByEmail = async (email: string) => {
		const response = await handleRequest<TResponseLogin>({
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
