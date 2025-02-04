"use client"

import { ReserveList } from '@/components/Home/ReserveList';
import { ReservationSearch } from '@/components/ReserveSearch/ReserveSearch';
import { TabNavigation } from '@/components/TabNavigation/TabNavigation';
import React from 'react';

const page: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
         <TabNavigation />
         <ReservationSearch />
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