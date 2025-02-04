"use client"

import StateReserveStore from "@/store/home/headerStore";



export const TabNavigation = () => {
    const {selectedStateReserve,setSelectStateStateReserve} = StateReserveStore();
    const menuItems = [
        { id: 1, label: "Novas Reservas" },
        { id: 2, label: "Minhas reservas" },
        { id: 3, label: "Chegadas" },
        { id: 4, label: "Durante a estadia" },
        { id: 5, label: "Partidas" },
        { id: 6, label: "Cancelamentos" },
    ];

    return (
        <div className="border-b">
        <div className="flex items-center gap-2 px-5 py-5 relative">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 transition-colors ${
                  selectedStateReserve === item.label
                    ? 'text-black'
                    : 'text-gray-500'
                }`}
                onClick={() => setSelectStateStateReserve(item.label)}
              >
                {item.label}
              </button>
                {selectedStateReserve === item.label && (
                    <div className="absolute -bottom-5 left-0 w-full h-[5px] bg-primary rounded-sm transition-all duration-300 ease-in-out"></div>
                )}
            </div>
          ))}
        </div>
      </div>
    )
}