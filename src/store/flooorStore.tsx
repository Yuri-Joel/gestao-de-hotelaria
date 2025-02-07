import { Types } from 'mongoose'
import { create } from 'zustand'

import { FloorEntity } from '@/interfaces/FloorEntity'

type State = {
  floors: FloorEntity[] | null
  selectedFloor: FloorEntity | null
}

type Action = {
  setSelectedFloor: (floor: FloorEntity | null) => void
  getFloors: (hotelId: Types.ObjectId) => Promise<any>
}

export const floorStore = create<State & Action>((set, get) => ({
  floors: [],

  selectedFloor: null,
  searchData: [],

  setSelectedFloor: (floor) => set({ selectedFloor: floor }),

  getFloors: async () => {
  
  },
}))
