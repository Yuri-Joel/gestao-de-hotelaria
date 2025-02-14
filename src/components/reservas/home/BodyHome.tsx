'use client'
import { Wrapper } from "@/components/Wrapper";
import { SearchAndFilter } from "./SearchAndFilter";
import { reserveStore } from "@/store/reserveStore";
import { TabNavigation } from "@/components/TabNavigation/TabNavigation";
import { ReserveList } from "./ReserveList";
import { useEffect, useState } from "react";
import { delay } from "@/helpers/delay";

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

export function BodyHome(){
  const [loading, setLoading] = useState<boolean>(false);
  const { 
    selectedTitleHeader,
    setSelectedTitleHeader,
    find, 
    reserves,
    currentPage,
  } = reserveStore()

  useEffect(() => {
    (async () => {
      try {
        await find(currentPage);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
      }
    })();
  }, [currentPage, find])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await find(currentPage);
        await delay(1000)
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedTitleHeader]);

    
  return(
    <Wrapper title="RESERVA - INICIO">
      <SearchAndFilter
        data={reserves}
      />
      <div className="w-full mt-5 shadow-md shadow-gray-200 mb-5">
        <TabNavigation
          menuItems={menuItems}
          selectedTitle={menuItems.find(item => item.label === selectedTitleHeader) || { id: 0, label: selectedTitleHeader }}
          // selectedTitle={selectedTitleHeader}
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