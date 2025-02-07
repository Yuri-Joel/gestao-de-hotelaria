import { removeAuthCookie } from '@/helpers/cookies/authCookie';
import { IResponse } from '@/helpers/handleRequest';
import { ReserveEntity } from '@/interfaces/ReservesEntity';
import { reserveServices } from '@/services/reserve/reserve';
import { Types } from 'mongoose';
import { create } from 'zustand'

type State = {
  reserves: ReserveEntity[] | null;
  reserve: ReserveEntity | null;

  searchData: Reservers[];
  searchInput: string;
  currentDate: Date,
  dateFrom: string,
  dateTo: string
  selectedTitleHeader: string;
  page: number;
  reservePerPage: number;
  isChecked: string
}

type Actions = {
  setSearchData: (searchData: Reservers[]) => void;
  setSearchInput: (searchInput: string) => void;
  setCurrentDate: (data: Date) => void;
  setDateFrom: (data: string) => void;
  setDateTo: (data: string) => void;
  setSelectedTitleHeader: (data: string) => void;
  setPage: (page: number) => void;
  setReservePerPage: (page: number) => void;
  setIschecked: (isChecked: string) => void

  find: () => Promise<IResponse<ReserveEntity[]>>;
  findOne: (reserveId: Types.ObjectId) => Promise<IResponse<ReserveEntity>>;
}


export const reserveStore = create<State & Actions>((set) => ({
  reserves: [],
  reserve: null,

  searchData: [],
  searchInput: "",
  selectedTitleHeader: "Chegadas",
  isChecked: "",
  currentDate: new Date(),
  dateFrom: "",
  dateTo: "",
  page: 1,
  reservePerPage: 10,

  setPage: (data) => set({ page: data }),
  setReservePerPage: (data) => set({ reservePerPage: data }),
  setSearchData: (data) => set({ searchData: data }),
  setSearchInput: (data) => set({ searchInput: data }),
  setCurrentDate: (data) => set({ currentDate: data }),
  setDateFrom: (data) => set({ dateFrom: data }),
  setDateTo: (data) => set({ dateTo: data }),
  setSelectedTitleHeader: (data) => set({ selectedTitleHeader: data }),
  setIschecked(isChecked) {
    set({ isChecked: isChecked })
  },

  find: async () => {
    const response = await reserveServices().find();

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = '/login'
    }

    if (!response.error.value) {
      set({ reserves: response.data });
    }

    return response;
  },

  findOne: async (reserveId) => {
    const response = await reserveServices().findOne(reserveId);

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = '/login'
    }

    if (!response.error.value) {
      set({ reserve: response.data });
    }

    return response;
  },
})) 