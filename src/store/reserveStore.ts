import { removeAuthCookie } from '@/helpers/cookies/authCookie';
import { IResponse } from '@/helpers/handleRequest';
import { ReserveEntity } from '@/interfaces/ReserveEntity';
import { reserveServices } from '@/services/reserve/reserve';
import { TModelPagination } from '@/types/TModelPagination';
import { create } from 'zustand'

type State = {
  reserves: ReserveEntity[] | null
  reserve: ReserveEntity | null
  reserveToSearch: ReserveEntity[] | null,

  searchData: ReserveEntity[] | null;
  searchInput: string;

  detailStartDate: Date,
  detailEndDate: Date,

  currentPage: number,
  totalPages: number,
  reservePerPage: number;

  selectedTitleHeader: string;

  isChecked: string,
}

type Actions = {
  setSearchData: (searchData: ReserveEntity[] | null) => void;
  setSearchInput: (searchInput: string) => void;
  setDetailStartDate: (data: Date) => void;
  setDetailEndDate: (data: Date) => void;
  setSelectedTitleHeader: (data: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPage: (page: number) => void;
  setReservePerPage: (page: number) => void;
  setIschecked: (isChecked: string) => void
  find: (page: number) => Promise<IResponse<TModelPagination<ReserveEntity>>>
}


export const reserveStore = create<State & Actions>((set) => ({
  searchData: [],
  reserves: [],
  reserve: null,
  searchOneReserve: null,
  reserveToSearch: [],
  searchInput: "",
  currentPage: 1,
  totalPages: 1,
  selectedTitleHeader: "Chegadas",
  isChecked: "",
  detailStartDate: new Date(),
  detailEndDate: new Date(),
  reservePerPage: 0,

  setCurrentPage: (data) => set({ currentPage: data }),

  setTotalPage: (data) => set({ totalPages: data }),

  setReservePerPage: (data) => set({ reservePerPage: data }),

  setSearchData: (data) => set({ searchData: data }),

  setSearchInput: (data) => set({ searchInput: data }),

  setDetailStartDate: (data) => set({ detailStartDate: data }),

  setDetailEndDate: (data) => set({ detailEndDate: data }),

  setSelectedTitleHeader: (data) => set({ selectedTitleHeader: data }),

  setIschecked(isChecked) {
    set({ isChecked: isChecked })
  },

  find: async (page) => {
    const response = await reserveServices().find(page);

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = "/login"
    }

    if (!response.error.value) {
      set({
        reserves: response.data?.data,
        totalPages: response.data?.totalPages || response.data?.data?.length,
        currentPage: response.data?.page,
        reservePerPage: response.data?.totalItems,
        reserveToSearch: response.data?.dataSearch,
      })
    }

    return response;
  },


})) 