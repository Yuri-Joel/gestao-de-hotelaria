import { create } from 'zustand'

import { FloorEntity } from '@/interfaces/FloorEntity'
import { removeAuthCookie } from '@/helpers/cookies/authCookie'
import { floorServices } from '@/services/floor/floor'
import { IResponse } from '@/helpers/handleRequest'

type State = {
  floors: FloorEntity[] | null
  selectedFloor: FloorEntity | null
}

type Action = {
  setSelectedFloor: (floor: FloorEntity | null) => void
  getFloors: () => Promise<IResponse<FloorEntity[]>>;
}

export const floorStore = create<State & Action>((set, get) => ({
  floors: [],
  selectedFloor: null,

  setSelectedFloor: (floor) => set({ selectedFloor: floor }),

  getFloors: async () => {
    const response = await floorServices().find();
  
      if (response.status === 401) {
        removeAuthCookie()
        window.location.href = '/login'
      }      
      
      if (!response.error.value) {
        set({ floors: response.data });
      }
  
      return response;
  },
}))
