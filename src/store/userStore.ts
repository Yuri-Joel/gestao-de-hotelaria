import { create } from "zustand";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { TModelPagination } from "@/types/TModelPagination";
import { usersServices } from "@/services/users/users";
import { UserEntity } from "@/interfaces/EntitiesForNewAPI/UserEntity";
import { Types } from "mongoose";

type State = {
  users: UserEntity[] | null;
  selecteduser: UserEntity | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  EditUserModal: boolean;
  AddUserModal: boolean;
  isDataLoading: boolean;
  isOpenedModalDeleteUser: boolean;
  isOpenedModalEditUser: boolean;
};

type Action = {
  setSelecteduser: (user: UserEntity | null) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<UserEntity>>>;
  create: (user: UserEntity) => Promise<IResponse<UserEntity>>;
  remove: (userId: Types.ObjectId, accountId: Types.ObjectId) => Promise<IResponse<UserEntity>>;
  setCurrentPage: (page: number) => void;
  setEditUserModal: (value: boolean) => void;
  setAddUserModal: (value: boolean) => void;
  handleOpenAlertDialogDeleteUser: () => void;
  handleIsDataLoading: (value: boolean) => void;
  handleOpenModalEditUser: () => void;
};

export const userStore = create<State & Action>((set, get) => ({
  users: [],
  selecteduser: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  EditUserModal: false,
  AddUserModal: false,
  isOpenedModalDeleteUser: false,
  isDataLoading: false,
  isOpenedModalEditUser: false,

  handleOpenAlertDialogDeleteUser: () => {
    set({ isOpenedModalDeleteUser: !get().isOpenedModalDeleteUser });
  },
  handleOpenModalEditUser: () => {
    set({ isOpenedModalEditUser: !get().isOpenedModalEditUser });
  },
  handleIsDataLoading: (value) => {
    set({ isDataLoading: value });
  },
  setSelecteduser: (user) => set({ selecteduser: user }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setEditUserModal: (value) => set({ EditUserModal: value }),

  setAddUserModal: (value) => set({ AddUserModal: value }),

  find: async (page) => {
    const response = await usersServices().find(page);

    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }

    if (!response.error.value) {
      // tipando como any até a correção da api estar concluida
      set({
        users: response.data?.data,
        // currentPage: (response.data?.data as any)?.data?.pagination?.currentPage,
        totalPages: response.data?.pagination?.totalPages,
        // currentPage: response.data?.pagination.currentPage,
        totalItems: response.data?.pagination?.total,
      });
    }
    return response;
  },

  create: async (user: UserEntity) => {
    const response = await usersServices().create(user);

    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }

    if (!response.error.value) {
      await get().find(get().currentPage);
    }

    return response;
  },

  remove: async (userId, accountId) => {
    const response = await usersServices().remove(userId, accountId);

    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }

    if (!response.error.value) {
      await get().find(get().currentPage);
    }

    return response;
  },
}));
