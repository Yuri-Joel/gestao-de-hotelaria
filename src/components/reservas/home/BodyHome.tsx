'use client'
import { Wrapper } from "@/components/Wrapper";
import { SearchAndFilter } from "./SearchAndFilter";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { reserveStore } from "@/store/reserveStore";
import { formatDateShort } from "@/helpers/formatDateExperimental";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { ReserveList } from "./ReserveList";
import { datePickerStore } from "@/store/datePickerStore";
import { ReserversEntity } from "@/interfaces/reserve";
interface HomeProps {
  data: ReserversEntity[];
}

export function BodyHome({data}: HomeProps){

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
      setIschecked,
      setSearchInput,
      setDateFrom,
      setDateTo,
      setSearchData
    } = reserveStore()

    

  return(
    <Wrapper title="RESERVA - INICIO">
      <SearchAndFilter
        data={data}
      />
      
      
      <div className="w-full mt-5 shadow-md shadow-gray-200 mb-5">

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