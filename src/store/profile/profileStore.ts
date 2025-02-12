import { create } from "zustand";

type State = {
	selectedMenu:{ id: number, label: string } ;
	selectedModal: string;
};

type Action = {
	setSelectedMenu: (value: string) => void;
	setSelectedModal: (value: string) => void;
};

export const profileStore = create<State & Action>((set) => ({
	selectedMenu: {id: 1, label:"Informações Pessoais"},
	selectedModal: "modal",
	setSelectedMenu: (value: any) => {
		set({ selectedMenu: {label:value?.label, id: value?.id} });
	},
	setSelectedModal: (value) => {
		set({ selectedModal: value });
	},
}));
