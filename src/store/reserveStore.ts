import { create } from 'zustand'

type State = {
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
}


export const reserveStore = create<State & Actions>((set) => ({
  searchData: [],
  searchInput:"",
  selectedTitleHeader: "Chegadas",
  isChecked:"",
  currentDate: new Date(),
  dateFrom: "",
  dateTo: "",
  page: 1,
  reservePerPage: 10,
  setPage: (data) => set({page: data}),
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
})) 