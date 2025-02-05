'use client'
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { formatDateShort } from "@/helpers/formatDateExperimental";
import { reservaStore } from "@/store/reservasStore";
import { Wrapper } from "@/components/Wrapper";

export function BodyMap() {

  const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const { 
    currentDate, 
    setCurrentDate
  } = reservaStore()
  const indexDay = new Date().getDay()
  const year = new Date().getFullYear()
  const newDate = days[indexDay] + " , " + formatDateShort(currentDate) + " " + year
  
  function prevMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate)
  }

  function nextMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate)
  }

  return (
    <Wrapper title="RESERVAS - MAPA">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <button className="bg-gray-90 size-6 rounded-full flex items-center justify-center">
            <CgChevronLeft 
              className="size-5" 
              onClick={prevMonth}
            />
          </button>
          <span>{newDate}</span>
          <button className="bg-gray-90 size-6 rounded-full text-center flex items-center ">
            <CgChevronRight 
              className="size-5" 
              onClick={nextMonth}
            />
          </button>
          
        </div>

        <div className="flex h-screen w-full">
          <div className="h-full bg-gray-200 flex items-center justify-center border-r-4 border-gray-300 w-[195px]">
            Área Quartos
          </div>
          <div className="w-full h-full">
            <div className="w-full bg-gray-200 flex items-center justify-center h-[72px] border-b-4 border-gray-300">
              Área Dias
            </div>
            <div className="bg-gray-200 flex items-center justify-center h-[calc(100vh-72px)]">
              Área Reservas
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
