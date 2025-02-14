import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";

import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { profileServices, TUserDataResponse } from "@/services/profile/profile";

import { Types } from "mongoose";

import { create } from "zustand";

type State = {
	selectedMenu: { id: number; label: string };
	selectedModal: string;
	user: UserEntity | null;
};

type Action = {
	setSelectedMenu: (value: string) => void;
	setSelectedModal: (value: string) => void;
	findOne: (_id: Types.ObjectId) => Promise<IResponse<TUserDataResponse>>;
};

export const profileStore = create<State & Action>((set) => ({
	selectedMenu: { id: 1, label: "Informações Pessoais" },
	selectedModal: "modal",
	user: null,
	setSelectedMenu: (value: any) => {
		set({ selectedMenu: { label: value?.label, id: value?.id } });
	},
	setSelectedModal: (value) => {
		set({ selectedModal: value });
	},
	// Esta função faz a busca dos dados do usuário com id informado
	findOne: async (_id: Types.ObjectId) => {
		const response = await profileServices().findOne(_id);
		if (response.status === 401) {
			removeAuthCookie();
			window.location.href = "/login";
		}
		// Em caso de sucesso seta o usuário obtido na resposta
		if (!response.error.value && response.data?.data) {
			set({ user: response.data.data });
		}

		return response;
	},
}));
