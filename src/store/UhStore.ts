import { UHEntity } from "@/interfaces/EntitiesForNewAPI/UHEntity";
import { create } from "zustand";

type State = {
  IsOpenedModalInfo: boolean;
  IsOpenedModalRoomDetails: boolean;
  selectedRoom: UHEntity | null;
  IsOpenedModalNoteReserve: boolean;
}

type Action = {
  handleOpenModalInfo: () => void;
  handleOpenModalRoomDetails: () => void;
  closeRoomDetails: () => void;
  setSelectedRoom: (arg: UHEntity | null) => void
  handleIsOpenedModalNoteReserve: () => void
};

export const UhStore = create<State & Action>((set, get) => ({
  IsOpenedModalInfo: false,
  IsOpenedModalRoomDetails: false,
  selectedRoom: null,
  IsOpenedModalNoteReserve: false,
  setSelectedRoom: (arg: UHEntity | null) => {
    set({ selectedRoom: arg })
  },
  handleOpenModalInfo: () => {
    set({ IsOpenedModalInfo: !get().IsOpenedModalInfo });
  },
  handleOpenModalRoomDetails: () => {
    set({ IsOpenedModalRoomDetails: !get().IsOpenedModalRoomDetails });
  },
  closeRoomDetails: () => {
    set({ IsOpenedModalRoomDetails: false })
  },
  handleIsOpenedModalNoteReserve: () => {
    set({ IsOpenedModalNoteReserve: !get().IsOpenedModalNoteReserve })
  }
}));

