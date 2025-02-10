import { removeAuthCookie } from '@/helpers/cookies/authCookie';
import { IResponse } from '@/helpers/handleRequest';
import { ReserverEntity } from '@/interfaces/reserve';
import { reserveServices } from '@/services/reserve/reserve';
import { TModelPagination } from '@/types/TModelPagination';
import { create } from 'zustand'

type State = {
  searchData: ReserverEntity[] | null;
  searchInput: string;
  currentDate: Date,
  currentPage: number,
  totalPages: number,
  dateFrom: string,
  dateTo: string
  selectedTitleHeader: string;
  reservePerPage: number;
  reserveToSearch: ReserverEntity[] | null,
  isChecked: string,
  reserves: ReserverEntity[] | null
}

type Actions = {
  setSearchData: (searchData: ReserverEntity[] | null) => void;
  setSearchInput: (searchInput: string) => void;
  setCurrentDate: (data: Date) => void;
  setDateFrom: (data: string) => void;
  setDateTo: (data: string) => void;
  setSelectedTitleHeader: (data: string) => void;
  setCurrentPage: (page: number) => void;
  setReservePerPage: (page: number) => void;
  setIschecked: (isChecked: string) => void
  getReserve: (page:number) => Promise<IResponse<TModelPagination<ReserverEntity>>>
}


export const reserveStore = create<State & Actions>((set) => ({
  searchData: [],
  reserves: [],
  reserveToSearch: [],
  searchInput:"",
  currentPage:1,
  totalPages:1,
  selectedTitleHeader: "Chegadas",
  isChecked:"",
  currentDate: new Date(),
  dateFrom: new Date().toISOString().split('T')[0],
  dateTo: new Date().toISOString().split('T')[0],
  reservePerPage: 0,
  setCurrentPage: (data) => set({currentPage: data}),
  setReservePerPage: (data) => set({reservePerPage: data}),
  setSearchData: (data) => set({searchData: data}),
  setSearchInput: (data) => set({searchInput: data}),
  setCurrentDate: (data) => set({currentDate: data}),
  setDateFrom: (data) => set({dateFrom: data}),
  setDateTo: (data) => set({dateTo: data}),
  setSelectedTitleHeader: (data) => set({selectedTitleHeader: data}),
  setIschecked(isChecked) {
    set({isChecked: isChecked})
  },
  
  getReserve: async (page) => {
    const response = await reserveServices().find(page);
    
    if( response.status === 401) {
      removeAuthCookie()
      window.location.href="/login"
    }
    
    if( !response.error.value ) {
      set({
        reserves: response.data?.data,
        totalPages: response.data?.totalPages || response.data?.data?.length,
        currentPage: response.data?.page,
        reservePerPage: response.data?.totalItems,
        reserveToSearch: response.data?.dataSearch
      })
    }

    return response;
  }

})) 