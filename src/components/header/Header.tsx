import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavIcon } from '@/assets/Icons/Header/navIcon';
import sideBarStateStore from '@/store/sideBarStateStore';
import { UserCircleIcon } from '@/assets/Icons/UserIcon';
import { MagnifieIcon } from '@/assets/Icons/MagnifierIcon';
import ReserveSearchStore from '@/store/ReserveSearchStore';
import MenuProfileStore from '@/store/MenuProfile';
import { formatPathName } from '@/helpers/formatPathString';

export const Header = () => {
  const pathname = usePathname();
  const slug = "hotel-ao"
  const { changeSideBarState, state , closeAllSubMenus} = sideBarStateStore();
  const { handleOpenReserveSearch } = ReserveSearchStore()
  const { handleOpenDropdownProfile } = MenuProfileStore();

  const [OpenReserve, setOpenReserve] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false)
  const toggleSidebar = () => {
    if (state) {
      closeAllSubMenus(); // Fecha todos os submenus
    }
    changeSideBarState(!state); // Alterna o estado do sidebar
  };
  
  const toggleMenuReserve = () => {
    setOpenReserve(!OpenReserve)
    setOpenProfile(false)
    handleOpenReserveSearch(!OpenReserve)
  }

  const toggleMenuProfile = () => {
    setOpenReserve(false)
    setOpenProfile(!OpenProfile)
    handleOpenDropdownProfile(!OpenProfile)
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[65px] px-5 text-black flex justify-between items-center bg-white border-b">
      <div className="flex items-center space-x-4">
        {formatPathName(pathname) !== "propriedades" && (
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
            <NavIcon stroke='black' />
          </button>
        )}

        <Link href="/">
          <h1 className="">Hoteli Apps - PMS</h1>
        </Link>
      </div>
      <div className="flex gap-2 mt-2">
        <Link href={`/${slug}/propriedades`} className='mr-1'>
          Selecionar Propriedade
        </Link>
        {formatPathName(pathname) !== "propriedades" && (
            <button onClick={() => toggleMenuReserve()} className='outline-none'>
              <MagnifieIcon width={50} height={30} stroke="black" />
            </button>
          )}
        <button className='outline-none' onClick={() => toggleMenuProfile()}>
          <UserCircleIcon width={50} height={30} />
        </button>
      </div>

    </header>
  ); 
};