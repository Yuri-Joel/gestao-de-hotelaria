import { create } from "zustand";

type State = {
	selectedMenu: string;
	selectedModal: string;
};

type Action = {
	setSelectedMenu: (value: string) => void;
	setSelectedModal: (value: string) => void;
};

export const profileStore = create<State & Action>((set) => ({
	selectedMenu: "Informações Pessoais",
	selectedModal: "modal",
	setSelectedMenu: (value) => {
		set({ selectedMenu: value });
	},
	setSelectedModal: (value) => {
		set({ selectedModal: value });
	},
}));
