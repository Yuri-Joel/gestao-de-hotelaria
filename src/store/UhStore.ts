import { removeAuthCookie } from "@/helpers/cookies/authCookie";
import { IResponse } from "@/helpers/handleRequest";
import { UHEntity } from "@/interfaces/EntitiesForNewAPI/UHEntity";
import { UhServices } from "@/services/Uh/uh";
import { TModelPagination } from "@/types/TModelPagination";
import { Types } from "mongoose";
import { create } from "zustand";

type State = {
  IsOpenedModalInfo: boolean;
  IsOpenedModalRoomDetails: boolean;
  selectedRoom: UHEntity | null;
  selectedUh: UHEntity | null;
  IsOpenedModalNoteReserve: boolean;
  isOpenedModalRegisterGuest: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  UH: UHEntity[] | null;
  
}

type Action = {
  handleOpenModalInfo: () => void;
  handleOpenModalRoomDetails: () => void;
  closeRoomDetails: () => void;
  setSelectedRoom: (arg: UHEntity | null) => void
  handleIsOpenedModalNoteReserve: () => void
  handleOpenModalRegisterGuest: () => void
  setCurrentPage: (page: number) => void;
    find: (page: number) => Promise<IResponse<TModelPagination<UHEntity>>>;
    newUh: (floor: Partial<UHEntity>) => Promise<IResponse<UHEntity>>;
  setSelectedUh: (arg: UHEntity | null) => void; 
  DeleteUH: (id: Types.ObjectId) => Promise<IResponse<UHEntity>>;
  EditUH:(id: Types.ObjectId, uh: Partial<UHEntity>) => Promise<IResponse<UHEntity>>;
};

export const UhStore = create<State & Action>((set, get) => ({
  UH: [],
  IsOpenedModalInfo: false,
  IsOpenedModalRoomDetails: false,
  selectedRoom: null,
  IsOpenedModalNoteReserve: false,
  isOpenedModalRegisterGuest: false,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  setSelectedRoom: (arg: UHEntity | null) => {
    set({ selectedRoom: arg })
  },
  handleOpenModalInfo: () => {
    set({ IsOpenedModalInfo: !get().IsOpenedModalInfo });
  },
  handleOpenModalRoomDetails: () => {
    set({ IsOpenedModalRoomDetails: !get().IsOpenedModalRoomDetails });
  },
  closeRoomDetails: () => {
    set({ IsOpenedModalRoomDetails: false })
  },
  handleIsOpenedModalNoteReserve: () => {
    set({ IsOpenedModalNoteReserve: !get().IsOpenedModalNoteReserve })
  },
  handleOpenModalRegisterGuest: () => {
    set({ isOpenedModalRegisterGuest: !get().isOpenedModalRegisterGuest })
  },
  
    setCurrentPage: (page) => set({ currentPage: page }),
  
    find: async (page) => {
      const response = await UhServices().find(page);
  
  
      if (response.status === 401) {
        removeAuthCookie();
        window.location.href = "/login";
      }
  
      if (!response.error.value) {
        set({
          UH: response.data?.data,
          totalPages: response.data?.pagination.totalPages,
          currentPage: response.data?.pagination.currentPage,
          totalItems: response.data?.pagination.total
        });
      }
  
      return response;
    },
newUh: async (uh) => {
    const response = await UhServices().newUh(uh);

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
EditUH: async (id: Types.ObjectId, uh) => {
  const response = await UhServices().editUh(id,uh);

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
DeleteUH: async (id: Types.ObjectId) => {

  const response = await UhServices().deleteUh({uh: id});
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

selectedUh: null,
setSelectedUh: (arg: UHEntity | null) => {
  set({ selectedUh: arg })
}
}));

