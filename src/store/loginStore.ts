import { loginService } from "@/services/login/login";
import { create } from "zustand";

type State = {
	email: string;
	password: string;
};

type Action = {
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	accountExists: () => Promise<boolean>;
	checkIntegrity: () => Promise<boolean>;
};

export const useLoginStore = create<State & Action>((set, get) => ({
	email: "",
	password: "",
	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),
	accountExists: async () => {
		const response = await loginService().getEmployees();
		if (
			!response.error.value &&
			response.data?.find((employee) => employee.email === get().email)
		) {
			return true;
		}
		return false;
	},
	checkIntegrity: async () => {
		const response = await loginService().getEmployees();
		if (
			!response.error.value &&
			response.data?.find(
				(employee) =>
					employee.email === get().email &&
					employee.password === get().password,
			)
		) {
			return true;
		}
		return false;
	},
}));
