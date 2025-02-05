import { create } from "zustand";

type State = {
  name: string;
  category: string;
  step: "first" | "second" | "validation" | "";
}

type Actions ={
  setName: (name: string) => void;
  setCategory: (category: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetStore: () => void;
  completeStore: () => void;
  firstStore: () => void;
}

export const usePropertyStore = create<State & Actions>((set) => ({
  name: "",
  category: "",
  step: "first",

  setName: (name) => set({ name }),
  setCategory: (category) => set({ category }),

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
      category: "",
      step: "first",
    }),
  completeStore: () =>
    set({
      name: "",
      category: "",
      step: "",
    }),
  firstStore: () =>
    set({
      step: "first",
    }),
}));
