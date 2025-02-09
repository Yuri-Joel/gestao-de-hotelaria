"use client"

import { XIcon } from "@/assets/Icons/XIcon"
import RoomStore from "@/store/RoomStore"

export const InfoModal = () => {

    const { IsOpenedModalInfo, handleOpenModalInfo } = RoomStore();

    const handleClose = () => {
        handleOpenModalInfo();
    }

    return (
        <div
        className={`fixed inset-0 bg-black/20 flex items-center justify-center p-4 ${
          IsOpenedModalInfo ? "h-full" : "h-0 overflow-hidden"
        }`}
      >
        <div className="relative w-full max-w-2xl bg-white rounded-lg border-b p-6">
          {/* Botão Fechar */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-black-500 hover:text-gray-700"
          >
            <XIcon fill="black" />
          </button>
      
          {/* Título */}
          <h2 className="text-xl font-semibold mb-4">Status de Ocupação dos Quartos</h2>
      
          {/* Itens da Legenda */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#13973F] flex-shrink-0" />
              <div>
                <span className="font-semibold">Disponível:</span>
                <p className="text-sm text-gray-600">
                  O quarto está livre, porém está sendo uma nova reserva.
                </p>
              </div>
            </div>
      
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#FF1F1F] flex-shrink-0" />
              <div>
                <span className="font-semibold">Vermelho: Hóspede sai hoje</span>
                <p className="text-sm text-gray-600">
                  O hóspede tem check-out agendado para hoje e deverá deixar a
                  acomodação dentro do horário estipulado.
                </p>
              </div>
            </div>
      
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#D7881A] flex-shrink-0" />
              <div>
                <span className="font-semibold">Laranja - Vencido:</span>
                <p className="text-sm text-gray-600">
                  O hóspede deveria ter feito o check-out, mas ainda não deixou a
                  propriedade.
                </p>
              </div>
            </div>
      
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#201397] flex-shrink-0" />
              <div>
                <span className="font-semibold">Azul - Hóspede na propriedade:</span>
                <p className="text-sm text-gray-600">
                  O quarto está atualmente ocupado, com um hóspede hospedado.
                </p>
              </div>
            </div>
      
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-[#CC01FF] flex-shrink-0" />
              <div>
                <span className="font-semibold">Roxo - Reservado:</span>
                <p className="text-sm text-gray-600">
                  O quarto está reservado para um próximo hóspede e não pode ser
                  ocupado por outra pessoa no momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}

