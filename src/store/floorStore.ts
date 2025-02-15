import { create } from "zustand";
import { floorServices } from "@/services/floor/floor";
import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { TModelPagination } from "@/types/TModelPagination";
import { FloorEntity } from "@/interfaces/EntitiesForNewAPI/FloorEntity";
import { Types } from "mongoose";

type State = {
  floors: FloorEntity[] | null;
  selectedFloor: FloorEntity | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  EditFloorModal: boolean;
  isOpenModalNewFloor: boolean;
};

type Action = {
  setSelectedFloor: (floor: FloorEntity | null) => void;
  setCurrentPage: (page: number) => void;
  setEditFloorModal: (value: boolean) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<FloorEntity>>>;
  getFloorsTabNavigation: () => Promise<IResponse<TModelPagination<FloorEntity>>>;
  create: (floor: Partial<FloorEntity>) => Promise<IResponse<FloorEntity>>;
  Deletefloor: (id: Types.ObjectId) => Promise<IResponse<FloorEntity>>;
  Editfloor:(id: Types.ObjectId, floor: Partial<FloorEntity>) => Promise<IResponse<FloorEntity>>;
  handleOpenModalNewFloor: () => void;
};

export const floorStore = create<State & Action>((set, get) => ({
  floors: [],
  selectedFloor: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  EditFloorModal: false,
  isOpenModalNewFloor: false,

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
        totalPages: response.data?.pagination.totalPages,
        currentPage: response.data?.pagination.currentPage,
        totalItems: response.data?.pagination.total
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
      set({ floors: response.data?.data });
    }

    return response;
  },

  create: async (floor) => {
    const response = await floorServices().create(floor);

    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }

    if (!response.error.value) {
      await get().find(get().currentPage);
    }

    return response;
  },
  
  Editfloor: async (id: Types.ObjectId, floor) => {
    const response = await floorServices().editfloor(id,floor);
  
      if (response.status === 401) {
        removeAuthCookie();
        window.location.href = "/login";
      }
  
      if (!response.error.value) {
        await get().find(1);
        // set({ floors: response.data?.data });
      }
  
      return response;
  },
  Deletefloor: async (id: Types.ObjectId) => {
  
    const response = await  floorServices().deletefloor({uh: id});
    if (response.status === 401) {
      removeAuthCookie();
      window.location.href = "/login";
    }
  
    if (!response.error.value) {
  
      await get().find(1);
      // set({ floors: response.data?.data });
    }
  
    return response;
  },
  
  handleOpenModalNewFloor: () => {
    set({ isOpenModalNewFloor: !get().isOpenModalNewFloor });
  },
}));
