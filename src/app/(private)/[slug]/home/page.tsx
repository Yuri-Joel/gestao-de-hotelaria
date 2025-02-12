"use client"
import { ReserveList } from '@/components/Home/ReserveList';
import { TabNavigation } from '@/components/TabNavigation/TabNavigation';
import StateReserveStore from '@/store/home/headerStore';
import { TTabNavigation } from '@/types/TTabNavigation';
import React from 'react';

const page: React.FC = () => {

  const { selectedStateReserve, setSelectStateStateReserve } = StateReserveStore();

  const menuItems: TTabNavigation[] = [
    { id: 1, label: "Novas Reservas" },
    { id: 3, label: "Chegadas" },
    { id: 4, label: "Durante a estadia" },
    { id: 5, label: "Partidas" },
    { id: 6, label: "Cancelamentos" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="mt-4 ml-4">
      <TabNavigation
        selectedTitle={selectedStateReserve}
        setSelectedTitle={setSelectStateStateReserve}
        menuItems={menuItems}
      />
      
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 border-r">
          <div className="divide-y">
            <ReserveList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page;