import { create } from "zustand";

type State = {
  state: boolean;
};

type Action = {
  handleOpenDropdownProfile: (value: boolean) => void;
};

const MenuProfileStore = create<State & Action>((set,get) => ({
  state: false,
  handleOpenDropdownProfile: (value: boolean) => {
    set({ state: value});
  },

}));

export default MenuProfileStore;
