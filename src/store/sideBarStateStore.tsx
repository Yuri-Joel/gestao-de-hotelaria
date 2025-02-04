import { create } from "zustand";

type State = {
  state: boolean;
};

type Action = {
  changeSideBarState: (value: boolean) => void;
};

const sideBarStateStore = create<State & Action>((set) => ({
  state: true,
  changeSideBarState: (value) => {
    set({ state: value });
  },

}));

export default sideBarStateStore;
