import { removeAuthCookie } from '@/helpers/cookies/authCookie';
import { IResponse } from '@/helpers/handleRequest';
import { ReserveEntity } from '@/interfaces/ReserveEntity';
import { reserveServices } from '@/services/reserve/reserve';
import { TModelPagination } from '@/types/TModelPagination';
import { TTabNavigation } from '@/types/TTabNavigation';
import { create } from 'zustand'

export interface DetailsSubtotal {
  subtotal: number;
  id: number
}

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
  totalPages2: number,
  reservePerPage: number;

  selectedGuest: string;
  
  selectedTitleHeader: TTabNavigation;

  isOpenedModalGuest: boolean;
  
  isOpenedModalRefund: boolean;

  isChecked: string,

  detailsSubTotal: DetailsSubtotal[]

}


type Actions = {
  setSearchData: (searchData: ReserveEntity[] | null) => void;
  setSearchInput: (searchInput: string) => void;
  setDetailStartDate: (data: Date) => void;
  setDetailEndDate: (data: Date) => void;
  setSelectedTitleHeader: (data: TTabNavigation) => void;
  setCurrentPage: (page: number) => void;
  setTotalPage2: (page: number) => void;
  setTotalPage: (page: number) => void;
  setReservePerPage: (page: number) => void;
  handleOpenModalRefund: () => void;
  setIsOpenedModalGuest: (data: boolean) => void;
  setSelectedGuest: (guest: string) => void;
  setIschecked: (isChecked: string) => void
  setDetailsSubTotal: (detailsSubTotal: DetailsSubtotal[] | ((prev: DetailsSubtotal[]) => DetailsSubtotal[])) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<ReserveEntity>>>
}


export const reserveStore = create<State & Actions>((set, get) => ({
  searchData: [],
  reserves: [],
  detailsSubTotal:[],
  reserve: null,
  searchOneReserve: null,
  reserveToSearch: [],
  searchInput: "",
  currentPage: 1,
  totalPages: 1,
  totalPages2: 1,
  selectedTitleHeader: {id:1, label:"Chegadas"},
  isChecked: "",
  selectedGuest: "",
  detailStartDate: new Date(),
  detailEndDate: new Date(),
  reservePerPage: 0,
  isOpenedModalGuest: false,
  isOpenedModalRefund: false,

  setCurrentPage: (data) => set({ currentPage: data }),

  setTotalPage2: (data) => set({ totalPages2: data }),

  setTotalPage: (data) => set({ totalPages: data }),

  setReservePerPage: (data) => set({ reservePerPage: data }),

  setSearchData: (data) => set({ searchData: data }),

  setSearchInput: (data) => set({ searchInput: data }),

  setDetailStartDate: (data) => set({ detailStartDate: data }),

  setDetailEndDate: (data) => set({ detailEndDate: data }),

  setSelectedGuest: (guest) => {
    localStorage.setItem("guesteSelected", JSON.stringify(guest));
    set({ selectedGuest: guest });
  },

  setDetailsSubTotal: (detailsSubTotal) => set((state) => {
    // Se for uma função (atualização com base no estado anterior)
    if (typeof detailsSubTotal === 'function') {
      return {
        detailsSubTotal: detailsSubTotal(state.detailsSubTotal)
      }
    }
  
    // Se for um array novo, verifica antes de adicionar
    const exists = state.detailsSubTotal.some(item => 
      detailsSubTotal.some(newItem => newItem.id === item.id)
    );
  
    if (exists) {
      return {}; // Não altera o estado se o ID já existir
    }
  
    // Caso contrário, adiciona os novos itens
    return {
      detailsSubTotal: [...state.detailsSubTotal, ...detailsSubTotal]
    }
  }),

  setIsOpenedModalGuest: (data) => set({ isOpenedModalGuest: data }),
  
  handleOpenModalRefund: () => {
    const isOpened = get().isOpenedModalRefund

    set({ isOpenedModalRefund: !isOpened})
  },

  setSelectedTitleHeader: (data) => {
    set({ selectedTitleHeader:{id: data?.id, label: data.label} });
  },

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
        totalPages: response.data?.pagination.totalPages,
        totalPages2: response.data?.pagination.totalPages,
        currentPage: response.data?.pagination.currentPage,
        reservePerPage: response.data?.pagination.pageSize,
        reserveToSearch: response.data?.data ,
      })
    }

    return response;
  },


})) 