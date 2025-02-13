import { parseCookie, removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";

import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { profileServices } from "@/services/profile/profile";

import { TModelPagination } from "@/types/TModelPagination";
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
	findOne: (
		_id: Types.ObjectId,
	) => Promise<
		IResponse<
			TModelPagination<UserEntity> & { data: { data: UserEntity[] } }
		>
	>;
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
	// Esta função simula a existencia de um endpoint para a busca de um usuário
	findOne: async (_id: Types.ObjectId) => {
		const response = await profileServices().find();
		if (response.status === 401) {
			removeAuthCookie();
			window.location.href = "/login";
		}
		// filtrar o array para encontrar um usuário com o mesmo id fornecido pelo parametro _id
		const user = response.data?.data.data.find((user) => user._id === _id);
		if (!response.error.value && user) {
			set({ user });
		}

		return response;
	},
}));
