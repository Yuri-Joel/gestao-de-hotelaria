import { Properties } from '@/interfaces/Properties';
import { create } from 'zustand'


type State = {
  searchData: Properties[];
  searchInput: string;
  page: number;
  propertyPerPage: number
}

type Actions = {
  setSearchData: (searchData: Properties[]) => void;
  setSearchInput: (searchInput: string) => void;
  setPage: (page: number) => void;
  setPropertyPerPage: (page: number) => void;
}



export const propertyStore = create<State & Actions>((set) => ({
  searchData: [],
  searchInput:"",
  page: 1,
  propertyPerPage: 10,
  setSearchData: (data) => set({searchData: data}),
  setSearchInput: (data) => set({searchInput: data}),
  setPropertyPerPage: (data) => set({propertyPerPage: data}),
  setPage: (data) => set({page: data})
})) 