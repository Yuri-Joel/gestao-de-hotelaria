'use client';
import { ArrowDown } from '@/assets/Icons/ArrowDown';
import { BedIcon } from '@/assets/Icons/BedIcon';
import { DirectionRightIcon } from '@/assets/Icons/DirectionRightIcon';
import { MapaIcon } from '@/assets/Icons/MapaIcon';
import { StartIcon } from '@/assets/Icons/StartIcon';
import sideBarStateStore from '@/store/sideBarStateStore';
import { TmenuSidebar } from '@/types/menuSidebar';
import Link from 'next/link';
import { useState } from 'react';

export function Sidebar() {

    const { state } = sideBarStateStore();
    const slug = "hotel-ao"


    const menuItems: TmenuSidebar = [
        {
            label: "Inicio",
            path: "/home",
            iconClass: "h-6 w-6",
            IconLeft: StartIcon,
            IconRight: ArrowDown,

        },
        {
            label: "Quartos",
            path: "/quartos",
            iconClass: "h-6 w-6",
            IconLeft: BedIcon,
            IconRight: ArrowDown,
            subMenu: [
                {
                    label: "inicio",
                    path: "inicio",
                    iconClass: "w-full p-2 pl-9 rounded-md",
                    Icon: StartIcon

                },
            ],
        },
        {
            label: "Reservas",
            path: "/reservas",
            iconClass: "h-6 w-6",
            IconLeft: DirectionRightIcon,
            IconRight: ArrowDown,
            subMenu: [
                {
                    label: "inicio",
                    path: "inicio",
                    iconClass: "w-full p-2 pl-9 rounded-md",
                    Icon: StartIcon

                },
                {
                    label: "Mapa",
                    path: "Mapa",
                    iconClass: "w-full p-2 pl-9 rounded-md",
                    Icon: MapaIcon

                }
            ]
        },
    ]

    const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

    const toggleSubMenu = (label: string) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside
            className={`bg-white-700 text-gray-900 border-black-100 font-medium transition-all shadow-xl duration-300 ease-in-out ${state ? "w-64" : "w-16"} flex flex-col`}
        >
            <nav className="flex-1 overflow-hidden">
                <div className="mt-1">
                    {menuItems.map((item) => (
                        <div key={item.label}>
                            <Link
                                href={`/${slug}${item.path}`}
                                className="flex items-center px-4 py-4  hover:bg-[#D5CEE5]"
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
                                <div className="flex items-center justify-between w-full">
                                    <span className={`ml-2 ${state ? "" : "hidden"}`}>{item.label}</span>
                                    {item.IconRight && state && item.subMenu && (
                                        <div
                                            className={`transform transition-transform duration-300 ${openSubMenus[item.label] ? 'rotate-270' : '-rotate-90'
                                                }`}
                                        >
                                            <item.IconRight />
                                        </div>
                                    )}
                                </div>
                            </Link>
                            {item.subMenu && openSubMenus[item.label] && (
                                <div className="bg-white-800">
                                    {item.subMenu.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={"#"}
                                            className="flex items-center  px-4 py-2 hover:bg-[#D5CEE5]"
                                        >
                                            {/* Exibe o ícone do submenu sempre, se ele estiver definido */}
                                            {subItem.Icon && (
                                                <div className="mr-2">
                                                    <subItem.Icon />
                                                </div>
                                            )}
                                            {/* Exibe o texto somente se o sidebar estiver aberto */}
                                            {state && <span>{subItem.label}</span>}
                                        </Link>
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
