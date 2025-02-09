'use client'
import { Wrapper } from "@/components/Wrapper";
import { SearchAndFilter } from "./SearchAndFilter";
import { reserveStore } from "@/store/reserveStore";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { ReserveList } from "./ReserveList";
import { useEffect, useState } from "react";
import { delay } from "@/helpers/delay";


export function BodyHome(){

  const [loading, setLoading] = useState<boolean>(false);
  const { 
    selectedTitleHeader,
    setSelectedTitleHeader,
    getReserve, 
    reserves,
    currentPage,

  } = reserveStore()

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

  useEffect(() => {
    (async () => {
      try{
        setLoading(true)
        await getReserve(currentPage);
        await delay(2000);
        setLoading(false)
      }catch(error){}
    } 
    )()
  }, [!reserves, selectedTitleHeader])

  useEffect(() => {
    (async () => {
      try{
        await getReserve(currentPage);
      }catch(error){}
    } 
    )()
  }, [currentPage])

  return(
    <Wrapper title="RESERVA - INICIO">
      <SearchAndFilter
        data={reserves}
      />
      <div className="w-full mt-5 shadow-md shadow-gray-200 mb-5">
        <TabNavigation
          menuItems={menuItems}
          selectedTitle={selectedTitleHeader}
          setSelectedTitle={setSelectedTitleHeader}
        />
        <ReserveList
          data={reserves}
          loading={loading}
        />
      </div>
    </Wrapper>
  )
}