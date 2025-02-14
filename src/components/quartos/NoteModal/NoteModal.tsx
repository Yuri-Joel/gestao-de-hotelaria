"use client"

import { UhStore } from "@/store/UhStore";
import { RoomCardProps } from "../Room/room";

export const NoteModal = ({ room }: RoomCardProps) => {

  const { handleIsOpenedModalNoteReserve, IsOpenedModalNoteReserve, handleOpenModalRoomDetails } = UhStore();

  const handleClose = () => {
    handleIsOpenedModalNoteReserve();
    handleOpenModalRoomDetails();
  }

  return (
    <div className={`fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50 p-4 ${IsOpenedModalNoteReserve ? 'h-full' : 'h-0 overflow-hidden'}`}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-center">Nota</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            {room?.reserve?.note}
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-center">
          <button
            onClick={handleClose}
            className="px-8 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}

