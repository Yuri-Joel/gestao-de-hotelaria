import { create } from "zustand";

type State = {
  state: boolean;
};

type Action = {
  handleOpenReserveSearch: (value: boolean) => void;
};

const ReserveSearchStore = create<State & Action>((set, get) => ({
  state: false,
  handleOpenReserveSearch: (value) => {    
    set({ state: value });
  },

}));

export default ReserveSearchStore;
