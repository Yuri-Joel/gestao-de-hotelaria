'use client';
import { ArrowDown } from '@/assets/Icons/ArrowDown';
import { BedIcon } from '@/assets/Icons/BedIcon';
import { DirectionRightIcon } from '@/assets/Icons/DirectionRightIcon';
import Link from 'next/link';
import { useState } from 'react';

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems: TmenuSidebar = [
        {
            label: "Home",
            path: "/home",
            iconClass: "h-6 w-6",
            IconLeft: DirectionRightIcon,
            IconRight: ArrowDown,

        },
        {
            label: "Quartos",
            path: "/quartos",
            iconClass: "h-6 w-6",
            IconLeft: BedIcon,
            IconRight: ArrowDown,
            styleItemSubMenu: 'rotate-[-90deg]',
            subMenu: [
                {
                    label: "Mapa de reservas",
                    path: "/recepcao/mapa-de-reservas",
                    iconClass: "w-full p-2 pl-9 rounded-md",
                },
                {
                    label: "Mapa de UHs",
                    path: "/recepcao/mapa-de-uh",
                    iconClass: "w-full p-2 pl-9 rounded-md",
                },
            ],
        },
        {
            label: "Reservas",
            path: "/reservas",
            iconClass: "h-6 w-6",
            IconLeft: DirectionRightIcon,
            IconRight: ArrowDown,

        },
    ]

    const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({})

    const toggleSubMenu = (label: string) => {
        setOpenSubMenus((prev) => ({ ...prev, [label]: !prev[label] }))
    }
    return (
        <aside
            className={`bg-white-700 text-gray-900 font-medium transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"} flex flex-col`}
        >
            <nav className="flex-1 overflow-y-auto">
                <div className="mt-1">
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            <a
                                href={item.path}
                                className="flex items-center px-4 py-2 hover:bg-[#D5CEE5]"
                                onClick={(e) => {
                                    if (item.subMenu) {
                                        e.preventDefault()
                                        toggleSubMenu(item.label)
                                    }
                                }}
                            >
                                <div
                                    className={item.iconClass}>
                                    {item.IconLeft && <item.IconLeft />}
                                </div>
                                <span className={`ml-2 ${isOpen ? "" : "hidden"}`}>{item.label}</span>
                                {item.IconRight && isOpen && item.subMenu && (
                                    <div className={item.styleItemSubMenu}>
                                        {item.IconRight && <item.IconRight />}
                                    </div>
                                )}
                            </a>
                            {item.subMenu && isOpen && openSubMenus[item.label] && (
                                <div className="bg-white-800">
                                    {item.subMenu.map((subItem) => (
                                        <a
                                            key={subItem.label}
                                            href={subItem.path}
                                            className={`block ${subItem.iconClass} hover:bg-[#D5CEE5]`}
                                        >
                                            {subItem.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </aside>
    )
}
