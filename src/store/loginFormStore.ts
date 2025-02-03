import { create } from "zustand";

interface LoginFormState {
	email: string;
	password: string;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	reset: () => void;
}

export const useLoginFormStore = create<LoginFormState>((set) => ({
	email: "",
	password: "",
	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),
	reset: () => set({ email: "", password: "" }),
}));
