'use client';
import { ArrowDown } from '@/assets/Icons/ArrowDown';
import { BedIcon } from '@/assets/Icons/BedIcon';
import { DirectionRightIcon } from '@/assets/Icons/DirectionRightIcon';
import { IconRegister } from '@/assets/Icons/IconRegister';
import { StartIcon } from '@/assets/Icons/StartIcon';
import { formatPathName } from '@/helpers/formatPathString';
import sideBarStateStore from '@/store/sideBarStateStore';
import { TmenuSidebar } from '@/types/menuSidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { useEffect, useRef } from 'react';
import Cookies from "js-cookie";

export function Sidebar() {
    const { state, closeAllSubMenus, openSubMenus, setOpenSubMenus } = sideBarStateStore();
    const pathname = usePathname()
    const slug = Cookies.get(`${process.env.NEXT_PUBLIC_PROPERTY_SLUG}`)

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
                    label: "Inicio",
                    path: "/quartos",
                },
                {
                    label: "Mapa",
                    path: "/quartos/mapa",
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
                    label: "Inicio",
                    path: "/reservas",
                },
                {
                    label: "Mapa",
                    path: "/reservas/mapa",
                }
            ]
        },
        {
            label: "Cadastros",
            path: "/inicio",
            iconClass: "h-6 w-6",
            IconLeft: IconRegister,
            IconRight: ArrowDown,
            subMenu: [
                {
                    label: "Inicio",
                    path: "/cadastro",
                },
                {
                    label: "Andares",
                    path: "/cadastro/andares",
                },
                {
                    label: "Quartos",
                    path: "/cadastro/quartos"
                },
                {
                    label: "Hóspedes",
                    path: "/cadastro/hospedes",
                },
                {
                    label: "Empresas",
                    path: "/cadastro/empresas",
                },
                {
                    label: "Agências",
                    path: "/cadastro/agencias",
                },
                {
                    label: "Formas de pagamento",
                    path: "/cadastro/formas-de-pagamento",
                },
                {
                    label: "PDV",
                    path: "/cadastro/pdv"
                },
                {
                    label: "Produtos",
                    path: "/cadastro/produtos"
                }
            ]
        },
    ]

    const SubMenuRef = useRef<HTMLDivElement>(null);
    const toggleSubMenu = (label: string) => {
        if (!state) {
            setOpenSubMenus({ [label]: !openSubMenus[label] }); // Fecha outros submenus no estado comprimido
        } else {
            setOpenSubMenus({
                ...openSubMenus,
                [label]: !openSubMenus[label],
            });
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (SubMenuRef.current && !SubMenuRef.current.contains(event.target as Node)) {
                closeAllSubMenus();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [!state]);
    const pathArray = pathname.split('/')
    let newPath: string = ''

    pathArray.forEach((item, index) => {
        if (index > 1) {
            newPath += '/' + item as string
        }

    })

    const shouldShowOnlyHome = pathname.includes("settings") || pathname.includes("propriedades");

    return (<aside
        className={`bg-white-700 text-gray-900 border-black-100 font-medium transition-all shadow-xl duration-300 ease-in-out ${state ? "w-64" : "w-16"} flex flex-col`}
    >
        <nav className="flex-1 max-h-full overflow-y-auto scrollbar-invisible">
            <div className="mt-1">
                {menuItems.filter((item) => !shouldShowOnlyHome || item.label === "Inicio") // Mostra apenas "Início")

                    .map((item) => (
                        <div key={item.label} >
                            <Link
                                href={`/${slug}${item.path}`}
                                className={`flex items-center px-4 py-4 hover:bg-[#D5CEE5] ${!item.subMenu ? pathname === `/${slug}${item.path}` ? "bg-[#D5CEE5] " : "" : ""}`}
                                onClick={(e) => {
                                    if (item.subMenu) {
                                        e.preventDefault();
                                        toggleSubMenu(item.label);
                                    }
                                }}
                            >
                                <div className={item.iconClass}>
                                    {item.IconLeft && <item.IconLeft />}
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <span className={`ml-2 ${state ? "" : "hidden"}`}>{item.label}</span>
                                    {item.IconRight && state && item.subMenu && (
                                        <div
                                            className={`transform transition-transform duration-300 ${openSubMenus[item.label] ? 'rotate-270' : '-rotate-90'}`}
                                        >
                                            <item.IconRight />
                                        </div>
                                    )}
                                </div>
                            </Link>

                            {/* Submenu no estado comprimido */}
                            {item.subMenu && openSubMenus[item.label] && !state && (
                                <div ref={SubMenuRef} className="absolute left-[4.75rem] w-[8rem] transform -translate-x-2 -translate-y-14 bg-white border border-gray-200  items-center shadow-lg z-50 transition-all duration-300">
                                    {item.subMenu.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={`/${slug}${subItem.path}`}
                                            className={`flex items-center px-4 py-2 hover:bg-[#D5CEE5] ${newPath === subItem.path ? 'bg-primary-300 text-violet-600 ' : ""}`}
                                        >
                                            <span>{subItem.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Submenu no estado expandido */}
                            {item.subMenu && openSubMenus[item.label] && state && (
                                <div className="bg-white-800">
                                    {item.subMenu.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={`/${slug}${subItem.path}`}
                                            className={`flex items-center px-4 py-4  hover:bg-[#D5CEE5] ${newPath === subItem.path ? 'bg-primary-300 text-violet-600 ' : ""}`}
                                        >
                                            {state && <span className='ml-8'>{subItem.label}</span>}
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
