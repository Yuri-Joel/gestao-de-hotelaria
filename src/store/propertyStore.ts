import { Properties } from '@/interfaces/Properties';
import { create } from 'zustand'


type State = {
  searchData: Properties[];
  searchInput: string;
}

type Actions = {
  setSearchData: (searchData: Properties[]) => void;
  setSearchInput: (searchInput: string) => void;
}



export const propertyStore = create<State & Actions>((set) => ({
  searchData: [],
  searchInput:"",
  setSearchData: (data) => set({searchData: data}),
  setSearchInput: (data) => set({searchInput: data}),
})) 