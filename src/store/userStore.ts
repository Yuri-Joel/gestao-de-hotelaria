import { create } from "zustand";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { TModelPagination } from "@/types/TModelPagination";
import { usersServices } from "@/services/users/users";
import { UserEntity } from "@/interfaces/UserEntity";

type State = {
  users: UserEntity[] | null;
  selecteduser: UserEntity | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  EditUserModal: boolean;
};

type Action = {
  setSelecteduser: (user: UserEntity | null) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<UserEntity>>>;
  setCurrentPage: (page: number) => void;
  setEditUserModal: (value: boolean) => void;
};

export const userStore = create<State & Action>((set, get) => ({
  users: [],
  selecteduser: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  EditUserModal: false,

  setSelecteduser: (user) => set({ selecteduser: user }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setEditUserModal: (value) => set({ EditUserModal: value }),

  find: async (page) => {
    const response = await usersServices().find(page);


    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }

    if (!response.error.value) {
      set({
        users: response.data?.data,
        totalPages: response.data?.totalPages || response.data?.data?.length,
        currentPage: response.data?.page,
        totalItems: response.data?.totalItems
      });
    }

    return response;
  },

}));
