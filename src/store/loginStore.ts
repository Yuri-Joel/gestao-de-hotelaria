import { setAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";

import { loginService } from "@/services/login/login";

import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type State = {
	email: string;
	password: string;
	isValid: boolean | null;
};

type Action = {
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	verifyUserByEmail: (email: string) => Promise<
		IResponse<{
			statusText?: string;
			data?: string;
		}>
	>;
	signIn: (
		email: string,
		password: string,
	) => Promise<
		IResponse<{
			statusText?: string;
			data?: string;
		}>
	>;
};

export const loginStore = create<State & Action>((set) => ({
	email: "",
	password: "",
	isValid: null,

	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),

	signIn: async (email, password) => {
		const response = await loginService().signIn(email, password);
		if (!response.error.value && response?.data?.statusText === "ok") {
			const decoded: any = jwtDecode(response?.data?.data as string);
			setAuthCookie(JSON.stringify(decoded));

			Cookies.set(
				process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string,
				response?.data?.data as string,
				{
					expires: 1,
					sameSite: "None",
					secure: true,
				},
			);
		}

		return response;
	},

	verifyUserByEmail: async (email) => {
		const response = await loginService().verifyUserByEmail(email);

		if (!response.error.value && response?.data?.statusText === "ok") {
			set({ isValid: true, email });
		} else {
			set({ isValid: null, email });
		}

		return response;
	},
}));
