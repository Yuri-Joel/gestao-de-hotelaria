import { create } from "zustand";

type State = {
  state: boolean;
  openSubMenus: { [key: string]: boolean };
};

type Action = {
  changeSideBarState: (value: boolean) => void;
  closeAllSubMenus: () => void;
  setOpenSubMenus: (menus: { [key: string]: boolean }) => void;
};

const sideBarStateStore = create<State & Action>((set) => ({
  state: true,
  openSubMenus: {},

  changeSideBarState: (value) => {
    set({ state: value });
  },
  closeAllSubMenus: () => {
    set({ openSubMenus: {} });
  },

  setOpenSubMenus: (menus) => {
    set({ openSubMenus: menus });
  },
}));

export default sideBarStateStore;
