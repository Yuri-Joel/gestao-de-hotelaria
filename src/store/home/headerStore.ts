import { create } from "zustand";

type State = {
  selectedStateReserve:{ id: number, label: string } ;
};

type Action = {
  setSelectStateStateReserve: (data:any) => void;
};

const StateReserveStore = create<State & Action>((set) => ({
  selectedStateReserve: {id:1, label:"Novas Reservas"},
  setSelectStateStateReserve: (data) => {
    set({ selectedStateReserve:{id: data?.id, label: data.label} });
  },

}));

export default StateReserveStore;
