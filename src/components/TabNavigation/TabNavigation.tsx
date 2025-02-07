"use client"

import { TTabNavigation } from "@/types/TTabNavigation";
import StateReserveStore from "@/store/home/headerStore";

interface TabNavigationProps {
  menuItems: TTabNavigation[]
  selectedTitle: string;
  setSelectedTitle: (data: string) => void;
}

export const TabNavigation = ({ menuItems, selectedTitle, setSelectedTitle }: TabNavigationProps) => {

  return (
    <div className="border-b">
      <div className="flex items-center gap-2 px-5 py-5 relative">
        {menuItems.map((item) => (
          <div key={item.id} className="relative">
            <button
              className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 transition-colors ${selectedTitle === item.label
                  ? 'text-black'
                  : 'text-gray-500'
                }`}
              onClick={() => setSelectedTitle(item.label)}
            >
              {item.label}
            </button>
            {selectedTitle === item.label && (
              <div className="absolute -bottom-5 left-0 w-full h-[5px] bg-primary rounded-sm transition-all duration-300 ease-in-out"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}