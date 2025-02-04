import { formatDateShort } from "@/helpers/formatDateExperimental";
import StateReserveStore from "@/store/home/headerStore";
import { guests } from "./test-api";
import { Skeleton } from "../Skeleton/Skeleton";
import { useState, useEffect } from "react";
import { delay } from "@/helpers/delay";

export const ReserveList = () => {
  const { selectedStateReserve } = StateReserveStore(); // Estado selecionado no header
  const [loading, setLoading] = useState<boolean>(false);
  const [guestsFiltered, setGuestsFiltered] = useState<typeof guests>([]); // Hóspedes filtrados

  // Simula a requisição ao clicar ou mudar o estado selecionado
  useEffect(() => {
    setLoading(true); 
    
   (async()=> {  
    await delay(2000) //simula um atraso de 2 segundos
      const filteredGuests = guests.filter(
        (guest) => guest.state.toLowerCase() === selectedStateReserve.toLowerCase()
      );
      setGuestsFiltered(filteredGuests);
      setLoading(false)
    })();
   
  }, [selectedStateReserve]); 

  return (
    <>
      {loading ? (
        <div className="p-4  space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}  className="p-4 bg-white">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        guestsFiltered.length > 0 ? (
          guestsFiltered.map((guest, index) => (
            <div key={index} className="p-4 hover:bg-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{guest.name}</div>
                  <div className="text-sm text-gray-500">
                    {formatDateShort(guest.checkin)} - {formatDateShort(guest.checkout)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-4">
            Nenhum hóspede encontrado para o estado selecionado.
          </div>
        )
      )}
    </>
  );
};
