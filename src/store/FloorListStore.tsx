import { create } from "zustand"

export interface FloorListEntity {
  id: number
  name: string
  Accessibility: string
  Status: string
  Description: string
}

type State = {
  floorList: FloorListEntity[]
  searchInput: string
  page: number
  floorsPerPage: number
}

type Actions = {
  setFloorList: (floorList: FloorListEntity[]) => void
  setSearchInput: (searchInput: string) => void
  setPage: (page: number) => void
  setFloorsPerPage: (floorsPerPage: number) => void
}

export const useFloorListStore = create<State & Actions & { searchData: FloorListEntity[], setSearchData: (data: FloorListEntity[]) => void }>((set) => ({
  floorList: [],
  searchData: [],
  searchInput: "",
  page: 1,
  floorsPerPage: 10,
  setFloorList: (data) => set({ floorList: data }),
  setSearchData: (data) => set({ searchData: data }),
  setSearchInput: (data) => set({ searchInput: data }),
  setPage: (data) => set({ page: data }),
  setFloorsPerPage: (data) => set({ floorsPerPage: data }),
  }));
  

