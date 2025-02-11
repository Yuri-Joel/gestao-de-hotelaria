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
	verifyUserByEmail: (
		email: string,
	) => Promise<IResponse<{ isValid: boolean; status: number }>>;
	signIn: (
		email: string,
		password: string,
	) => Promise<IResponse<{ token: string; status: number }>>;
};

export const loginStore = create<State & Action>((set, get) => ({
	email: "",
	password: "",
	isValid: null,

	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),

	signIn: async (email, password) => {
		const response = await loginService().signIn(email, password);
		if (!response.error.value && response?.data?.status === 200) {
			const decoded: any = jwtDecode(response?.data?.token as string);
			setAuthCookie(JSON.stringify(decoded));

			Cookies.set(
				process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string,
				response?.data?.token as string,
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

		if (!response.error.value){
			set({ isValid: response?.data?.isValid, email });
		} else {
			set({ isValid: null, email });
		}

		return response;
	},
}));
