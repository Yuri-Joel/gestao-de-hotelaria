import { create } from "zustand";

type State = {
  name: string;
  acessible: boolean;
}

type Actions = {
  setName: (name: string) => void;
  setAcessible: (acessible: boolean) => void;
  resetStore: () => void;
}

export const floorAcordionStore = create<State & Actions>((set) => ({
  name: "",
  acessible: true,

  setName: (name) => set({ name }),
  setAcessible: (acessible) => set({ acessible }),

  resetStore: () =>
    set({
      name: "",
      acessible: true,
    }),
}));
