'use client'
import { Input } from "@/components/Input/Input";
import { Wrapper } from "@/components/Wrapper";
import { SearchAndFilter } from "./SearchAndFilter";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { reserveStore } from "@/store/reserveStore";
import { formatDateShort } from "@/helpers/formatDateExperimental";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { ReserveList } from "./ReserveList";

interface HomeProps {
  data: Reservers[];
}

export function BodyHome({data}: HomeProps){

  const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
  const menuItems = [
    {
      id: 1,
      label: "Chegadas"
    },
    {
      id: 2,
      label: "Na propriedade"
    },
    {
      id: 3,
      label: "Partidas"
    }
  ]

  
    const { 
      currentDate, 
      setCurrentDate,
      selectedTitleHeader,
      setSelectedTitleHeader,
    } = reserveStore()
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

  return(
    <Wrapper title="RESERVA - INICIO">
      <SearchAndFilter
        data={data}
      />
      <div className="flex flex-col mt-4 gap-4 mx-3 w-full">
        <button className="font-bold text-primary-700 text-start w-[5rem]">Redefinir</button>
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
      </div>
      
      <div className="w-full mt-5 border shadow-lg shadow-gray-450">

        <TabNavigation
          menuItems={menuItems}
          selectedTitle={selectedTitleHeader}
          setSelectedTitle={setSelectedTitleHeader}
        />
        <ReserveList
          data={data}
        />
      </div>
    </Wrapper>
  )
}