import { create } from "zustand";
import { floorServices } from "@/services/floor/floor";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { TModelPagination } from "@/types/TModelPagination";
import { FloorEntity } from "@/interfaces/floorEntity";

type State = {
  floors: FloorEntity[] | null;
  selectedFloor:  FloorEntity | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  EditFloorModal: boolean;
};

type Action = {
  setSelectedFloor: (floor: FloorEntity | null) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<FloorEntity>>>;
  setCurrentPage: (page: number) => void;
  getFloorsTabNavigation: () => Promise<IResponse<TModelPagination<FloorEntity>>>;
  setEditFloorModal: (value: boolean) => void;
};

export const floorStore = create<State & Action>((set, get) => ({
  floors: [],
  selectedFloor: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  EditFloorModal: false,

  setSelectedFloor: (floor) => set({ selectedFloor: floor }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setEditFloorModal: (value) => set({ EditFloorModal: value }),

  find: async (page) => {
    const response = await floorServices().find(page);
    
    
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
  getFloorsTabNavigation: async () => {
    const response = await floorServices().findTabNavigation();
  
      if (response.status === 401) {
        removeAuthCookie()
        window.location.href = '/login'
      }      
      
      if (!response.error.value) {
        set({ floors: response.data?.data});
      }
  
      return response;
  },
}));