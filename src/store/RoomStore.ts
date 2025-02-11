import { RoomEntity } from "@/interfaces/RoomEntity";
import { create } from "zustand";

type State = {
  IsOpenedModalInfo: boolean;
  IsOpenedModalRoomDetails: boolean;
  selectedRoom: RoomEntity | null;
  IsOpenedModalNoteReserve: boolean;
}

type Action = {
  handleOpenModalInfo: () => void;
  handleOpenModalRoomDetails: () => void;
  setSelectedRoom: (arg: RoomEntity | null) => void
  handleIsOpenedModalNoteReserve: () => void
};

const roomStore = create<State & Action>((set, get) => ({
  IsOpenedModalInfo: false,
  IsOpenedModalRoomDetails: false,
  selectedRoom: null,
  IsOpenedModalNoteReserve: false,
  setSelectedRoom: (arg: RoomEntity | null) => {
    set({ selectedRoom: arg })
  },
  handleOpenModalInfo: () => {
    set({ IsOpenedModalInfo: !get().IsOpenedModalInfo });
  },
  handleOpenModalRoomDetails: () => {
    set({ IsOpenedModalRoomDetails: !get().IsOpenedModalRoomDetails });
  },
  handleIsOpenedModalNoteReserve: () => {
    set({ IsOpenedModalNoteReserve: !get().IsOpenedModalNoteReserve })
  }
}));

export default roomStore;
