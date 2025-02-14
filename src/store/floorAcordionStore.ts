import { create } from "zustand";

type State = {
  name: string;
  acessible: boolean;
  step: "first" | "second" | "validation" | "";
}

type Actions = {
  setName: (name: string) => void;
  setAcessible: (acessible: boolean) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetStore: () => void;
  completeStore: () => void;
  firstStore: () => void | undefined;
}

export const floorAcordionStore = create<State & Actions>((set) => ({
  name: "",
  acessible: true,
  step: "first",

  setName: (name) => set({ name }),
  setAcessible: (acessible) => set({ acessible }),

  nextStep: () =>
    set((state) => {
      switch (state.step) {
        case "first":
          return { step: "second" };
        case "second":
          return { step: "validation" };
        default:
          return { step: "first" };
      }
    }),

  previousStep: () =>
    set((state) => {
      switch (state.step) {
        case "validation":
          return { step: "second" };
        case "second":
          return { step: "first" };
        default:
          return { step: "first" };
      }
    }),

  resetStore: () =>
    set({
      name: "",
      acessible: true,
      step: "first",
    }),
  completeStore: () =>
    set({
      name: "",
      acessible: true,
      step: "",
    }),
  firstStore: () =>
    set({
      step: "first",
    }),
}));
