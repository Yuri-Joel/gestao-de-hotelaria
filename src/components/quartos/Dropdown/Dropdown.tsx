"use client"

import { GuestEntity } from "@/interfaces/EntitiesForNewAPI/GuestEntity"


interface GuestDropdownProps {
data: any[] | null,
setSelectedGuest: (arg: any) => void,
isOpen: boolean, 
setIsOpen: (isOpen: boolean) => void,
}

export default function UHDropdown({ data , isOpen, setIsOpen, setSelectedGuest}: GuestDropdownProps) {
  const handleSelect = (guest: GuestEntity) => {
    setSelectedGuest(guest)
    setIsOpen(false)
  }

      return (
    <div className="relative">

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 -top-5 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 max-h-48 overflow-auto">
            {data?.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-medium">{item.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

