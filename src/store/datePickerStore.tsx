import { create } from "zustand";

type State = {
  startDate: Date | null;
  endDate: Date | null;
  openedCalendarStart: boolean
  openedCalendarEnd: boolean
};

type Actions = {
  setStartDate: (arg: Date | null) => void;
  setEndDate: (arg: Date | null) => void;
  setOpenedEndCalendar: (arg: boolean) => void;
  setOpenedStartCalendar: (arg: boolean) => void;
};

export const datePickerStore = create<State & Actions>((set) => ({
  startDate: null,
  endDate: null,
  openedCalendarEnd: false,
  openedCalendarStart: false,
  setStartDate: (arg) => {
    set({ startDate: arg });
  },
  setEndDate: (arg) => {
    set({ endDate: arg });
  },
  setOpenedStartCalendar: (arg) => {
    set({ openedCalendarStart: arg });
  },
  setOpenedEndCalendar: (arg) => {
    set({ openedCalendarEnd: arg });
  },
}));
