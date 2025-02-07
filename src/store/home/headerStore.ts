import { create } from "zustand";

type State = {
  selectedStateReserve: string
};

type Action = {
  setSelectStateStateReserve: (value: string) => void;
};

const StateReserveStore = create<State & Action>((set) => ({
  selectedStateReserve: "Novas Reservas",
  setSelectStateStateReserve: (value) => {
    set({ selectedStateReserve: value });
  },

}));

export default StateReserveStore;
