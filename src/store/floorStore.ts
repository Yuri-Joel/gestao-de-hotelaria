import { create } from "zustand";
import { FloorEntity } from "@/interfaces/FloorEntity";
import { floorServices } from "@/services/floor/floor";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";

type State = {
  floors: FloorEntity[] | null;
  selectedFloor:  FloorEntity | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

type Action = {
  setSelectedFloor: (floor: FloorEntity) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<FloorEntity>>>;
  setCurrentPage: (page: number) => void;
};

export const floorStore = create<State & Action>((set, get) => ({
  floors: [],
  selectedFloor: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,

  setSelectedFloor: (floor) => set({ selectedFloor: floor }),

  setCurrentPage: (page) => set({ currentPage: page }),

  find: async (page) => {
    const response = await floorServices().find(page);
    console.log("analisre : "  + response.data?.data);
    
    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }

    if (!response.error.value) {
      set({ 
        floors: response.data?.data,
        totalPages: response.data?.totalPages || response.data?.data?.length,
        currentPage: response.data?.page,
        totalItems: response.data?.totalItems
      });
    }

    return response;
  },
 
}));
