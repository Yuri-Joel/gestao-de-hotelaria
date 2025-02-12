import { create } from "zustand";
import { floorServices } from "@/services/floor/floor";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { TModelPagination } from "@/types/TModelPagination";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";

type State = {
  floors: FloorEntity[] | null;
  selectedFloor: FloorEntity | null;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  EditFloorModal: boolean;
};
type Action = {
  setSelectedFloor: (floor: FloorEntity | null) => void;
  find: (page: number, limit: number) => Promise<IResponse<TModelPagination<FloorEntity>>>;
  setCurrentPage: (page: number) => void;
  setEditFloorModal: (value: boolean) => void;
};

export const floorStore = create<State & Action>((set, get) => ({
  floors: [],
  selectedFloor: null,
  currentPage: 1,
  totalPages: 0,
  pageSize: 0,
  EditFloorModal: false,

  setSelectedFloor: (floor) => set({ selectedFloor: floor }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setEditFloorModal: (value) => set({ EditFloorModal: value }),

  find: async (page, limit) => {
    const response = await floorServices().find(page, limit);


    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }
    if (!response.error.value) {
      set({
        floors: response.data?.data,
        totalPages: response.data?.pagination.totalPages || response.data?.data?.length,
        currentPage: response.data?.pagination.currentPage,
        pageSize: response.data?.pagination.pageSize
      });
    }

    return response;
  }
}));
