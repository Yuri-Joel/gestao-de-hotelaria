import { guestsMockup } from '@/components/quartos/ModalGuest/guests';
import { removeAuthCookie } from '@/helpers/cookies/authCookie';
import { IResponse } from '@/helpers/handleRequest';
import { GuestEntity } from '@/interfaces/EntitiesForNewAPI/GuestEntity';
import { guestServices } from '@/services/guest/guest';
import { TModelPagination } from '@/types/TModelPagination';
import { create } from 'zustand'

type State = {
  selectedGuest: GuestEntity | null;
  guests: GuestEntity[];
}

type Actions = {
  setSelectGuest: (arg: GuestEntity | null) => void;
  find: (page: number) => Promise<IResponse<TModelPagination<GuestEntity>>>
}


export const guestStore = create<State & Actions>((set) => ({
  selectedGuest: null,
  guests: [...guestsMockup] ,
  setSelectGuest: (arg) => set({ selectedGuest: arg }),

  find: async (page) => {
    const response = await guestServices().find(page);

    if (response.status === 401) {
      removeAuthCookie()
      window.location.href = "/login"
    }

    if (!response.error.value) {
      set({guests: response.data?.data? response.data?.data : []}) 
    }

    return response;
  },


})) 